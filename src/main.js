// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueResource from 'vue-resource'
import service from './service/index.js'

Vue.config.productionTip = false

Vue.use(ElementUI, {
  size: 'small'
})
Vue.use(VueResource)

Vue.prototype.$service = service
Vue.http.options.emulateJSON = true
Vue.http.interceptors.push((request, next) => {
  request.url = window.GLOBLE.apiUrl + request.url
  request.headers.set('loginUuid', service.localStorage.get('loginUuid'))
  if (request.method === 'POST' && request.body) {
    var params = {}

    for (let [key, value] of Object.entries(request.body)) {
      if (value instanceof Array) {
        params[key] = JSON.stringify(value)
      } else if (value instanceof Object) {
        params[key] = JSON.stringify(value)
      } else if (value != null) {
        params[key] = value
      }
    }
    request.body = params
  }
  next(response => {
    let result = {
      ok: true
    }
    if (response.status === 200 && !response.body.error) {
      result.data = response.body
    } else {
      if (response.body.message === 'NotLogedInException') {
        this.$message({
          type: 'false',
          message: '请登录用户'
        })
        store.commit('setUserInfo')
        router.push('/login')
      } else if (response.body.message) {
        result.error = response.body.error
        result.message = response.body.message
      }
    }
    result.response = response
    return result
  })
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
