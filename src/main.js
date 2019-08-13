// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'lib-flexible'
import Vuex from 'vuex'
import store from './store'
import router from './router'
import './assets/styles/reset.css'
import './assets/styles/border.css'
const HelloJs = require('hellojs/dist/hello.all.min.js');
const VueHello = require('vue-hellojs');
HelloJs.init({
  google: '157122725629-vmjji99ukd62pbdmhl0ul1cnir7hip89.apps.googleusercontent.com',
  facebook: '685267178601621'
}, {
  redirect_uri: 'http://gzf.com/login'
});
Vue.use(VueHello, HelloJs);
//原生程序调用
import Bridge  from './jsAppInteractive/iosJsBridge.js'

Vue.prototype.$bridge = Bridge



Vue.config.productionTip = false






Vue.use(Vuex)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  store
})
