<template>
	<list :show-scrollbar="false" :bounce="false" :scrollable="true" class="" style="width: 520rpx;height: 500rpx;">
		<cell class="flex align-center pt-3 px-3" v-for="(item,index) in gifts" :key="index" insert-animation="default"
			delete-animation="default" :ref="'item'+index">
			<view class="rounded-circle flex-1 flex align-center p"
				style="background-image: linear-gradient(to right, #BCABB1 , #65AAF0);">
				<view class="flex-1 flex align-center">
					<image :src="item.avatar||defaultAvatar" style="width: 70rpx;height: 70rpx;"></image>
					<view class="ml-1">
						<text class="text-white font-md">{{item.username}}</text>
						<text class="text-white font">送 {{item.gift_name}}</text>
					</view>
				</view>
				<image class="rounded-circle" :src="item.gift_image" style="width: 70rpx;height: 70rpx;">
				</image>
			</view>
			<text class="text-warning ml-3 font-lg">X {{item.num}}</text>
		</cell>
	</list>

</template>

<script>
	const dom = weex.requireModule('dom')
	export default {
		data() {
			return {
				gifts: [],
				defaultAvatar: '/static/tabbar/min.png'
			}
		},
		created() {
			let num = 0
			setInterval(() => {
				num++
				this.gifts.push({
					username: "池大为",
					avatar: "",
					gift_name: "豪华游艇",
					gift_image: "/static/gift/3.png",
					num: num
				})
				this.toBottom()
			}, 1000)
		},
		methods: {
			toBottom() {
				this.$nextTick(() => {
					let index = this.gifts.length - 1
					let ref = 'item' + index
					if (this.$refs[ref]) {
						dom.scrollToElement(this.$refs[ref][0], {})
					}
				})
			}
		}
	}
</script>

<style>
</style>
