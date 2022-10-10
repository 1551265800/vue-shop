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
    }
}
export default api;