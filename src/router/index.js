import Vue from 'vue'
import Router from 'vue-router'
import App from '@/views/App'
import HelloWorld from '@/components/HelloWorld'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path:'/main',
      component: App,
      children:[
        {
          path:'addActicle',
          component:HelloWorld
        }
      ]
    }
  ]
})
