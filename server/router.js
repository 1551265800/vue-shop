const express = require("express");
const router = express.Router();
const sqlFn = require('./mysqlConnect')
const jwt = require('jsonwebtoken')
const jwtSecrect = require("./jwtScrict")
//登陆功能
router.post("/login", (req, res) => {
    //接受账号密码
    const username = req.body.username;
    const password = req.body.password;
    //查询
    const sql = "select * from user where username=? and password=?";
    const arr = [username, password];
    sqlFn(sql, arr, result => {
        if (result.length  > 0) {
            const token = jwt.sign({
                 id:result[0].id,
                 username:result[0].username
            },jwtSecrect.serect)
            res.send({
                status: 200,
                token,
                mag:"登陆成功!",
            })
        }else{
            res.send({
                status: 400,
                msg:"用户名或密码错误"
            })
        }
    })
})
//注册功能
router.post("/register", (req, res) =>{
    //接受参数
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const arr = [username,password,email]
    var sql = "insert into user values (null,?,?,?)"
    sqlFn(sql, arr, result => {
        if (result.affectedRows  > 0) {
            res.send({
                status: 200,
                mag:"注册成功!",
            })
        }else{
            res.send({
                status: 400,
                msg:"注册失败"
            })
        }
    })
})
module.exports = router;