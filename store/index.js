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
				// 测试推送一条消息到后端
				S.emit('test', {
					name: "jacky"
				})
				
				// 接收后端传过来的数据
				S.on(S.id,(e)=>{
					console.log('e',e)
				})
			})

			// 监听失败
			S.on('error', () => {
				console.log('连接失败')
			})
			// 监听断开连接
			S.on('disconnected', () => {
				console.log('断开连接')
			})
		}
	}
})
