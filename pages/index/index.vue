<template>
	<view class="flex flex-column" style="min-height: 100vh;">
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
		<template v-if="list.length>0 && !loading">
			<view class="flex flex-wrap">
				<view class="p position-relative list-item" v-for="(item,index) in list" :key="index"
					@tap="openLive(item.id)">
					<image class="rounded" :src="item.cover" mode="aspectFill"
						style="width: 365rpx;height: 365rpx;">
					</image>
					<view class="rounded-circle position-absolute px-2 flex align-center"
						style="left: 15rpx;top: 15rpx;background-color: rgba(0,0,0,.4);">
						<text class="iconfont iconbizhongguanli text-warning mr-1"></text>
						<text class="text-white font">{{item.coin}}</text>
					</view>
					<view class="rounded-circle position-absolute px-2 flex align-center"
						style="right: 15rpx;top: 15rpx;background-color: rgba(0,0,0,.4);">
						<text class="text-white font-sm mr-1">人气:</text>
						<text class="text-white font-sm">{{item.look_count}}</text>
					</view>
					<view class="rounded-circle position-absolute flex align-center" style="left: 15rpx;bottom: 15rpx;">
						<text class="text-white font-sm">{{item.title}}</text>
					</view>
					<view class="rounded-circle position-absolute px-2 flex align-center"
						style="right: 15rpx;bottom: 15rpx;background-color: rgba(0,0,0,.4);">
						<text class="d-block rounded-circle mr-1" :class="item.status===1?'bg-success':'bg-danger'"
							style="width: 20rpx;height: 20rpx;"></text>
						<text class="text-white font-sm">{{item.status | formatStatus}}</text>
					</view>
				</view>
			</view>

			<!-- 没有更多了 -->
			<view class="f-divider"></view>
			<view class="flex align-center justify-center py-3">
				<text class="font-md text-secondary">{{loadText}}</text>
			</view>
		</template>
		<template v-else-if="loading">
			<view class="flex-1 flex justify-center align-center border">
				<text>加载中...</text>
			</view>
		</template>
		<template v-else>
			<view class="flex-1 flex justify-center align-center border">
				<text>暂无数据</text>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				page: 1, //列表当前页码
				loadText: "上拉加载更多",
				loading: false
			}
		},
		onLoad() {
			this.getData()
		},
		onReachBottom() {
			if (this.loadText !== '上拉加载更多') return
			this.loadText = '加载中...'
			this.page++
			this.getData()
		},
		onPullDownRefresh() {
			this.page = 1
			this.getData(() => {
				uni.stopPullDownRefresh()
				uni.showToast({
					title: '刷新成功',
					icon: 'none'
				});
			}, true)
		},
		filters: {
			formatStatus(val) {
				let o = {
					0: "未开始",
					1: "直播中",
					2: "暂停",
					3: "已结束"
				}
				return o[val]
			}
		},
		methods: {
			async getData(callback = false, refresh = false) {
				// 首次进入首页才会显示加载中...字样
				if (this.list.length === 0) {
					this.loading = true
				}
				let res = await this.$H.get(`/live/list/${this.page}`)
				this.loading = false

				this.list = refresh ? res : [...this.list, ...res]

				this.loadText = res.length < 10 ? '没有更多了' : '上拉加载更多'

				if (typeof callback === 'function') {
					callback()
				}
			},
			openLive(id) {
				uni.navigateTo({
					url: '/pages/live/live?id=' + id
				})
			}
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
