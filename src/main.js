// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import moment from "moment";

Vue.filter("dateFormat", function (value, format = "YYYY-MM-DD HH:mm:ss") {
  return moment(value).format(format);
});

Vue.config.productionTip = false
Vue.use(ElementUI)
axios.defaults.responseType = 'json'
Vue.prototype.$http = axios
Vue.prototype.$moment = moment

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
