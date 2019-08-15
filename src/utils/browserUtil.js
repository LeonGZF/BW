//验证工具封装  ----- 如果需要直接拿去用
export const browserVerify = {
  /**
   * 是否是安卓设备
   * @returns {boolean}
   */
  verifyAndroid: function () {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    if (isAndroid) {
      return true;
    } else {
      return false;
    }
  },
  /**
   *是否是ios设备
   * @returns {boolean}
   */
  verifyIos: function () {
    var u = navigator.userAgent;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isiOS) {
      return true;
    } else {
      return false;
    }
  },
  verifyBW: function () {
    // return true;
    var u = navigator.userAgent;
    var isBW = u.indexOf('Name/BW') > -1//BW
    if (isBW) {
      return true;
    } else {
      return false;
    }
  },
  /**
   * 是否是微信内部浏览器
   * @returns {boolean}
   */
  isWeiXin: function () {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger" || ua.match(/WeiBo/i) == "weibo") {
      return true;
    } else if (ua.indexOf('mobile mqqbrowser') > -1) {
      return true;
    } else if (ua.indexOf('iphone') > -1 || ua.indexOf('mac') > -1) {
      if (ua.indexOf('qq') > -1) {
        return true;
      }
    }
    return false;
  }

}

export default browserVerify
function getHeaders(){
    var req = new XMLHttpRequest();
    req.open('GET', document.location.href, false);
    req.send(null);
    var headerArr = req.getAllResponseHeaders().split('\n');
    var headers = {};
    headerArr.forEach(item=>{
        if(item!==''){
		    var index = item.indexOf(':');
	        var key = item.slice(0,index);
	        var value = item.slice(index+1).trim();
	        headers[key] = value
	    }
	    
    })
    console.log(headers);
    return headers
}
