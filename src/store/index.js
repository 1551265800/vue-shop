import Vue from 'vue'
import Vuex from 'vuex'
import loginModel from './models/loginModel'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    loginModel
  }
})
