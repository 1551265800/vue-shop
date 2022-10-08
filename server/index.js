const express = require("express");
const app = express();
const router = require("./router");
const bodyParser = require("body-parser");
 
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use("/api",router);
app.use(express.static("upload"))
 
app.listen(3000,()=>{
    console.log("服务器运行在3000端口上");
})