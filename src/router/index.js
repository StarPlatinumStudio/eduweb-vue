import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Console from '@/components/Console'
import Index from '@/components/Index'
import My from '@/components/My'
import Vip from '@/components/Vip'
import Course from '@/components/Course'
import HomeWorkDetial from '@/components/HomeWorkDetial'
import EditHomeWork from '@/components/EditHomeWork'
import MyHomeWork from '@/components/MyHomeWork'
Vue.use(Router)

const StudentCourse = () => import('@/components/StudentCourse')
const ManageCourse = () => import('@/components/ManageCourse')

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
      path: '/HomeWorkDetial',
      name: 'HomeWorkDetial',
      component: HomeWorkDetial
    },
    {
      path: '/Course',
      name: 'Course',
      component: Course
    },
    {
      path: '/MyHomeWork',
      name: 'MyHomeWork',
      component: MyHomeWork
    },
    {
      path: '/EditHomeWork',
      name: 'EditHomeWork',
      component: EditHomeWork
    },
    {
      path: '/StudentCourse',
      name: 'StudentCourse',
      component: StudentCourse
    },
    {
      path: '/ManageCourse',
      name: 'ManageCourse',
      component: ManageCourse
    }
  ],
  mode: 'history'
})
