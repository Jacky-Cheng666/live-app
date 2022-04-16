<template>
	<view>
		<!-- 轮播图部分 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="200"
			style="width: 750rpx;height: 250rpx;">
			<swiper-item>
				<image class="w-100" src="/static/demo/banner/1.jpg" style="height: 250rpx;"></image>
			</swiper-item>
			<swiper-item>
				<image class="w-100" src="/static/demo/banner/2.jpg" style="height: 250rpx;"></image>
			</swiper-item>
		</swiper>

		<!-- 直播列表 -->
		<view class="flex flex-wrap">
			<view class="p position-relative list-item" v-for="i in 20" :key="i">
				<image class="rounded" src="/static/demo/1.jpg" mode="aspectFill" style="width: 365rpx;height: 365rpx;">
				</image>
				<view class="rounded-circle position-absolute px-2 flex align-center"
					style="left: 15rpx;top: 15rpx;background-color: rgba(0,0,0,.4);">
					<text class="iconfont iconbizhongguanli text-warning mr-1"></text>
					<text class="text-white font">0</text>
				</view>
				<view class="rounded-circle position-absolute px-2 flex align-center"
					style="right: 15rpx;top: 15rpx;background-color: rgba(0,0,0,.4);">
					<text class="text-white font-sm mr-1">人气:</text>
					<text class="text-white font-sm">1</text>
				</view>
				<view class="rounded-circle position-absolute flex align-center" style="left: 15rpx;bottom: 15rpx;">
					<text class="text-white font-sm">标题</text>
				</view>
				<view class="rounded-circle position-absolute px-2 flex align-center"
					style="right: 15rpx;bottom: 15rpx;background-color: rgba(0,0,0,.4);">
					<text class="d-block bg-danger rounded-circle mr-1" style="width: 20rpx;height: 20rpx;"></text>
					<text class="text-white font-sm">已结束</text>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.list-item {
		width: 375rpx;
		height: 375rpx;
		box-sizing: border-box;
	}
</style>
