import Vue from 'vue'
import Router from 'vue-router'
import login from "@/views/common/login";

const main = () => import('@/views/main')
const home = () => import('@/views/home')
const addActicle = () => import('@/views/article/add-article')
const articleList = () => import('@/views/article/article-list')
const article = () => import('@/views/article/article')
const category = () => import('@/views/category/category')
const tag = () => import('@/views/tag/tag')
const recycle = () => import('@/views/article/recycle')
const middle = () => import('@/views/middle')
Vue.use(Router)


export const routerList = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    name: 'login',
    path: '/login',
    component: login
  },
  {
    path: '/main',
    component: main,
    redirect: '/main/home',
    children: [{
      path: 'home',
      component: home,
      meta: {
        name: '首页',
        isShow: true
      },
      icon: 'el-icon-menu',
    },
      {
        path: 'article',
        meta: {
          name: '文章管理',
          isShow: true
        },
        component: middle,
        icon: 'el-icon-document',
        children: [
          {
            path: 'addActicle',
            component: addActicle,
            meta: {
              name: '新增文章',
              isShow: true
            },
            icon: 'el-icon-edit-outline',
          },
          {
            path: 'articleList',
            component: articleList,
            meta: {
              name: '文章列表',
              isShow: true
            },
            icon: 'el-icon-tickets',
          },
          {
            path: 'updateActicle/:id',
            component: addActicle,
            name: 'updateActicle',
            meta: {
              name: '更新文章',
              isShow: false
            }
          },
          {
            path: 'article',
            component: article,
            meta: {
              name: '查看文章',
              isShow: false
            },
            icon: 'el-icon-menu'
          },
          {
            path: 'recycle',
            component: recycle,
            meta: {
              name: '回收站',
              isShow: true
            },
            icon: 'el-icon-delete'
          },
        ]
      },
      {
        path: 'category',
        component: category,
        meta: {
          name: '文章分类',
          isShow: true
        },
        icon: 'el-icon-menu',
      },
      {
        path: 'tag',
        component: tag,
        meta: {
          name: '文章标签',
          isShow: true
        },
        icon: 'el-icon-menu',
      }
    ]
  },
]

export default new Router({
  routes: routerList
})
