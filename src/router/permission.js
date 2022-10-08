import router from './index'
import store from '../store/index'
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        //判断用户是否登陆
        const token = store.state.loginModel.token;
        return token ? next() : next({path:"/login"})
    }else{
        next();
    }
})