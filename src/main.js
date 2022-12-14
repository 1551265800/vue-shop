import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './plugins/element.js'
import "./assets/css/common.css"
import "./router/permission"
import "./utils/eventBus"
import i18n from "./plugins/i18n"


Vue.config.productionTip = false

//初始化
if (localStorage.getItem("shop-token")) {
  store.commit("loginModel/updataToken",localStorage.getItem("shop-token"))
  store.commit("loginModel/updataUsername",localStorage.getItem("shop-username"))
}
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
