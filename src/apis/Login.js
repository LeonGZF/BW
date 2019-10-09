import request from '@/utils/request'
import store from '@/store/index'
export function loginReq(username,password,deviceId) {
    try {
        return request.post('/Member/LoginMember',{
            userName: username,
            password: password,
          deviceId:deviceId
        })
    } catch (error) {
        return error;
    } 
}
export function loginOut() {
    try {
        return request.post('/Member/LogOut',{
            token: store.state.token,
        })
    } catch (error) {
        return error;
    }
}
export function tmpLogin() {
    try {
        return request.post('/Member/tmpLogin',{
            token: store.state.form.deviceId,
        })
    } catch (error) {
        return error;
    }
}
export function SocialLogin(sociaId,loginMethod,sociaToken,email,deviceId) {
    // alert(email,sociaToken,sociaId,loginMethod)
    try {
        return request.post('/Member/SocialLoginMember',{
            id: sociaId,
            loginMethod: loginMethod,
            token: sociaToken,
            email: email,
            deviceId:deviceId

        })
    } catch (error) {
        return error;
    }
}
