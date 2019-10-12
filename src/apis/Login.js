import request from '@/utils/request'
import store from '@/store/index'
import Cookie from '@/assets/js/cookie'

var device_id=Cookie.getCookie(document.cookie,"device_id");
export function loginReq(username,password) {
    try {
        return request.post('/Member/LoginMember',{
            userName: username,
            password: password,
          deviceId:device_id
        })
    } catch (error) {
        return error;
    } 
}
export function loginOut() {
    try {
        return request.post('/Member/LogOut',{
            token:Cookie.getCookie(document.cookie,'token'),
        })
    } catch (error) {
        return error;
    }
}
export function tmpLogin() {
    try {
        return request.post('/Member/tmpLogin',{
            token: device_id
        })
    } catch (error) {
        return error;
    }
}
export function SocialLogin(sociaId,loginMethod,sociaToken,email) {
    // alert(email,sociaToken,sociaId,loginMethod)
    try {
        return request.post('/Member/SocialLoginMember',{
            id: sociaId,
            loginMethod: loginMethod,
            token: sociaToken,
            email: email,
            deviceId:device_id

        })
    } catch (error) {
        return error;
    }
}
