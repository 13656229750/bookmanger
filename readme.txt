1、图书管理有哪些功能？
   1)、图书管理：C(create)U(update)R(read)D(delete)
   2)、用户管理：CURD

2、图书管理系统的静态页面已完成

3、图书管理系统的目录结构：(nodejs+express+json)
     bookmanage
        |----static  存放所有静态资源
               |----css 
               |----js
               |----image
        |----data  存放.json数据文件
        |----router 存放所有路由模块文件
        |----views  存放所有.html文件
        |----node_modules  存放所有第三方包
        |----app.js   入口文件

4、根据上面的目录结构创建文件夹：
   1)、npm init -y  创建package.json   
   2)、npm i express
   3)、进行功能模块开发


