import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import VCharts from 'v-charts'
import ElementUI from 'element-ui'
import store from './store'
// import VueRouter from 'vue-router'

import 'element-ui/lib/theme-chalk/index.css'
import asd from '../public/js/date.format'
import axios from 'axios'
import http from 'axios'
// import qs from 'qs'
// import VueAxios from 'vue-axios'
axios.defaults.withCredentials = true
Vue.config.productionTip = false
Vue.use(asd)
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(VCharts)
// Vue.use(axios,VueAxios)
Vue.prototype.$http = http
Vue.prototype.$axios = axios;
// Vue.prototype.$qs=qs;
// axios.defaults.baseURL = 'https://sctim.cn/soso';

new Vue({
	el:'#app',
	render: h => h(App),
	beforeCreate() {
		Vue.prototype.$bus = this //安装全局事件总线
	},
  router:router,
  store:store
})
// new Vue({
// 	el:'#app',
// 	render: h => h(App),
// 	// router:router
// })
