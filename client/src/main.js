import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/store'
import lodash from 'lodash'
import fullscreen from 'vue-fullscreen'
import VueCryptojs from 'vue-cryptojs'
 
import vueCookie from 'vue-cookies';
Vue.use(vueCookie);

Vue.config.productionTip = false
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueMathjax from 'vue-mathjax';
Vue.use(VueMathjax);
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(fullscreen)
Vue.use(VueCryptojs)
Vue.use(lodash)
new Vue({
	render: h => h(App),
	router,
	store,
}).$mount('#app')
