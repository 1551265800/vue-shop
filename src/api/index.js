import axios from "../utils/request";
import base from "./base";

const api = {
    //登陆接口
    login(params) {
        return axios.post(base.baseUrl + base.login, params)
    },
    //注册接口
    register(params){
        return axios.post(base.baseUrl + base.register, params)
    },
    //商品列表
    selectTbItemAllByPage(params){
        return axios.get(base.baseUrl + base.selectTbItemAllByPage, {params})
    },
    //商品条数
    total(){
        return axios.get(base.baseUrl + base.total)
    },
    //商品模糊查询
    search(params){
        return axios.get(base.baseUrl + base.search, {params})
    },
    //类目选择CategorySelection
    categorySelection(params){
        return axios.get(base.baseUrl + base.categorySelection, {params})
    },
    //商品添加
    insertTbItem(params){
        return axios.get(base.baseUrl + base.insertTbItem, {params})
    }

}
export default api;