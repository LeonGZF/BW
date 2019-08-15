//直接引入
import axios from 'axios'
//因为axios默认发的是json格式数据，我们要做表单提交，需要更改axios配置
// 引入 Qs是为了把json格式，转为formdata 的数据格式
import qs from 'Qs'
import store from '../store'
import Vue from 'vue'
import browserVerify  from "@/utils/browserUtil";
import SendMessageToApp from "../jsAppInteractive/index3.js";
import Bridge  from '../jsAppInteractive/iosJsBridge.js';
const service = axios.create({
    baseURL: 'api',
    timeout: 600000,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    transformRequest: [function (data) {
        // 对 data 进行任意转换处理
        return qs.stringify(data);
    }],
});

// request拦截器
service.interceptors.request.use(config => {
    // Tip: 1
    // 请求开始的时候可以结合 vuex 开启全屏的 loading 动画
    if(browserVerify.verifyBW()){
        var isloading =new Object();
        isloading.loading=true;
        if(browserVerify.verifyAndroid()){
            SendMessageToApp("setLoading",JSON.stringify(isloading))
        }
        if(browserVerify.verifyIos()){
            //判断IOS
            //不要用 Vue.$bridge !!!!!!!!!!!
            window.webkit.messageHandlers.setLoading.postMessage(isloading);
        }
    }
    // Tip: 2 
    // 带上 token , 可以结合 vuex 或者重 localStorage
    if (store.state.token) {
        console.log("interceptors has token" +store.state.token);
        config.headers.Authorization = `token ${store.state.token}` // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    }
    console.log("interceptors  token" +store.state.token);
    console.log("interceptors  Email" +store.state.Email);

    // Tip: 3
    // 根据请求方法，序列化传来的参数，根据后端需求是否序列化
    if (config.method.toLocaleLowerCase() === 'post'
        || config.method.toLocaleLowerCase() === 'put'
        || config.method.toLocaleLowerCase() === 'delete') {

        //config.data = qs.stringify(config.data);
    }
    return config
}, error => {
    // 请求错误时做些事(接口错误、超时等)
    // Tip: 4
    // 关闭loadding
    
    console.log('request:', error);
    return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
})

// respone拦截器
service.interceptors.response.use(
    response => {
        // 响应成功关闭loading
        if(browserVerify.verifyBW()){
            var isloading =new Object();
            isloading.loading=false;
            if(browserVerify.verifyAndroid()){
                SendMessageToApp("setLoading",JSON.stringify(isloading))
            }
            if(browserVerify.verifyIos()){
                //判断IOS
                window.webkit.messageHandlers.setLoading.postMessage(isloading);
            }
        }
        return response
    },
    /**
    * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
    * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
    */
    //  const res = response.data;
    //     if (res.code !== 20000) {
    //       Message({
    //         message: res.message,
    //         type: 'error',
    //         duration: 5 * 1000
    //       });
    //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //         MessageBox.confirm('你已被登出，可以取消繼續留在该页面，或者重新登录', '确定登出', {
    //           confirmButtonText: '重新登录',
    //           cancelButtonText: '取消',
    //           type: 'warning'
    //         }).then(() => {
    //           store.dispatch('FedLogOut').then(() => {
    //             location.reload();// 为了重新实例化vue-router对象 避免bug
    //           });
    //         })
    //       }
    //       return Promise.reject('error');
    //     } else {
    //       return response.data;
    //     }
    
    error => {
        console.log("111111111111111111");
        console.log('err' + error)// for debug
        // Message({
        //     message: error.message,
        //     type: 'error',
        //     duration: 5 * 1000
        // })
        return Promise.reject(error)
    })

export default service