import Vue from 'vue'
import Vuex from 'vuex'
import $H from '@/common/request.js'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		user: null,
		token: null
	},
	actions: {
		// 方法权限验证
		authMethod({
			state
		}, callback) {
			if (!state.token) {
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				});
				return uni.navigateTo({
					url: '/pages/login/login'
				})
			}
			callback()
		},
		// 初始化用户登录状态
		initUser({
			state
		}) {
			let u = uni.getStorageSync('user')
			let t = uni.getStorageSync('token')
			if (u) {
				state.user = JSON.parse(u)
			}
			if (t) {
				state.token = t
			}
		},
		login({
			state
		}, user) {
			state.user = user
			state.token = user.token
			uni.setStorageSync('user', JSON.stringify(user))
			uni.setStorageSync('token', user.token)
		},
		async getUserInfo({
			state
		}) {
			let res = await $H.get('/user/info', {
				token: true,
				noJump: true
			})
			// console.log('userinfo', res)
			state.user = res
			uni.setStorageSync('user', JSON.stringify(user))
		},
		logout({
			state
		}) {
			$H.post('/logout', {}, {
				token: true
			})
			state.user = null
			state.token = null
			uni.removeStorageSync('user')
			uni.removeStorageSync('token')
		}
	}
})
