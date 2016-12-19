#le5le-ui
le5le-ui是le5le采用的公用web前端css基础框架。主要用flex布局和postcss构成。仅支持html5和css3环境。主要用于对ie8及以下兼容要求不高的后台管理系统或移动app环境。  

#为什么重复造轮子
bootstrap、semantic-ui目前对flex和postcss支持不够友好，定制目前没有采用import方式。
  
flex布局更方便（包括类似margin-left: calc( 100% / 1 );），用postcss定义变量和按需导入，再配合webpack等打包工具，能够很友好方便的按需定制使用。  
  
  
#开发环境
###1.安装nodejs
https://nodejs.org/en/

###2.安装依赖库
执行npm install安装依赖库。国内用户建议使用cnpm install。

主要有：
webpack、postcss、precss、autoprefixer、postcss-loader等。

图标采用font-awesome

###3.开发调试
运行npm start命令即可进行本地开发调试。  


#编译
生产环境编译：    
npm run build  
编译后的生产文件在www文件夹下。

#使用
###A.导入全部  
编译后，直接引用www/assets下的css文件即可  
```  
<link href="/assets/app.80a2d024f84456ffdfa7.css" rel="stylesheet"></head>  
```  

###B、定制使用
复制src文件夹下的index.css，按照自己的需求修改变量和导入即可。

#其他
postcss很多插件，我们只使用了几个基本的插件，这样避免的更多的学习成本。根据自己的环境，够用就好。  




