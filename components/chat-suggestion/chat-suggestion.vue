<template>
	<view class="suggest">
		<view 
			v-if="!openFlag" 
			v-on:click="changeOpen()" 
			class="suggest-close"
		>
			<image src="../../static/suggestion.png"></image>
		</view>
		<view v-else class="suggest-open" v-on:click="changeOpen">
			<view class="suggest-item" v-on:click="sendMsg(item)" v-for="(item, index) in suggestions" :key="index">
				<view class="suggest-text" >
					<text>{{item}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			suggestions: {
				type: Array,
				default: ['你好'],
				required: true
			}
		},
		data() {
			return {
				openFlag: false
			}
		},
		methods: {
			changeOpen() {
				this.openFlag = !this.openFlag
			},
			sendMsg(e) {
				// console.log('send!!!', e);
				this.$emit('chooseSuggestion', e)
			}
		}
	}
</script>

<style>	
	.suggest-close image{
		width: 80rpx;
		height: 80rpx;
		padding: 10rpx;
		background-color: rgba(255, 255, 255, 0.5);
		border: none;
		border-radius: 40rpx;
	}
	
	.suggest-open {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(255, 255, 255, 0.9);
		padding: 0 100rpx 200rpx 20rpx;
	}
	
	.suggest-item {
		display: inline-block;
		max-width: 600rpx;
		font-size: 30rpx;
		padding: 20rpx;
		margin: 10rpx 0;
		color: #28323F;
		background-color: #CCE5FF;
		border: none;
		border-radius: 20rpx;
		z-index: 1;
	}
</style>