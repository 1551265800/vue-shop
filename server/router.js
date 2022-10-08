const express = require("express");
const router = express.Router();
const sqlFn = require('./mysqlConnect')
const jwt = require('jsonwebtoken')
const jwtSecrect = require("./jwtScrict")
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
module.exports = router;