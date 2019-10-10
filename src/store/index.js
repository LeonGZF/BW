//store index.js
import Vue from 'vue'
import Vuex from 'vuex'
//引入自己封装好的cookie方法
import Cookie from '../assets/js/cookie'
import SendMessageToApp from "../jsAppInteractive/index3.js";
import { tmpLogin } from "@/apis/Login.js";
import { browserVerify } from "@/utils/browserUtil";
import Bridge from '../jsAppInteractive/iosJsBridge.js'
Vue.use(Vuex);
//初始化时用sessionStore.getItem('token'),这样子刷新页面就无需重新登录

const state = {
  isLogin: sessionStorage.getItem('isLogin') ? sessionStorage.getItem('isLogin') : false,
  token: Cookie.getCookie(window.document.cookie, "token"),
  Email: sessionStorage.getItem('Email') ? sessionStorage.getItem('Email') : "未登錄",
  form: {
    password: "",
    acount: "",
    sex: 0,
    userName: "",
    birthday: "",
    phone: "",
    deviceId:Cookie.getCookie(window.document.cookie, "device_id")
  },
  sso: {
    unionId: "",
    loginType: 0,
    providerKey: "",
    email: "",
    userName:""
  },
  native:{
    gotoLogin:false,
  },
};
const mutations = {
  LOGIN: (state, data) => {
    //更改token的值
    state.token = data;
    state.isLogin = true;
    sessionStorage.setItem('isLogin', true);
    Cookie.setCookie({
      "token": data
    }, 10,'.bwplus.com.tw');
    Cookie.setCookie({
      "token": data
    }, 10);
    var object = new Object();
    object.Token = data;
    var status = new Object();
    status.login = true;
    console.log(JSON.stringify(object));
    if (browserVerify.verifyBW() ) { // BW APP
      if (browserVerify.verifyIos()) { // IOS
         window.webkit.messageHandlers.saveToken.postMessage(object); //TODO   定义原生方法 及参数 
         window.webkit.messageHandlers.setLoginStatus.postMessage(status); //TODO   定义原生方法 及参数 
      } else if (browserVerify.verifyAndroid()) { //android
        SendMessageToApp("saveToken", JSON.stringify(object)); //TODO  定义原生方法 及参数
        SendMessageToApp("setLoginStatus", JSON.stringify(status)); //TODO  定义原生方法 及参数
      }
    }

  },
  EMAIL: (state, data) => {
    //把用户名存起来
    state.Email = data;
    sessionStorage.setItem('Email', data);
  },
  LOGOUT: (state,token) => {
    //登出的时候要清除token
    state.token = null;
    state.isLogin = false;
    sessionStorage.removeItem('isLogin')
    sessionStorage.removeItem('Email');
    if(!token){
      //Cookie.deleteCookie("token");
    }else{
      Cookie.setCookie({
        "token": token
      }, 10,'.bwplus.com.tw');
      Cookie.setCookie({
        "token": token
      }, 10);
    }
    if (browserVerify.verifyBW()) {
      var object = new Object();
      object.Token = token;
      var status = new Object();
      status.login = false;
      if (browserVerify.verifyAndroid()) {
        SendMessageToApp("setLoginStatus", JSON.stringify(status));
        SendMessageToApp("saveToken", JSON.stringify(object));
      }
      if (browserVerify.verifyIos()) {
        //判断IOS
         window.webkit.messageHandlers.setLoginStatus.postMessage(status);
         window.webkit.messageHandlers.saveToken.postMessage(object); //TODO   定义原生方法 及参数 
      }
    }
    
  },

  //r表示register
  rEmail: (state, data) => {
    state.form.acount = data
  },
  rPassword: (state, data) => {
    state.form.password = data
  },
  rBirthday: (state, data) => {
    state.form.birthday = data
  },
  rSex: (state, data) => {
    state.form.sex = data
  },
  rUserName: (state, data) => {
    state.form.userName = data
  },
  rPhone: (state, data) => {
    state.form.phone = data
  },
  
  rClaer: (state) => {
    state.  form= {
      password: "",
      acount: "",
      sex: 0,
      userName: "",
      birthday: "",
      phone: ""
    }
  },
  setNative:(state,data) =>{
    state.native.gotoLogin = data
  },
  

  //sso
  ssoUnionId: (state, data) => {
    state.sso.unionId = data
  },
  ssoLoginType: (state, data) => {
    state.sso.loginType = data
  },
  ssoProviderKey: (state, data) => {
    state.sso.providerKey = data
  },
  ssoEmail: (state, data) => {
    state.sso.email = data
  },
  ssoUserName: (state, data) => {
    state.sso.userName = data
  },
  ssoClear: (state) => {
    state.sso= {
      unionId: "",
      loginType: 0,
      providerKey: "",
      email: "",
      userName:""
    }
  },

};

// const actions = {

//   UserLogin({ commit }, data){
//     commit('LOGIN', data);
//   },

//   UserLogout({ commit }){
//     commit('LOGOUT');
//   },

//   Email({ commit }, data){
//     commit('EMAIL', data);
//   }
// };

export default new Vuex.Store({
  state,
  mutations,
});
