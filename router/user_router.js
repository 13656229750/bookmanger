const express = require('express');
const path = require('path');
const router = express.Router();

//所有用户数据
let allUsers = require('../data/users.json');

//设计路由

//显示用户登录界面
router.get('/', (req, res) => {

    //接收参数(退出系统的动作标识)
    let curact = req.query.act;
    console.log(curact, 888);

    if (curact == 'logout') { //退出系统
        //删除session
        delete req.session.UNAME;
        console.log(req.session, 6666);
    }

    res.sendFile(path.resolve(__dirname, '../views/login.html'));
});

//处理用户登录
router.post('/login', (req, res) => {

    //接收用户输入的帐号及密码
    let { usr, pwd } = req.body;

    let curUsrObj = allUsers.filter((item) => {
        return item.user == usr;
    });

    console.log(curUsrObj);

    //判断帐号是否正确
    if (curUsrObj.length == 1) { //帐号正确

        //判断密码是否正确
        if (pwd == curUsrObj[0].pwd) { //密码正确

            //设置session(保存登录成功的帐号)
            req.session.UNAME = usr;

            res.send("<script>alert('登录成功');location.href='/main';</script>");
        } else {
            res.send("<script>alert('密码不正确');location.href='/';</script>");
        }

    } else { //帐号错误
        res.send("<script>alert('帐号不正确');location.href='/';</script>");
    }



});

module.exports = router;