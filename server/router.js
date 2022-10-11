const express = require("express");
const router = express.Router();
const sqlFn = require('./mysqlConnect')
const jwt = require('jsonwebtoken')
const jwtSecrect = require("./jwtScrict");
const url = require("url");
const fs = require("fs");
const multer = require("multer");
//登陆功能
router.post("/login", (req, res) => {
    //接受账号密码
    const username = req.body.username;
    const password = req.body.password;
    //查询
    const sql = "select * from user where username=? and password=?";
    const arr = [username, password];
    sqlFn(sql, arr, result => {
        if (result.length > 0) {
            const token = jwt.sign({
                id: result[0].id,
                username: result[0].username
            }, jwtSecrect.serect)
            res.send({
                status: 200,
                token,
                mag: "登陆成功!",
            })
        } else {
            res.send({
                status: 400,
                msg: "用户名或密码错误"
            })
        }
    })
})
//注册功能
router.post("/register", (req, res) => {
    //接受参数
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const arr = [username, password, email]
    var sql = "insert into user values (null,?,?,?)"
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                mag: "注册成功!",
            })
        } else {
            res.send({
                status: 400,
                msg: "注册失败"
            })
        }
    })
})
//获取商品列表
router.get("/backend/item/selectTbItemAllByPage", (req, res) => {
    //接口参数：page
    var page = url.parse(req.url, true).query.page || 1
    const sql = "select * from project order by id desc limit 10 offset " + (page - 1) * 10
    sqlFn(sql,null,result=>{
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 400,
                msg: "读取数据失败"
            })
        }
    })
})
//返回分页数据总条数
router.get("/total", (req, res) => {
    //接口参数：page
    const sql = "select count(*) from project where id"
    sqlFn(sql,null,result=>{
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 400,
                msg: "读取数据失败"
            })
        }
    })
})
//商品模糊搜索
router.get("/search", (req, res) => {
    const search = url.parse(req.url,true).query.search;
    const sql = "select * from project where concat(`title`,`sellPoint`,`descs`) like '%" + search + "%'"
    sqlFn(sql,null,result=>{
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 400,
                msg: "没有查到此数据"
            })
        }
    })
})
//类目选择
router.get("/backend/itemCategory/select", (req, res) => {
    const id = url.parse(req.url,true).query.id || 1;
    const sql = "select * from category where id=? ";
    const arr = [id]
    sqlFn(sql,arr,result=>{
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 400,
                msg: "没有查到此数据"
            })
        }
    })
})
//图片上传
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./upload/")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})
 
var createFolder = function (folder) {
    try {
        fs.accessSync(folder);
    } catch (e) {
        fs.mkdirSync(folder);
    }
}
 
var uploadFolder = './upload/';
createFolder(uploadFolder);
var upload = multer({ storage: storage });
 
router.post('/upload', upload.single('file'), function (req, res, next) {
    var file = req.file;
    console.log('文件类型：%s', file.mimetype);
    console.log('原始文件名：%s', file.originalname);
    console.log('文件大小：%s', file.size);
    console.log('文件保存路径：%s', file.path);
    res.json({ res_code: '0', name: file.originalname, url: file.path });
});
module.exports = router;