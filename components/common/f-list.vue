<template>
	<view class="">
		<view class="p-3 flex align-center" hover-class="bg-light" v-for="(item,index) in options" :key="index">
			<text class="iconfont mr-3" :class="item.icon"></text>
			<text class="font-md">{{item.title}}</text>
			<view class="ml-auto flex align-center">
				<slot>
					<text class="text-muted font">{{item.desc}}</text>
				</slot>
				<!-- <uni-icons size="30" type="forward"></uni-icons> -->
				<text class="ml-2" v-if="item.showArrow">></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			options: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {}
		}
	}
</script>

<style>
</style>
