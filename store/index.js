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
			state,dispatch
		}) {
			let u = uni.getStorageSync('user')
			let t = uni.getStorageSync('token')
			if (u) {
				state.user = JSON.parse(u)
				state.token = t
				// 连接socket
				dispatch('connectSocket')
			}
		},
		// 用户登录
		login({
			state,dispatch
		}, user) {
			state.user = user
			state.token = user.token
			uni.setStorageSync('user', JSON.stringify(user))
			uni.setStorageSync('token', user.token)
			// 连接socket
			dispatch('connectSocket')
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
			state,dispatch
		}) {
			$H.post('/logout', {}, {
				token: true
			})
			dispatch('closeSocket')
			state.user = null
			state.token = null
			uni.removeStorageSync('user')
			uni.removeStorageSync('token')
		},
		// 断开socket连接
		closeSocket({state,dispatch}){
			if(state.socket){
				state.socket.close()
			}
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

			let onlineEvent = (e) => {
				uni.$emit('live', {
					type: "online",
					data: e
				})
			}
			
			let commentEvent = (e)=>{
				uni.$emit('live', {
					type: "comment",
					data: e
				})
			}
			
			let giftEvent = (e)=>{
				uni.$emit('live', {
					type: "gift",
					data: e
				})
			}

			// 监听连接
			S.on('connect', () => {
				console.log('socket_connected')
				state.socket = S
				// socket.io唯一连接id，可以去监控这个id实现点对点通讯
				const {
					id
				} = S
				// 接收后端传过来的数据
				S.on(id, (e) => {
					console.log('e', e)
					let d = e.data
					if (d.action === 'error') {
						let msg = d.payload
						if (e.meta.notoast) return
						return uni.showToast({
							title: msg,
							icon: 'none'
						});
					}
				})

				// 监听在线用户信息
				S.on('online', onlineEvent)
				// 监听实时弹幕
				S.on('comment', commentEvent)
				// 监听实时礼物数据
				S.on('gift', giftEvent)
			})
			
			// 移除监听器
			const removeListener = ()=>{
				if(S){
					S.removeListener('online', onlineEvent)
					S.removeListener('comment', commentEvent)
				}
			}

			// 监听失败
			S.on('error', () => {
				console.log('连接失败')
				state.socket = null
				removeListener()
			})
			// 监听断开连接
			S.on('disconnected', () => {
				console.log('断开连接')
				state.socket = null
				removeListener()
			})
		}
	}
})
