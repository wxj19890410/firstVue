// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueResource from 'vue-resource'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueResource)

Vue.http.options.emulateJSON = true
Vue.http.interceptors.push((request, next) => {
  request.url = window.GLOBLE.apiUrl + request.url
  console.log(request.url)
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
      if (response.body && response.body.error) {
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
  components: { App },
  template: '<App/>'
})
