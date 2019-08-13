import request from '@/utils/request'
import store from '@/store/index'
export function loginReq(username,password) {
    try {
        return request.post('/Member/LoginMember',{
            userName: username,
            password: password
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
export function SocialLogin(sociaId,loginMethod,sociaToken,email) {
    // alert(email,sociaToken,sociaId,loginMethod)
    try {
        return request.post('/Member/SocialLoginMember',{
            id: sociaId,
            loginMethod: loginMethod,
            token: sociaToken,
            email: email
        })
    } catch (error) {
        return error;
    }
}
