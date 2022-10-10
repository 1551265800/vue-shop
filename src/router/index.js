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
    redirect:'product',
    component: () => import('../views/layout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'product',
        name: 'Product',
        component: () => import('../views/product'),
        meta: { requiresAuth: true }
      },
      {
        path: 'params',
        name: 'Params',
        component: () => import('../views/params'),
        meta: { requiresAuth: true }
      },
      {
        path: 'content',
        name: 'content',
        component: () => import('../views/content'),
        meta: { requiresAuth: true }
        
      },
    ]
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/user'),
    meta: { requiresAuth: true }
  },
]

const router = new VueRouter({
  routes
})

export default router
