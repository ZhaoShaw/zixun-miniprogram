import Request from '@/utils/request.js'

let request = new Request().http

export const sendChat = function(data) {    
    return request({
		url: "api/chat/msg",		
        method: "POST",
		data
    })
}