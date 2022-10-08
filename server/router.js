const express = require("express");
const router = express.Router();
const sqlFn = require('./mysqlConnect')
router.post("/login", (req, res) => {
    //接受账号密码
    const username = req.body.username;
    const password = req.body.password;
    //查询
    const sql = "select * from user where username=? and password=?";
    const arr = [username, password];
    sqlFn(sql, arr, result => {
        if (result.length  > 0) {
            res.send({
                status: 200,
                mag:"登陆成功！",
                result
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