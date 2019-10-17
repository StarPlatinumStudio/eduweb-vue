import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Console from '@/components/Console'
import Index from '@/components/Index'
import My from '@/components/My'
import Vip from '@/components/Vip'
import Course from '@/components/Course'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Console',
      name: 'Console',
      component: Console
    },
    {
      path: '/Index',
      name: 'Index',
      component: Index
    },
    {
      path: '/My',
      name: 'My',
      component: My
    },
    {
      path: '/Vip',
      name: 'Vip',
      component: Vip
    },
    {
      path: '/Course',
      name: 'Course',
      component: Course
    }
  ]
})
