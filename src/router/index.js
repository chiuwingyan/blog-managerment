import Vue from 'vue'
import Router from 'vue-router'
const main = () => import('@/views/main')
const home = () => import('@/views/home')
const addActicle = () => import('@/views/add-article')
const middle = () => import('@/views/middle')
import HelloWorld from '@/components/HelloWorld'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/main',
      component: main,
      redirect: '/main/home',
      children:[
        {
          path:'home',
          component:home,
          name:'首页'
        },
        {
          path: 'article',
          name: '文章管理',
    
          children: [
            {
              path: 'addActicle',
              component: addActicle ,
              name: '新增文章'
            }
          ]
        }
      ]
    },
  ]
})
