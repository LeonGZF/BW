<template>
  <div id="changepwd">
    <header class="tab">
      <div class="goBack" @click="goback"></div>
      <div class="ChangePwd">更改密碼</div>
      <div :class="sureornot" @click="showTos">變更</div>
    </header>
    <div class="main">
      <div>
        <span>請輸入原密碼</span>
        <input id="p1" v-model="oldPwd"   type="password" name placeholder="請輸入原密碼" />
      </div>
      <div>
        <span>請輸入新密碼</span>
        <input id="p2" v-model="newPwd" type="password" name placeholder="請輸入新密碼"  />
        <p>密碼包含英數字、底線，長度介於6~16個字元</p>
      </div>
      <div>
        <span>再次輸入新密碼</span>
        <input id="p3" v-model="newPwd1" @blur="check" type="password" name placeholder="再次輸入新密碼" />
      </div>
      <div class="errorinfo_div" v-if="message.errortype">
        <span class="errorinfo">{{message.errorStr}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Toast from "../dialog/Toast";

Vue.prototype.$dialog = {
  toast: Toast
};

import { updatePassword } from "@/apis/proflie";
import SendMessageToApp from "../../jsAppInteractive/index3.js";
import { browserVerify } from "@/utils/browserUtil";
import Cookie from '@/assets/js/cookie'
// Vue.component('toast',Toast)
export default {
  data() {
    return {
      //判断两次密碼是否一样
      newPwd: "",
      oldPwd: "",

      newPwd1: "",
      //模态框显示文字
      mes: "密碼更新成功！<br>請重新登入",
      //模态框是否显示
      isShow: false,
      //判断右上角变更文字的样式
      sureornot: "not",
      message:{
        errortype:true,
        errorStr:''
      }
    };
  },
  methods: {
    goback() {
      this.$router.replace("/");
    },
    check() {
       var reg = /^[a-zA-Z0-9_]*$/;
      if(this.oldPwd ==''){
        this.$Message("原密碼不能為空");
      }else if(this.newPwd ==''){
        this.$Message("新密碼不能為空");
      }else  if (this.newPwd.length < 6 || this.newPwd.length > 16) {
        return this.$Message("請輸入6~16個字元");
      } else if (!reg.test(this.newPwd)) {
        return this.$Message("密碼格式错误，請重新輸入");
      } else  if (this.newPwd == this.newPwd1) {
        this.sureornot = "sure";
        this.message.errortype =true;
        this.message.errorStr ='';
      } else {
        this.$Message("兩次密碼不一致");
      }
    },
    $Message(errorifo) {
      this.message.errorStr = errorifo;
      this.message.errortype = true;
      return false;
    },
    showTos() {
      if (this.sureornot == "not") {
        return;
      } else {
        var Password = this.oldPwd;
        var ConfirmPassword = this.newPwd;
        updatePassword(Password, ConfirmPassword).then(res => {
          if (res.data.errorCode == "200") {
            this.$dialog.toast({
              mes: this.mes,
              icon: "success",
              timeout: 1500
            });
            let me= this;
            setTimeout(function(){
              me.$router.push("login");
            },1500);
            var token = res.data.jDate.Token;
            console.log("new Token=",token);
             sessionStorage.setItem('isLogin', false);
             let cookieDomian=process.env.COOKIE_DOMAIN;
            Cookie.setCookie({
                "token": token
              }, 10,)
            Cookie.setCookie({
                "token": token
              }, 10,""+cookieDomian+"")

            this.$store.commit("TOKEN",token);
          }else{
            this.$Message("原密碼輸入錯誤");
          }
        });
      }
    },
    setActionbar() {
      if (browserVerify.verifyAndroid()) {
        //判断是android
        SendMessageToApp("setActionBar", JSON.stringify(this.getActionBar()));
      } else if (browserVerify.verifyIos()) {
        //判断IOS
         window.webkit.messageHandlers.setActionBar.postMessage(this.getActionBar());
      }
    },
    getActionBar() {
      var data = new Object();
      var rightButtonArry = new Array();
      var leftButtonArry = new Array();
      data.title = "";
      data.type = 4;
      data.backgroundColor = "#FFFFFF";
      data.behavior = 0;
      data.rightButton = rightButtonArry;
      data.leftButton = leftButtonArry;
      return data;
    }
  },
  mounted() {
    if (browserVerify.verifyBW()) {
      this.setActionbar();
      window.getActionBar = this.getActionBar; //第三方回调
      this.$bridge.registerhandler("getActionBar", function(
        data,
        responseCallback
      ) {
        responseCallback(this.getActionBar());
      });
    }
  }
};
</script>

<style scoped>

#changepwd .tab {
  height: 88px;
  font-size: 34px;
  font-weight: 700;
  letter-spacing: 0.82px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

#changepwd .not {
  padding-right: 30px;
  opacity: 0.2;
}
#changepwd .sure {
  padding-right: 30px;
  opacity: 1;
}
#changepwd .goBack {
  padding-left: 16px;
  width: 88px;
  height: 88px;
  background: url("../../assets/img/backBlackNormal.png") no-repeat center;
}

#changepwd .main {
  padding: 0 40px;
  text-align: left;
}
#changepwd .main input {
  display: block;
  width: 670px;
  height: 88px;
  background-color: rgb(246, 246, 246);
  text-align: left;
  text-indent: 20px;
  border-radius: 0px;
}
#changepwd .main span {
  color: rgba(66, 66, 66, 0.6);
  line-height: 40px;
  font-size: 28px;
  letter-spacing: 0;
  margin-bottom: 8px;
}
#changepwd .main p {
  font-size: 28px;
  line-height: 40px;
  letter-spacing: 0;
  margin-top: 16px;
  color: rgb(66, 66, 66);
}
#changepwd .main div {
  margin-top: 32px;
}
#changepwd .main div.errorinfo_div {
  width: 600px;
  height: 40px;
  margin-top: .213333rem;
}
#changepwd span.errorinfo {
  font-size: 28px; /*drp*/
  color: #cd0505;
  line-height: 40px;
  float: left;
  margin-top: 0;
}
</style>
