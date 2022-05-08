<template>
	<view class="border-top border-light-secondary p-3">
		<view class="rounded bg-main py-4 flex flex-column align-center justify-center">
			<text class="text-white font mb-2">当前金币</text>
			<text class="text-white font-weight-bold" style="font-size: 60rpx;">100</text>
		</view>
		<view class="border-top border-light-secondary my-3"></view>
		<view class="">
			<text class="font text-muted">请选择充值金币</text>
			<!-- 金币列表 -->
			<view class="row" style="margin: 0 -30rpx;">
				<view class="col-4 p-2" style="box-sizing: border-box;" v-for="(item,index) in list" :key="index"
					@tap="chooseCoin(index)">
					<view class="border rounded flex flex-column justify-center align-center"
						:class="activeIndex===index?'border-main':''" style="height: 130rpx;">
						<view class="flex align-center justify-between" v-if="item.coin">
							<text class="iconfont iconbizhongguanli text-warning font-lg"></text>
							<text class="font-weight-bold font-md ml-1">{{item.coin}}</text>
						</view>
						<text v-if="item.price" class="font text-light-muted">￥ {{item.price}}</text>
						<text v-else class="font text-light-muted">自定义</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 底部菜单 -->
		<view class="position-fixed left-0 right-0 bottom-0 border-top flex align-center justify-between px-3"
			style="height: 100rpx;">
			<view class="flex align-center">
				<text class="iconfont iconbizhongguanli text-warning font-lg"></text>
				<text class="font-weight-bold font-md ml-1">{{price}}</text>
			</view>
			<view class="bg-main flex align-center justify-center rounded" @tap="pay">
				<text class="font text-white px-3 py-2">去充值</text>
			</view>
		</view>

		<!-- 自定义金额输入框 -->
		<uni-popup ref="custom" type="dialog">
			<uni-popup-dialog inputType="number" title="自定义充值" placeholder="充值金额" mode="input" :duration="2000"
				:before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: 0,
				price: 10,
				list: [{
						coin: 10,
						price: 10,

					},
					{
						coin: 20,
						price: 20,

					},
					{
						coin: 30,
						price: 30,

					},
					{
						coin: 50,
						price: 50,

					},
					{
						coin: 100,
						price: 100,

					},
					{
						coin: 0,
						price: 0,

					}
				]
			}
		},
		methods: {
			pay() {
				this.$H.post('/gift/wxpay', {
					price: this.price
				}, {
					token: true
				}).then((orderInfo) => {
					uni.requestPayment({
						provider: 'wxpay',
						orderInfo: orderInfo,
						success: res => {
							uni.showToast({
								title: '充值成功',
								icon: 'none'
							});
							uni.navigateBack({
								delta: 1
							})
							console.log('res', res)
							this.$store.dispatch('getUserInfo')
						},
						fail: (err) => {
							console.log('err', err)
							uni.showModal({
								title: '提示',
								content: '支付失败' + err.errMsg,
								showCancel: false
							});
						},
						complete: () => {}
					});
				}).catch(err => {
					console.log('err', err)
				})


			},
			chooseCoin(index) {
				this.activeIndex = index
				let p = this.list[index].price
				if (p > 0) {
					this.price = p
				} else {
					// 自定义价格
					this.$refs.custom.open()
				}
			},
			close() {
				// TODO 做一些其他的事情，before-close 为true的情况下，手动执行 close 才会关闭对话框
				// ...
				this.$refs.custom.close()
			},
			/**
			 * 点击确认按钮触发
			 * @param {Object} done
			 * @param {Object} value
			 */
			confirm(value) {
				// 输入框的值
				console.log(value)
				if (value <= 0) {
					return uni.showToast({
						title: '请输入正确的金额',
						icon: 'none'
					});
				}
				this.price = value
				this.$refs.custom.close()
			}
		}
	}
</script>

<style>

</style>
