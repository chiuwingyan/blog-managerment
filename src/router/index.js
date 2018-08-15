import Vue from 'vue'
import Router from 'vue-router'
import login from "@/views/login";
const main = () => import('@/views/main')
const home = () => import('@/views/home')
const addActicle = () => import('@/views/article/add-article')
const category = () => import('@/views/article/category')
const middle = () => import('@/views/middle')
Vue.use(Router)


export const routerList = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path:'/login',
    component:login
  },
  {
    path: '/main',
    component: main,
    redirect: '/main/home',
    children: [{
        path: 'home',
        component: home,
        meta:{
          name: '首页',
        },
        icon: 'el-icon-menu',
      },
      {
        path: 'article',
        meta:{
          name: '文章管理',
        },
        component: middle,
        icon: 'el-icon-menu',
        children: [
          {
          path: 'addActicle',
          component: addActicle,
          meta:{
            name: '新增文章',
          },
          icon: 'el-icon-menu',
        },
          {
            path: 'category',
            component: category,
            meta: {
              name: '文章分类',
            },
            icon: 'el-icon-menu',
          },
      ]
      }
    ]
  },
]

export default new Router({
  routes: routerList
})