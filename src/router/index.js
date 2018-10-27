import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Manage from '@/pages/Manage'
import AddData from '@/pages/AddData'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    }, {
      path: '/manage',
      name: 'Manage',
      component: Manage,
      children: [{
        path: '',
        component: AddData,
        meta: [],
      }, {
        path: '/addData',
        component: AddData
      }]
    }

  ]
})
