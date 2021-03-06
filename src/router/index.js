import Vue from 'vue'
import Router from 'vue-router'
import login from "@/views/common/login";

const main = () => import('@/views/main')
const home = () => import('@/views/home')
const addActicle = () => import('@/views/article/add-article')
const articleList = () => import('@/components/article-list-com')
const article = () => import('@/views/article/article')
const category = () => import('@/views/category/category')
const tag = () => import('@/views/tag/tag')
const social = () => import('@/views/setting/social')
const siteInfo = () => import('@/views/setting/site-info')
const recycle = () => import('@/views/article/recycle')
const middle = () => import('@/views/middle')
const comment = () => import('@/views/comment/comment')
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
      name: '首页',
      meta: {
        name: '首页',
        isShow: true
      },
      icon: 'el-icon-menu',
    },
      {
        path: 'article',
        name: '文章管理',
        meta: {
          name: '文章管理',
          isShow: true
        },
        component: middle,
        icon: 'el-icon-document',
        redirect: {
          name: '新增文章'
        },
        children: [
          {
            path: 'addActicle',
            component: addActicle,
            name: '新增文章',
            meta: {
              name: '新增文章',
              isShow: true
            },
            icon: 'el-icon-edit-outline',
          },
          {
            path: 'articleList',
            component: middle,
            name: '文章列表',
            meta: {
              name: '文章列表',
              isShow: true
            },
            icon: 'el-icon-tickets',
            redirect: {name: '所有文章'},
            children: [
              {
                path: 'list',
                component: articleList,
                name: '所有文章',
                meta: {
                  name: '所有文章',
                  isShow: false
                }
              },
              {
                path: 'updateActicle/:id',
                component: addActicle,
                name: 'updateActicle',
                name: '更新文章',
                meta: {
                  name: '更新文章',
                  isShow: false
                }
              },
            ]
          },
          {
            path: 'article',
            component: article,
            name: '查看文章',
            meta: {
              name: '查看文章',
              isShow: false
            },
            icon: 'el-icon-menu'
          },
          {
            path: 'recycle',
            component: recycle,
            name: '回收站',
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
        name: '文章分类',
        meta: {
          name: '文章分类',
          isShow: true
        },
        icon: 'el-icon-menu',
      },
      {
        path: 'tag',
        component: tag,
        name: '文章标签',
        meta: {
          name: '文章标签',
          isShow: true
        },
        icon: 'el-icon-menu',
      },
      {
        path: 'comment',
        name: '评论管理',
        meta: {
          name: '评论管理',
          isShow: true
        },
        component: middle,
        icon: 'el-icon-document',
        children: [
          {
            path: 'comment',
            component: comment,
            name: '评论列表',
            meta: {
              name: '评论列表',
              isShow: true
            },
            icon: 'el-icon-menu'
          }
        ]
      },
      {
        path: 'setting',
        name: '设置',
        meta: {
          name: '设置',
          isShow: true
        },
        redirect: {
          name: '社交信息'
          },
        component: middle,
        icon: 'el-icon-setting',
        children: [
          {
            path: 'social',
            component: social,
            name: '社交信息',
            meta: {
              name: '社交信息',
              isShow: true
            },
            icon: 'el-icon-menu',
          },
          {
            path: 'site-info',
            component: siteInfo,
            name: '站点信息',
            meta: {
              name: '站点信息',
              isShow: true
            },
            icon: 'el-icon-menu',
          }
        ]
      }
    ]
  },
]

export default new Router({
  routes: routerList
})
