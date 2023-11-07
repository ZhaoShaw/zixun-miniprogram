export default {
	api: function() {
		// #ifdef MP-WEIXIN 
	    let version = wx.getAccountInfoSync().miniProgram.envVersion;
	    switch (version) {
		case "develop": 
			return "http://localhost:8080"
			break;
		case 'trial': 
			return "http://localhost:8080"
			break;
		case 'release':
			return "http://localhost:8080"
			break;
		default:
			return "http://localhost:8080"
			break;
		}
		// #endif
		// #ifndef MP-WEIXIN
		return "http://localhost:8080"
		// #endif
	}
}