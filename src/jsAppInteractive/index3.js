import  browserVerify  from '@/utils/browserUtil'
import Vue from 'vue'
export default function SendMessageToApp() {

  let messageName = 'nullName'
  let params = ''; 
  let callback;

  //app定义的的方法名
  if (typeof arguments[0] == "string") {
    messageName = arguments[0]
  }

  //传递的参数或者回调函数
  let arg1 = arguments[1];
  if (typeof arg1 == "function") {
    callback = arg1
  }else if (typeof arg1 != "undefined") {
      params = arg1
  }

  //回调函数
  if (typeof arguments[2] == "function") {
    callback = arguments[2]
  }

  if (callback) {
    let fun_name = getFunName(callback)
    window[fun_name] = callback
  }

  if (browserVerify.verifyIos()) {
    //sendToIOS(messageName, params)
  }else{
     //貌似安卓传的参数，不能是数组和对象，所以这里json一下
    if (typeof params != "string") {
      params = JSON.stringify(params)
    }
    return sendToAndroid(messageName, params)
  }
}

// function sendToIOS(messageName, params) {
//   //window.webkit.messageHandlers[messageName].postMessage(params)
//   // let commond = 'window.webkit.messageHandlers.' + messageName + '.postMessage(' + `'${params}'` + ')'
//   // eval(commond)
//   Vue.prototype.$bridge.callHandler(messageName, params, callback) //iOS的一个框架: WKWebViewJavascriptBridge
// }

function sendToAndroid(messageName, params) {
  //  let BW = 'BW';
  //  let commond = BW+'.' + messageName + '(' + `'${params}'` + ')';
  //  eval(commond);
  console.log("method :"+messageName+",params:"+params);
  switch(messageName){
    case 'loginWithThirdParty': //第三方登录 
      BW.loginWithThirdParty(params);
      break;
    case 'setActionBar': //设置actionbar
      BW.setActionBar(params);
      break;
    case 'saveToken': //设置saveToken
      BW.saveToken(params);
      break;
    case 'setLoading': //设置loading 画面的
      BW.setLoading(params);
      break;
    case 'setLoginStatus': //设置 告诉app 是否登录
      BW.setLoginStatus(params);
      break;
    case 'getAPPVersion': //获取版本号
      return BW.getAPPVersion();
      break;
    case 'goToIndex': //页面跳转
      return BW.goToIndex(params);
      break;
    case 'back': //页面跳转
      return BW.back();
      break;
  }

}

function getFunName(fn) {
  //"getvalueFromApp"
  //"bound getvalueFromApp"
  let res = fn.name.split(' ')
  if (res.length > 1) {
    return res[1]
  }else if (res.length > 0) {
    return res[0]
  }
}
