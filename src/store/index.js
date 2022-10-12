import Vue from 'vue'
import Vuex from 'vuex'
import loginModel from './models/loginModel'
import pubModule from "./models/pubModule"
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    loginModel,
    pubModule
  }
})
