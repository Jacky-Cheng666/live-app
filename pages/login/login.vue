<template>
	<view>

		<!-- 检查是否已登录 -->
		<view v-if="showLoading" class="position-fixed top-0 right-0 left-0 bottom-0 bg-light flex align-center justify-center"
			style="z-index: 99;">
			<text class="font-md text-muted">加载中...</text>
		</view>

		<view class="flex align-center justify-center" style="height: 350rpx;">
			<text style="font-size: 50rpx;">欢迎回来</text>
		</view>

		<view class="px-3">
			<input type="text" v-model="form.username" class="bg-light px-3 mb-3 font" placeholder="请输入用户名"
				style="height: 100rpx;" />
			<input type="text" v-model="form.password" class="bg-light px-3 mb-3 font" placeholder="请输入密码"
				style="height: 100rpx;" />
			<input v-if="type!=='login'" type="text" v-model="form.repassword" class="bg-light px-3 mb-3 font"
				placeholder="请再次输入密码" style="height: 100rpx;" />
		</view>

		<view class="p-3 flex align-center justify-center">
			<view class="bg-main rounded p-3 flex align-center justify-center flex-1" hover-class="bg-main-hover"
				@tap="submit">
				<text class="text-white font-md">{{type==='login'?'登 录': '注 册'}}</text>
			</view>
		</view>

		<view class="flex align-center justify-center" @tap="changeType">
			<text class="text-light-muted font p-2">{{type==='login'?'注册账号': '去登录'}}</text>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: "login",
				form: {
					username: "",
					password: "",
					repassword: ""
				},
				showLoading: true
			}
		},
		onLoad() {
			let token = uni.getStorageSync('token')
			if (!token) {
				// 用户未登录
				this.showLoading = false
			} else {
				uni.switchTab({
					url: '/pages/index/index'
				})
			}
		},
		methods: {
			changeType() {
				this.type = this.type === 'login' ? 'reg' : 'login'
			},
			async submit() {
				let msg = this.type === 'login' ? '登录' : '注册'
				let res = await this.$H.post(`/${this.type}`, this.form)
				// console.log('res', res)
				uni.showToast({
					title: msg + '成功',
					icon: 'none'
				});
				if (this.type === 'reg') {
					this.changeType()
					this.form = {
						username: "",
						password: "",
						repassword: ""
					}
				} else {
					this.$store.dispatch('login', res)
					uni.switchTab({
						url: '/pages/index/index'
					})
				}
			}
		}
	}
</script>

<style>

</style>
