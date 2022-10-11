const base = {
    baseUrl:"http://192.168.19.157:3000", //根路径
    login:"/api/login",  //登陆
    register:"/api/register",//注册
    selectTbItemAllByPage:"/api/backend/item/selectTbItemAllByPage",//商品列表
    total:"/api/total",//商品数据数量
    search:"/api/search",//模糊查找
    categorySelection:"/api/backend/itemCategory/select",//类目选择
    insertTbItem:"/api/backend/item/insertTbItem",//商品添加
}

export default base