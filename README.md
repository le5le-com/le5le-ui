#le5le-ui
le5le-ui 是 le5le 采用的公用 web 前端 css 基础框架。

使用教程，参考 <a href="https://le5le-com.github.io/le5le-ui/" target="_blank">le5le-ui 官网</a>

#编译生产环境编译：  
ng build  
编译后的生产文件在 dist 文件夹下。

#使用
###A.导入全部  
编译后，直接引用 dist/assets 下的 css 文件即可

```
<link href="/assets/style.80a2d024f84456ffdfa7.css" rel="stylesheet"></head>  
```

###B、scss 方式导入 index.scss，并且按照自己的需求修改变量和导入即可。
