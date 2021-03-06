import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


import login from '@/components/login/login'
// import register from '@/components/login/register'
import termAndPolicy from '@/components/login/termAndPolicy'
import forgotPassword from '@/components/login/forgotPassword'
import Changepwd from '@/components/login/Changepwd'
import profile from '@/components/Profile/Profile'
import Acountpicker from '@/components/Profile/setting/Acountpicker'
import Workexperience from '@/components/Profile/setting/Workexperience'


//引入register里面的组件
import register from '@/components/login/registeraaa'
// import register from '@/components/login/register'

import RegisterEmail from '@/components/login/register/RegisterEmail'
import RegisterPwd from '@/components/login/register/RegisterPwd'
import RegisterTrueName from '@/components/login/register/RegisterTrueName'
import RegisterSex from '@/components/login/register/RegisterSex'
import RegisterMobile from '@/components/login/register/RegisterMobile'
import RegisterBirthday from '@/components/login/register/RegisterBirthday'
import RegisterSendEmail from '@/components/login/register/RegisterSendEmail'
// import RegisterExist from '@/components/login/register/RegisterExist'

//第三方登录
import RegisterEmailThirdpart from '@/components/login/register/RegisterEmailThirdpart'
import RegisterEmailThirdpartIos from '@/components/login/register/RegisterEmailThirdpartIos'
import RegisterEmailOther from '@/components/login/register/RegisterEmailOther'
import RegisterPwdThirdIos from '@/components/login/register/RegisterPwdThirdIos'
import RegisterPwdThird from '@/components/login/register/RegisterPwdThird'
import RegisterBindSuccess from '@/components/login/register/RegisterBindSuccess'

//会员点数相关
import MemberPoint from '@/components/Profile/MyMemberPoint/MemberPoint'
import MemberPointNews from '@/components/Profile/MyMemberPoint/MemberPointNews'
import MemberPointNewsUse from '@/components/Profile/MyMemberPoint/MemberPointNews/Use'
import MemberPointNewsGet from '@/components/Profile/MyMemberPoint/MemberPointNews/Get'


const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'profile',
      component: profile,
    },
    {
      path: '/profile/setting/accountPicker',
      name: 'Acountpicker',
      component: Acountpicker,
    },
    {
      path: '/profile/setting/workexperience',
      name: 'Workexperience',
      component: Workexperience,
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    }, {
      path: '/memberPoint',
      name: 'MemberPoint',
      component: MemberPoint,
    }, {
      path: '/memberPointnews',
      name: 'MemberPointNews',
      component: MemberPointNews,
      children: [
        {
          path:'/memberPointnews/use',
          name:'MemberPointNewsUse',
          component:MemberPointNewsUse,
        },
        {
          path:'/memberPointnews/get',
          name:'MemberPointNewsGet',
          component:MemberPointNewsGet,
        }
      ]
    },
    {
      path: '/register',
      name: 'Register',
      component: register,
      children: [
        {
          path: '',
          name: 'RegisterEmail',
          component: RegisterEmail,
        },
        {
          path: '/register/password',
          name: 'RegisterPwd',
          component: RegisterPwd,
        },
        {
          path: '/register/sex',
          name: 'RegisterSex',
          component: RegisterSex,
        },
        {
          path: '/register/truename',
          name: 'RegisterTrueName',
          component: RegisterTrueName,
        },
        {
          path: '/register/birthday',
          name: 'RegisterBirthday',
          component: RegisterBirthday,
        },
        {
          path: '/register/mobile',
          name: 'RegisterMobile',
          component: RegisterMobile,
        },
        {
          path: '/register/sendemail',
          name: 'RegisterSendEmail',
          component: RegisterSendEmail,
        },
        {
          path: '/register/emailthird',
          name: 'RegisterEmailThirdpart',
          component: RegisterEmailThirdpart,
        },
        {
          path: '/register/emailthirdios',
          name: 'RegisterEmailThirdpartIos',
          component: RegisterEmailThirdpartIos,
        },
        {
          path: '/register/emailother',
          name: 'RegisterEmailOther',
          component: RegisterEmailOther,
        },
        {
          path: '/register/pwdthird',
          name: 'RegisterPwdThird',
          component: RegisterPwdThird,
        },{
          path: '/register/pwdthirdios',
          name: 'RegisterPwdThirdIos',
          component: RegisterPwdThirdIos,
        },
        {
          path: '/register/bind',
          name: 'RegisterBindSuccess',
          component: RegisterBindSuccess,
        },
      ]
    }, {
      path: '/termandpolicy',
      name: 'termAndPolicy',
      component: termAndPolicy,
    }, {
      path: '/forgotPassword',
      name: 'forgotPassword',
      component: forgotPassword,

    }, {
      path: '/changepwd',
      name: 'Changepwd',
      component: Changepwd,
    }, {
      path: '/coupon',
      name: 'coupon',
      component: () => import('@/components/Coupon/Index')
    }
  ]
});

export default router;
