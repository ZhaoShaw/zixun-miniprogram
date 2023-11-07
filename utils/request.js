import operate from '../common/operate.js'

export default class Request {
    http(param) {
        let url = param.url,
            method = param.method,
            header = {},
            data = param.data || {},
            hideLoading = param.hideLoading || false;
        let requestUrl = operate.api + url;
		const token = uni.getStorageSync('token')
		
        if (method) {
            method = method.toUpperCase();
            if (method == "POST") {
                header = {
                    'content-type': "application/x-www-form-urlencoded"
                };
            } else {
                header = {
                    'content-type': "application/json"
                };
            }
        }
		
		if (token) {
			const key='Authorization'
			let value='Bearer ' + token + ''
			header[key]=value
		}

        if (!hideLoading) {
            uni.showLoading({
                title: '加载中...'
            });
        }

        return new Promise((resolve, reject) => {
            uni.request({
                url: requestUrl,
                data: data,
                method: method,
                header: header,
                success: (res) => {
                    if (res.statusCode && res.statusCode != 200) {
                        uni.showToast({
                            title: "api错误" + res.errMsg,
                            icon: 'none'
                        });
                        return;
                    }
                    resolve(res.data)
                },
                fail: (e) => {
                    uni.showToast({
                        title: "" + e.data.msg,
                        icon: 'none'
                    });
                    resolve(e.data);
                },
                complete() {
                    if (!hideLoading) {
                        uni.hideLoading();
                    }
                    resolve();
                    return;
                }
            })
        })
    }
}