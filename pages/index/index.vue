<template>
	<view class="content">
		<view class="upload">
			<button @click="selectFile">上传文档文件</button>
		</view>
		<view class="text-area">
			<text>{{title}}</text>
			<view v-for="(item, index) in methodIllustrate">
				<text>{{item}}</text>
			</view>
		</view>
		<view class="doc-example" v-on:click="openChat">
			<image src="../../static/file.png" />
			<text>{{exampleFile.name}}</text>
			<image src="../../static/arrow-right.png"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '使用说明：',
				methodIllustrate: [
					'1、从手机本地文件夹上传文档；',
					'2、苹果手机可将文档发送给传输助手，点击上传，从聊天会话选择传输助手，选择需要解析的语音；',
					'3、目前支持的格式：pdf、word、ppt、txt。'
				],
				exampleFile: {
					name: '示例文档文件.pdf',
					extname: '',
					url: ''
				},
				uploadFile: {
					name: '',
					extname: '',
					url: ''
				}
			}
		},
		methods: {
			selectFile() {
				let me = this
				// #ifdef MP-WEIXIN
				wx.chooseMessageFile({
					count: 1,
					type: 'file',
					extension: ['pdf','doc','docx','ppt','txt'],
					success (res) {
						const tempFile = res.tempFiles
						// console.log(tempFile);
						me.uploadSelectedFile(tempFile)
					}
				})
				// #endif
			},
			uploadSelectedFile(tempFile) {
				uni.uploadFile({
					url: 'https://www.baidu.com/', //仅为示例，非真实的接口地址
					filePath: tempFile.path,
					name: tempFile.name,
					header: {
						"Content-Type": "multipart/form-data",
						"Authorization": "Bearer " + uni.getStorageSync('token'),
					},
					success: (uploadFileRes) => {
						this.$store.commit('change', uploadFileRes.data)
						uni.navigateTo({
							url: '/pages/chat/chat'
						})
					},
					// 无后端，测试用
					complete: () => {
						const foo = {
							fileName: 'TEST上传文件',
							fileId: '23456W'
						}
						this.$store.commit('change', foo)
						uni.navigateTo({
							url: '/pages/chat/chat'
						})
					}
				})
			},
			async openChat() {
				const bar = {
					fileName: '示例文档文本',
					fileId: '99999W'
				}
				await this.$store.commit('change', bar)
				uni.navigateTo({
					url: '/pages/chat/chat'
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		padding: 0 20px;
	}
	
	.upload {
		margin: 300rpx auto;
	}
	.upload button {
		width: 500rpx;
		background-color: #22A3FF;
		color: white;
		border: none;
		border-radius: 60rpx;
	}
	.upload .uni-file-picker__lists {
		display: none !important;
	}
	
	.text-area {
		display: flex;
		flex-direction: column;
		justify-content: center;
		font-size: 30rpx;
		color: #303030;
		margin: 25rpx 0;
	}
	
	.doc-example {
		width: 100%;
		height: 90rpx;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		background-color: #E4F3FE;
		color: #303030;
		border: none;
		border-radius: 20rpx;
		font-size: 35rpx;
	}
	
	.doc-example image:nth-of-type(1) {
		width: 30rpx;
		height: 30rpx;
		padding: 10rpx;
		margin-left: 30rpx;
		background-color: white;
		border-radius: 30rpx;
	}
	
	.doc-example text {
		margin-left: 10rpx;
	}
	
	.doc-example image:nth-of-type(2) {
		width: 40rpx;
		height: 40rpx;
		margin-right: 20rpx;
		margin-left: auto;
	}
</style>
