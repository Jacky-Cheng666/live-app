<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			

			// 引入nvue字体图标库，本地ttf字体文件。
			const domModule = weex.requireModule('dom')
			domModule.addRule('fontFace', {
				'fontFamily': "iconfont",
				'src': "url('/static/iconfont.ttf')"
			});
			// 监听点击底部中间凸起按钮
			uni.onTabBarMidButtonTap(() => {
				this.$authJump({
					url: '/pages/create-live/create-live'
				})
			})
			// 初始化用户数据
			this.$store.dispatch('initUser')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("/common/free.css");
	@import url("/common/common.css");
	/* #ifndef APP-PLUS-NVUE */
	@import url("/common/icon.css");
	/* #endif */
</style>
