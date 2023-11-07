<template>
	<view class="chat">
		<!-- 文件操作 -->
		<view class="file-content-wrap">
			<view class="file-content">
				<view class="file-name">
					<image src="../../static/file.png" />
					<text>{{fileName}}</text>
				</view>
				<view class="export file-exec">
					<image src="../../static/export.png" />
					<text>导出</text>
				</view>
				<view class="file-exec">
					<image src="../../static/copy.png" />
					<text>复制</text>
				</view>
			</view>
		</view>
		<!-- 对话区域 -->
		<scroll-view 
			class="chat-area"
			:style="{height: `${windowHeight}rpx`}"
			scroll-y="true" 
			:scroll-with-animation="true"
		>
			<view class="chat-body">
				<view class="chat-item" v-for="(item, index) in msgList" :key="index">
					<view v-if="item.botContent !== ''">
						<view class="chat-name">嚼字机器人</view>
						<view class="chat-text bot-text">
							<text>{{item.botContent}}</text>
						</view>
					</view>
					<view class="user-content" v-if="item.userContent !== ''">
						<view class="chat-name">提问者</view>
						<view class="chat-text user-text">
							<text>{{item.userContent}}</text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- 底部输入 -->
		<view class="input-content-wrap">
			<view class="input-content">
				<view class="text-area">
					<textarea
						v-model="chatMsg"
						placeholder="问些文档相关的问题吧"
						maxlength="300"
						auto-height="true"
						confirm-type="send"
						cursor-spacing="20"
						:show-confirm-bar="confirmBar"
						@confirm="handleConfirm"
					>
					</textarea>
				</view>
				<view class="send-btn">
					<button @click="handleClick">发送</button>
				</view>
			</view>
		</view>
		<!-- 对话建议 -->
		<chat-suggestion 
			v-if="suggestions.length !== 0"
			class="suggest-pos" 
			:suggestions="suggestions"
			@chooseSuggestion="chooseSuggestion"
		></chat-suggestion>
	</view>
</template>

<script>
	import { getQuerySuggestions } from '@/api/file.js'
	import { sendChat } from '../../api/chat.js'
	import { chatSuggestion } from '@/components/chat-suggestion/chat-suggestion.vue'
	export default {
		components: {
			chatSuggestion
		},
		data() {
			return {
				confirmBar: false,
				chatMsg: '',
				msgList:[
					{
						recordId: 0,
						botContent: "hello，请问我有什么可以帮助你的吗？hello，请问我有什么可以帮助你的吗？hello，请问我有什么可以帮助你的吗？",
						userContent: "",
					},
					{
						recordId: 0,
						botContent: "",
						userContent: "你好",
					},
					{
						recordId: 0,
						botContent: "hello，请问我有什么可以帮助你的吗？",
						userContent: "",
					},
					{
						recordId: 0,
						botContent: "",
						userContent: "你好hello，请问我有什么可你好hello，请问我有什么可你好hello，请问我有什么可你好hello，请问我有什么可以帮助你的吗?hello，请问我有什么可以帮助你的吗？",
					},
					{
						recordId: 0,
						botContent: "hello，请问我有什么可以帮助你的吗？",
						userContent: "",
					},
					{
						recordId: 0,
						botContent: "",
						userContent: "你好",
					},
					{
						recordId: 0,
						botContent: "",
						userContent: "hello，请问我有什么可以帮助你的吗？",
					},
					{
						recordId: 0,
						botContent: "",
						userContent: "你好",
					},
					{
						recordId: 0,
						botContent: "hello，请问我有什么可以帮助你的吗？",
						userContent: "",
					},
					{
						recordId: 0,
						botContent: "",
						userContent: "你好",
					}
				],
				suggestions:[]
			}
		},
		computed: {
			windowHeight() {
				return this.pxToRpx(uni.getSystemInfoSync().windowHeight)
			},
			fileId() {
				return this.$store.state.uploadFile.fileId
			},
			fileName() {
				return this.$store.state.uploadFile.fileName
			}
		},
		watch: {
			msgList: {
				handler(newVal, oldVal) {},
				deep: true
			},
			suggestions: {
				handler(newVal, oldVal) {},
				deep: true
			}
		},
		async onLoad() {
			await this.getSuggestions()
			// console.log(this.suggestions)
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.$store.state.uploadFile.fileName
			});
		},
		methods: {
			pxToRpx(px){
				let deviceWidth = uni.getSystemInfoSync().windowWidth
				let rpx = ( 750 / deviceWidth ) * Number(px)
				return Math.floor(rpx)
			},
			handleClick() {
				// console.log('发送！', this.chatMsg);
				this.sendChatMsg()
				this.chatMsg = ''
				
			},
			handleConfirm(e) {
				// console.log(e.detail.value);
				this.sendChatMsg()
				this.chatMsg = ''
			},
			sendChatMsg() {
				let me = this
				const msg = me.chatMsg	
				let data = {
					fileId: this.$store.state.fileId,
					msg: msg
				}
				sendChat(data).then(res => {
					me.msgList.push(res.data);
				})
				.catch(error => {
					//处理异常,无后端,用于测试
					// console.log(error)
					const foo = [
						{
							recordId: 0,
							botContent: "",
							userContent: msg,
						},
						{
							recordId: 0,
							botContent: "机器人已回答！",
							userContent: "",
						},
					]
					me.msgList.push(...foo)
				})
			},
			async getSuggestions() {
				let me = this
				let sugData = {
					fileId: this.fileId
				}
				try {
					const res =  await getQuerySuggestions(sugData)
					if (res.data) {
						me.suggestions = res.data
					}
				} catch (error) {
					// 无后端，测试用
					me.suggestions = [
						'你好！',
						'你好！你好！你好！你好！你好！你好！你好！',
						'你好！'
					]
				}
			},
			chooseSuggestion(e) {
				this.chatMsg = e
			}
		}
	}
</script>

<style>
	.chat {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	.file-content-wrap {
		width: 100%;
		height: 150rpx;
	}
	
	.file-content{
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		position: fixed;
		top: 0;
		background-color: white;
		padding: 30rpx 0;
		z-index: 1;
	}
	
	.file-name {
		flex: 1;
		display: flex;
		align-items: center;
		height: 90rpx;
		background-color: #E4F3FE;
		color: #303030;
		border: none;
		border-radius: 20rpx;
		font-size: 35rpx;
		margin-left: 30rpx;
		margin-right: auto;
	}
	
	.file-name image {
		width: 30rpx;
		height: 30rpx;
		padding: 10rpx;
		margin-left: 30rpx;
		background-color: white;
		border-radius: 30rpx;
	}
	
	.file-name text {
		margin-left: 10rpx;
	}
	
	.file-exec {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 20rpx;
		margin-right: 30rpx;
	}
	
	.file-exec image {
		width: 70rpx;
		height: 70rpx;
	}
	
	.file-content .export {
		margin-left: 30rpx;
	}
	
	.chat-area {
		height: 100px;
		background-color: #F6F7FB;
	}
	
	.chat-body {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		padding: 0 30rpx;
	}
	
	.chat-item {
		width: 100%;
		display: flex;
		flex-direction: column;
		margin: 20rpx 0;
	}
	
	.chat-item .chat-name{
		font-size: 30rpx;
		color: #3A3D3E;
		margin-bottom: 10rpx;
	}
	
	.chat-item .chat-text{
		display: inline-block;
		max-width: 600rpx;
		font-size: 30rpx;
		padding: 20rpx;
		border: none;
		border-radius: 10rpx;
	}
	
	.bot-text {
		color: black;
		background-color: white;
	}
	
	.user-content {
		align-self: flex-end;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}
	
	.user-text {
		color: white;
		background-color: #26A2FF;
	}
	
	.input-content-wrap {
		width: 100%;
		height: 150rpx;
	}
	
	.input-content {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		position: fixed;
		bottom: 0;
		font-size: 35rpx;
		background-color: white;
		padding: 30rpx 0;
		z-index: 1;
	}
	
	.text-area {
		flex: 1;
		min-height: 80rpx;
		max-height: 300rpx !important;
		overflow-x: hidden;
		overflow-y: scroll;
		margin:0 30rpx;
		background-color: #F7F7F7;
		border-radius: 20rpx;
		padding: 0 10rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.text-area textarea {
		width: 100%;
		font-size: 35rpx;
	}
	
	.send-btn {
		width: 150rpx;
		margin-right: 30rpx;
	}
	
	.send-btn button {
		background-color: #22A3FF;
		color: white;
		border: none;
		border-radius: 20rpx;
		font-size: 35rpx;
	}
	
	.suggest-pos {
		position: fixed;
		bottom: 200rpx;
		right: 40rpx;
		z-index: 2;
	}
	
</style>
