const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const app = express();

app.listen(4000, () => {
    console.log('4000端口监听成功');
});

//静态资源托管
app.use(express.static(path.resolve(__dirname, 'static')));

//使用中间件(cookie-session)操作session
app.use(cookieSession({
    name: 'sessionids', //cookie名称 
    keys: ['123@ASFSA'] //密钥
}));

//使用中间件(body-parser)接收post方式发送的参数
// parse application/x-www-form-urlencoded
//将表单解析为键值对格式
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
    //将表单的值解析成json数据格式
app.use(bodyParser.json());

//设置模板引擎为ejs
app.set('view engine', 'ejs');
//设置模板文件的存放位置
app.set('views', [path.resolve(__dirname, './views')]);
//告诉express html以ejs模板引擎去渲染
app.engine('html', require('ejs').__express);

//后台主界面的路由
let mainRouter = require('./router/main_router.js');
//图书管理的路由
let bookRouter = require('./router/book_router.js');
//用户管理的路由
let userRouter = require('./router/user_router.js');
app.use(mainRouter);
app.use('/book', bookRouter);
app.use('/user', userRouter);