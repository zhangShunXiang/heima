import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '@/views/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '',
    redirect: '/home',
    component: () => import('@/views/Layout'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/Home'),
        meta: {
          title: '首页'
        }
      },
      {
        path: 'qa',
        name: 'qa',
        component: () => import('@/views/Qa'),
         meta: {
          title: '问答'
        }
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/Video'),
        meta:{
          title:'视频'
        }
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/My'),
        meta:{
          title:"用户中心"
        }
      },

    ]
  },

  {
    path: '/Login',
    name: 'login',
    component: Login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import(/* webpackChunkName: "about" */ '@/views/search'),
    meta: {
      title: '搜索'
    }
  },

  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
