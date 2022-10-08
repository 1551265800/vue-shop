import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login')
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import('../views/layout.vue'),
    children :[
      {
        path: '',
        name: 'Product',
        component: () => import('../views/product')
      },
      {
        path: 'params',
        name: 'Params',
        component: () => import('../views/params')
      },
      {
        path: 'content',
        name: 'content',
        component: () => import('../views/content')
      },
    ]
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/user')
  },
]

const router = new VueRouter({
  routes
})

export default router
