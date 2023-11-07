import Request from '@/utils/request.js'

let request = new Request().http

export const getQuerySuggestions = function(data) {    
    return request({
		url: "api/files/suggestions",		
        method: "GET",
		data
    })
}