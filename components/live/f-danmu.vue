<template>
	<view class="position-fixed left-0 right-0" style="bottom: 120rpx;height: 300rpx;width: 520rpx;">
		<scroll-view class="pl-3" scroll-y="true" scroll-with-animation :scroll-into-view="scrollInToView"
			style="height: 300rpx;width: 520rpx;">
			<view :id="`danmu${item.id}`" class="flex align-center p-2 rounded mb-2"
				style="background-color: rgba(255,255,255,.125);box-sizing: border-box;" v-for="(item,index) in list"
				:key="index">
				<text class="font-md text-danger">{{item.name}}：</text>
				<text class="font-md text-white">{{item.content}}</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				scrollInToView: ''
			}
		},
		mounted() {
			// let id = 1
			// setInterval(() => {
			// 	this.list.push({
			// 		id,
			// 		name: '池厅长' + id,
			// 		content: '听说校花俞小曼很好看'
			// 	})
			// 	this.toBottom()
			// 	id++
			// }, 1000)
		},
		methods: {
			send(data) {
				this.list.push(data)
				this.toBottom()
			},
			toBottom() {
				setTimeout(() => {
					let len = this.list.length
					if (len > 0) {
						this.scrollInToView = 'danmu' + this.list[len - 1].id
					}
				}, 200)

			}
		}
	}
</script>

<style>
</style>
