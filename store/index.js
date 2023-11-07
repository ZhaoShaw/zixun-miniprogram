import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store= new Vuex.Store({
	state:{
		uploadFile: {
			fileName: '示例文档文件',
			fileId: '#¥@#¥@'
		}
    },
	getters:{
		
	},
	mutations:{
		change(state, file) {
			state.uploadFile.fileId = file.fileId
			state.uploadFile.fileName = file.fileName
		}
	},
	actions:{
		
	},
	modules:{
		
	}
})

export default store