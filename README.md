# vue-shop

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 商城后台系统
本项目是一个商城后台管理系统，具有商品管理、规格参数管理、广告分类管理等。
其中包含用户中心、用户登陆与注册。集成国际化语言环境，支持中英两种语言
项目采用vue技术栈

### 项目技术
1. 项目环境 vue-cli 构建项目 集成项目环境 （前后端同步实现 集成了Node服务器 集成了XAMPP）
2. 项目技术点：
    - 项目网络请求集成Axios，同时对Axios进行封装，主要处理了请求拦截、响应拦截和错误提示
    - 项目UI 采用ElementUI，并对ElementIU进行二次封装，主要引用了table表格、树形控件、form表单、dailog弹出框等
    - 项目之间的管理采用vue-Router 包含路由嵌套、路由导航、路由传参、路由权限管理
    - 项目的全局状态包含登陆token、订单信息采用Vuex管理，并跟踪数据变化
    - 由于商品具有编辑功能，所以引入了富文本编辑器wangEditor
    - 因为项目开发前后端同步，所以前期数据采用node+moke 做数据模拟，并且在开发环境下采用proxy解决跨域问题
3. 业务实现

### 项目心得

### 项目亮点

## 项目依赖
1. 网络请求 Axios `cnpm i axios -S`
2. 集成ElementUI组件库 `vue add element`

## 项目页面结构
1. 商品管理：product
2. 规格参数：params
3. 内容分类管理：content
4. 用户登陆注册页面：login
5. 用户中心：user

## 页面级别
    - login
    - layout
        - content
        - params
        - product
    - user

## 初始化css样式

## 实现登陆页面 login.vue
1. 用到的组件 el-card el-tabs el-form
2. 功能 ： 登陆 注册

## 实现后台服务器提供接口
Node + MySql（XAMPP）
1. 安装依赖 express框架