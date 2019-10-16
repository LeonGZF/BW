import request from '@/utils/request'
import store from '@/store/index'
import Cookie from '@/assets/js/cookie'



export function getThirdMessage (){
    try {
        return request.post('/userCenter/getUserMessage',{
            // token: store.state.token
            token: Cookie.getCookie(document.cookie,'token')
        })
    } catch (error) {
        return error;
    }
   
}
export function updatePassword (Password,ConfirmPassword){
    try {
        return request.post('/userCenter/UpdatePassword',{
            token: Cookie.getCookie(document.cookie,'token'),
            Password:Password,
            ConfirmPassword:ConfirmPassword,
            email:store.state.Email
        })
    } catch (error) {
        return error;
    }
   
}
export function findUserMessage (){
    try {
        return request.post('/userCenter/findUserMessage',{
            token: Cookie.getCookie(document.cookie,'token'),
        })
    } catch (error) {
        return error;
    }
   
}
export function updateUserMessage (realName,sex,birthDay,mobile){
    try {
        return request.post('/userCenter/updateUserMessage',{
            token: Cookie.getCookie(document.cookie,'token'),
            realName:realName,
            sex:sex,
            birthDay:birthDay,
            mobile:mobile,
        })
    } catch (error) {
        return error;
    }
   
}
