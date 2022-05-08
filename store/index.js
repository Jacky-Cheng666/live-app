import Vue from 'vue'
import Vuex from 'vuex'
import $H from '@/common/request.js'
import $C from '@/common/config.js'
import io from '@/common/uni-socket.io.js'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		user: null,
		token: null,
		socket: null
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
		},
		// 连接socket
		connectSocket({
			state,
			dispatch
		}) {
			const S = io($C.socketUrl, {
				query: {},
				transports: ["websocket"],
				timeout: 5000
			})

			// 监听连接
			S.on('connect', () => {
				console.log('socket_connected')
				state.socket = S
				// socket.io唯一连接id，可以去监控这个id实现点对点通讯
				const { id } = S
				// 接收后端传过来的数据
				S.on(id, (e) => {
					let d = e.data
					if(d.action==='error'){
						let msg  = d.payload
						return uni.showToast({
							title: msg,
							icon: 'none'
						});
					}
				})
			})

			// 监听失败
			S.on('error', () => {
				console.log('连接失败')
				state.socket = null
			})
			// 监听断开连接
			S.on('disconnected', () => {
				console.log('断开连接')
				state.socket = null
			})
		}
	}
})
