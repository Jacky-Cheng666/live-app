import App from './App'
import store from './store/index.js'
import $H from './common/request.js'

// #ifndef VUE3
import Vue from 'vue'
Vue.prototype.$H = $H
Vue.prototype.$store = store
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	store,
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
