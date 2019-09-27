import request from '@/utils/request'
export function checkMail(mail) {
    try {
        return request.post('/userCenter/CheckEmailAvailable',{
            email: mail
        })
    } catch (error) {
        return error;
    }

}
export function register(mail,moblie,sex,birthDate,password,name,deviceId) {
    try {
        return request.post('/userCenter/RegisterMember',{
            email: mail,
            mobile: moblie,
            sex: sex,
            birthDate: birthDate,
            password: password,
            realName: name,
            deviceId: deviceId
        })
    } catch (error) {
        return error;
    }
}
export function UpdateMember(token,loginProvider,type,providerKey) {
    try {
        return request.post('/userCenter/UpdateMember',{
            ssoToken: token,
            loginProvider: loginProvider,
            providerKey:providerKey,
            loginMethod:type
        })
    } catch (error) {
        return error;
    }
}
export function socialRegisterMember(password,mail,moblie,sex,birthDate,loginMethod,loginProvider,name,providerKey) {
    try {
        return request.post('/userCenter/SocialRegisterMember',{
            email: mail,
            id: loginProvider,
            loginMethod:loginMethod,
            mobile:moblie,
            sex:sex,
            birthDate:birthDate,
            realName:name,
            displayName:providerKey,
            password:password,
            token:providerKey
        })
    } catch (error) {
        return error;
    }
}
export function ForgetPassword(mail,password) {
    try {
        return request.post('/userCenter/ForgetPassword',{
            email: mail,
            password:password
        })
    } catch (error) {
        return error;
    }
}
export function sendForgetPwdMail(mail) {
    try {
        return request.post('/userCenter/sendForgetPwdMail',{
            mail: mail,
        })
    } catch (error) {
        return error;
    }
}
export function sendActiveMail(mail,type) {
    try {
        return request.post('/userCenter/sendActiveEmail',{
            email: mail,
            type:type
        })
    } catch (error) {
        return error;
    }
}
export function sendAllMail(mail) {
    try {
        return request.post('/userCenter/loginBtnSendEmail',{
            email: mail,
        })
    } catch (error) {
        return error;
    }
}
