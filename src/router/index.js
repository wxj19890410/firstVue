/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Manage from '@/pages/Manage'
import AddData from '@/pages/AddData'
import HistpryData from '@/pages/HistpryData'
import GroupList from '@/pages/GroupList'
import UserList from '@/pages/UserList'
import DeptList from '@/pages/DeptList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    }, {
      path: '/manage',
      name: 'Manage',
      component: Manage,
      children: [{
        path: '',
        component: AddData,
        meta: []
      }, {
        path: '/addData',
        component: AddData
      }, {
        path: '/histpryData',
        component: HistpryData
      }, {
        path: '/groupList',
        component: GroupList
      }, {
        path: '/userList',
        component: UserList
      }, {
        path: '/deptList',
        component: DeptList
      }]
    }

  ]
})
