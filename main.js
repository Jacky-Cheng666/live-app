import App from './App'
import store from './store/index.js'
import $H from './common/request.js'

// #ifndef VUE3
import Vue from 'vue'
Vue.prototype.$H = $H
Vue.prototype.$store = store
// 页面权限验证
Vue.prototype.$authJump = (options) => {
	if (!store.state.token) {
		uni.showToast({
			title: '请先登录',
			icon: 'none'
		});
		return uni.navigateTo({
			url: '/pages/login/login'
		})
	}
	uni.navigateTo(options)
}
// 方法权限验证
Vue.prototype.$authMethod = (callback) => {
	if (!store.state.token) {
		uni.showToast({
			title: '请先登录',
			icon: 'none'
		});
		return uni.navigateTo({
			url: '/pages/login/login'
		})
	}
	callback()
}

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
