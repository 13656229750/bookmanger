const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

//设计路由

//显示后台主界面
router.get('/main', (req, res) => {

    //获取当前已登录的帐号
    let curusr = req.session.UNAME;
    if (!curusr) { //用户未登录
        res.send("<script>alert('请先登录!');location.href='/user';</script>");
        return false;
    }

    res.sendFile(path.resolve(__dirname, '../views/main.html'));
});

//显示顶部界面
router.get('/top', (req, res) => {

    //获取session(当前已登录的帐号)
    let curuser = req.session.UNAME;

    let fcontent = fs.readFileSync(path.resolve(__dirname, '../views/top.html'));
    fcontent = fcontent.toString();

    fcontent = fcontent.replace('??', curuser);
    res.send(fcontent);

    // res.sendFile(path.resolve(__dirname, '../views/top.html'));
});

//显示左部界面
router.get('/left', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../views/left.html'));
});

//显示右部界面
router.get('/right', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../views/right.html'));
});


module.exports = router;