<template>
	<view>
		<view v-if="user" class="flex align-center">
			<view class="flex align-center justify-center" style="width: 180rpx;height: 180rpx;">
				<image class="rounded-circle" :src="user.avatar || '/static/gift/2.png'"
					style="width: 105rpx;height: 105rpx;"></image>
			</view>
			<view class="flex flex-column">
				<text class="font-md">{{user.username}}</text>
				<text class="font text-muted">未添加个性签名</text>
			</view>
			<view class="ml-auto border p-2 border-main rounded mr-3" hover-class="bg-light">
				<text class="text-main font">编辑资料</text>
			</view>
		</view>
		<view v-else class="flex align-center">
			<view class="flex align-center justify-center" style="width: 180rpx;height: 180rpx;">
				<image class="rounded-circle" src="/static/gift/2.png" style="width: 105rpx;height: 105rpx;"></image>
			</view>
			<view class="flex flex-column">
				<text class="font-md">未登录</text>
				<text class="font text-muted">登录体验更多功能</text>
			</view>
			<view class="ml-auto border p-2 border-main rounded mr-3" hover-class="bg-light" @tap="openLogin">
				<text class="text-main font">立即登录</text>
			</view>
		</view>
		<view class="f-divider"></view>

		<view class="">
			<view class="p-3 flex align-center" hover-class="bg-light" @tap="openCoin">
				<text class="iconfont iconfaxian mr-3"></text>
				<text class="font-md">我的金币</text>
				<view class="ml-auto flex align-center">
					<text class="text-muted font">50金币 点击充值</text>
					<text class="ml-2">></text>
				</view>
			</view>

			<view class="p-3 flex align-center" hover-class="bg-light">
				<text class="iconfont iconfaxian mr-3"></text>
				<text class="font-md">我的直播</text>
				<view class="ml-auto flex align-center">
					<text class="text-muted font">0</text>
					<text class="ml-2">></text>
				</view>
			</view>

			<view class="p-3 flex align-center" hover-class="bg-light">
				<text class="iconfont iconfaxian mr-3"></text>
				<text class="font-md">我的关注</text>
				<view class="ml-auto flex align-center">
					<text class="text-muted font">0</text>
					<text class="ml-2">></text>
				</view>
			</view>

			<view class="p-3 flex align-center" hover-class="bg-light">
				<text class="iconfont iconfaxian mr-3"></text>
				<text class="font-md">历史记录</text>
				<view class="ml-auto flex align-center">
					<text class="text-muted font"></text>
					<text class="ml-2">></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		components: {

		},
		data() {
			return {

			}
		},
		computed: {
			...mapState({
				user: state => state.user
			})
		},
		onShow() {
			this.$store.dispatch('getUserInfo')
		},
		onNavigationBarButtonTap() {
			this.$authJump({
				url: '/pages/user-set/user-set'
			})
		},
		methods: {
			openLogin() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},
			openCoin() {
				this.$authJump({
					url: '/pages/coin/coin'
				})
			}
		}
	}
</script>

<style>

</style>
