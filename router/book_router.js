const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

//所有图书数据
let allbooks = require('../data/books.json');
console.log(allbooks, 8888);

//设计路由

//图书列表页
router.get('/list', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../views/book_list.html'));
});

//获取所有图书数据
router.get('/getall', (req, res) => {


    // console.log(allbooks);

    res.send(allbooks);
});

//添加图书页面
router.get('/add', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../views/book_add.html'));
});

//处理添加图书
router.post('/add', (req, res) => {

    console.log(allbooks, 666);



    //接收post方式发送的参数
    let bkObj = req.body;
    //添加的图书id
    bkObj.bkid = allbooks[allbooks.length - 1].bkid + 1;

    //将添加的图书数据追加到数组allbooks中
    allbooks.push(bkObj);
    console.log(allbooks, 7777);
    //将所有图书数据写入books.json文件中
    let rt = fs.writeFileSync(path.resolve(__dirname, '../data/books.json'), JSON.stringify(allbooks));

    if (rt) { //添加失败
        res.send("<script>alert('添加失败');location.href='/book/add';</script>");
    } else { //添加成功
        res.send("<script>alert('添加成功');location.href='/book/list';</script>");
    }

    console.log(req.body);
    // res.send('处理添加');
});

//修改图书页面
router.get('/update/:id', (req, res) => {

    //接收要修改的图书id
    let curid = req.params.id;

    //遍历所有图书并根据要修改图书的id查找要修改图书的数据
    let curBookObj = allbooks.filter((item) => {
        return curid == item.bkid;
    });

    console.log(curBookObj, 7777);

    let contents = fs.readFileSync(path.resolve(__dirname, '../views/book_update.html'));
    contents = contents.toString();

    contents = contents.replace('#ids#', curBookObj[0].bkid);
    contents = contents.replace('#bookname#', curBookObj[0].bkname);
    contents = contents.replace('#authors#', curBookObj[0].author);
    contents = contents.replace('#prices#', curBookObj[0].price);
    res.send(contents);

    // res.sendFile(path.resolve(__dirname, '../views/book_update.html'));
});

//处理修改
router.post('/update', (req, res) => {

    //接收post提交过来的表单项值
    let curBookObj = req.body;
    console.log(curBookObj, 666);
    let newAllBooks = allbooks.map((item, ind) => {
        console.log(item, ind);
        if (curBookObj.curid == item.bkid) {
            item.bkname = curBookObj.bkname;
            item.author = curBookObj.author;
            item.price = curBookObj.price;
        }
        return item;
    });

    console.log(newAllBooks);
    let rt = fs.writeFileSync(path.resolve(__dirname, '../data/books.json'), JSON.stringify(newAllBooks));
    if (rt) { //修改失败：返回到修改的显示界面时要带上记录id
        res.send("<script>alert('修改失败');location.href='/book/update/" + curBookObj.curid + "'</script>");
    } else { //修改成功
        res.send("<script>alert('修改成功');location.href='/book/list'</script>");
    }

});

//删除图书
router.get('/delete', (req, res) => {

    //获取要删除的图书id
    let curid = req.query.id;

    let newAllBooks = allbooks.filter((item) => {
        return item.bkid != curid;
    });

    //重置原有图书数据
    allbooks = newAllBooks;


    let rt = fs.writeFileSync(path.resolve(__dirname, '../data/books.json'), JSON.stringify(newAllBooks));
    if (rt) { //删除失败
        res.send({ "flag": false, "msg": "删除失败" });
        // res.send("<script>alert('删除失败');location.href='/book/list';</script>");
    } else { //删除成功
        res.send({ "flag": true, "msg": "删除成功" });
        // res.send("<script>alert('删除成功');location.href='/book/list';</script>");
    }

    res.send('删除图书');
});

module.exports = router;