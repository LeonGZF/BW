<template>
  <div id="app">
    <div class="header">
      <div class="header_nav">
        <img
          v-if="input.type =='1'"
          src="../../assets/img/backBlackNormal@2x.png"
          class="back"
          @click="callBack()"
        />
      </div>
    </div>
    <div class="content">
      <div class="title">{{input.title}}</div>
      <div class="input_content">
        <div class="info" v-if="input.info != ''">
          {{input.info}}
          <span
            v-if="input.type == '3'"
            v-bind:class="{ 'activeInfo' : input.type == '3' }"
          >{{input.type == '3'?form.acount:''}}</span>
        </div>
        <div class="input_item account" v-if="input.type =='1' ">
          <input
            type="text"
            placeholder="請輸入帳號(email)"
            v-model="form.acount"
            @input="validateMaill(form.acount)"
          />
        </div>
        <div class="pass_content" v-else-if="input.type == '2'">
          <div class="input_item pass">
            <input
              type="password"
              placeholder="請輸入密碼"
              v-model="form.password"
              @input="validatePass(form.password)"
            />
          </div>
          <div class="input_item pass2">
            <input
              type="password"
              placeholder="請再次輸入密碼"
              v-model="form.password2"
              @input="validate2Pass(form.password2)"
            />
          </div>
        </div>
        <div v-else-if="input.type == '3'">
          <div
            class="reMailVerified"
            v-bind:class="{ 'active' : message.reMailVerifiedType }"
            @click="reMailVerifiedBtn()"
          >重新發送重置信{{message.reMailVerifiedType ? '' :'('+timer.time+'s)'}}</div>
        </div>
        <div class="errorinfo_div" v-if="message.errortype">
          <span class="errorinfo">{{message.errorStr}}</span>
        </div>
      </div>
    </div>
    <div class="foot_div" v-if="input.isNotSet == '0'">
      <div
        class="continue"
        v-bind:class="{ 'active' : message.continueType }"
        @click="continueBtn()"
      >繼續</div>
    </div>
    <div class="foot_fix_div" v-if="input.isNotSet == '1'">
      <div class="foot_bg"></div>
      <div class="bakLogin" @click="backLogin()">返回登入</div>
    </div>
  </div>
</template>
<script>
import { checkMail, ForgetPassword, sendForgetPwdMail } from "@/apis/register";
import SendMessageToApp from "../../jsAppInteractive/index3.js";
import { browserVerify } from "@/utils/browserUtil";
export default {
  name: "forgotPassword",
  data() {
    return {
      form: {
        pwdType: false,
        password: "",
        password2: "",
        acount: ""
      },
      message: {
        errortype: false,
        reMailVerifiedType: false,
        continueType: false,
        errorStr: ""
      },
      timer: {
        time: 60,
        setInterName: null
      },
      input: {
        type: 1, //1 meail 2 password  3 sex ,4 birthday ,5 phone
        title: "請輸入您的帳號",
        info: " ",
        isNotSet: 0
      }
    };
  },
  methods: {
    validateMaill(mail) {
      //邮箱格式
      var reg = /^([a-zA-Z]|[0-9])(\w|\-|\.)+@[a-zA-Z0-9|\-]+(\.([a-zA-Z0-9]{1,4}))+$/;
      if (mail == "") {
        return this.$Message("帳號不能為空");
      } else if (!reg.test(mail)) {
        return this.$Message("帳號(email)輸入錯誤，請重新輸入");
      } else {
        checkMail(mail).then(res => {
          if (res.data.errorCode == "200") {
            alert("email未註冊")
            return this.$Message("email未註冊");
          } else if (res.data.errorCode == "401") {
            this.message.errortype = false;
            this.message.continueType = true;
            return true;
          }
        });
      }
    },
    validatePass(pass) {
      //密碼格式
      var reg = /^[a-zA-Z0-9_]*$/;
      if (pass == "") {
        return this.$Message("密碼不能为空");
      } else if (pass.length < 6 || pass.length > 16) {
        return this.$Message("請輸入6~16個字元");
      } else if (!reg.test(pass)) {
        return this.$Message("密碼格式错误，請重新輸入");
      } else {
        this.message.errortype = false;
      }
    },
    validate2Pass(pass) {
      //密碼二次确认
      var reg = /^[a-zA-Z0-9_]*$/;
      if (pass == "") {
        return this.$Message("密碼不能为空");
      } else if (pass.length < 6 || pass.length > 16) {
        return this.$Message("請輸入6~16個字元");
      } else if (!reg.test(pass)) {
        return this.$Message("密碼格式错误，請重新輸入");
      } else if (pass != this.form.password) {
        return this.$Message("密碼不一致，請重新輸入");
      } else {
        this.message.errortype = false;
        this.message.continueType = true;
        return true;
      }
    },
    $Message(errorifo) {
      this.message.errorStr = errorifo;
      this.message.errortype = true;
      this.message.continueType = false;
      return false;
    },
    continueBtn() {
      var jsondata =
        '[{"type":1,"title":"請輸入您的帳號","info":"","isNotSet":0},{"type":2,"title":"重設您的密碼","info":"密碼包含英數、底線，長度介於6~16個字元","isNotSet":0},{"type":3,"title":"重置密碼信件已寄出","info":"已經將密碼重置信寄至","isNotSet":1}]';
      var array = JSON.parse(jsondata);
      var currType = this.input.type;
      var mail = this.form.acount;
      var password = this.form.password;
      if (this.message.continueType && currType == "2") {
        ForgetPassword(mail, password).then(res => {
          if (res.data.errorCode == "200") {
            this.message.errortype = false;
            this.message.continueType = true;
            return true;
          }
        });
      }
      if (this.message.continueType || this.message.isNotSet == 0) {
        for (var i = 0; i < array.length; i++) {
          var type = array[i].type;
          var title = array[i].title;
          var info = array[i].info;
          var isNotSet = array[i].isNotSet;
          if (currType + 1 == type) {
            this.input.type = type;
            this.input.title = title;
            this.input.info = info;
            this.input.isNotSet = isNotSet;
            this.message.continueType = false;
          }
        }
      }
    },
    callBack() {
      var currType = this.input.type;
      if (currType == "1") {
        this.$router.push("login");
      } else {
        for (var i = 0; i < array.length; i++) {
          var type = array[i].type;
          var title = array[i].title;
          var info = array[i].info;
          var isNotSet = array[i].isNotSet;
          if (currType - 1 == type) {
            this.input.type = type;
            this.input.title = title;
            this.input.info = info;
            this.input.isNotSet = isNotSet;
            this.message.continueType = false;
          }
        }
      }
    },
    backLogin() {
      this.$router.push("login");
    },
    timerM() {
      var time = this.timer.time;
      console.log(time);
      this.timer.time = time - 1;
      if (time == 0) {
        this.timer.time = 60;
        this.message.reMailVerifiedType = true;
      }
    },
    reMailVerifiedBtn() {
      if (this.message.reMailVerifiedType) {
        sendForgetPwdMail(this.form.acount).then(res => {
          if (res.data.errorCode == "200") {
            this.message.reMailVerifiedType = false;
            const login = this;
            this.timer.setInterName = setInterval(() => {
              login.timerM();
            }, 1000);
            return true;
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
      data.backgroundColor = "#CD0505";
      data.behavior = 0;
      data.rightButton = rightButtonArry;
      data.leftButton = leftButtonArry;
      return data;
    }
  },
  mounted() {
    if (browserVerify.verifyBW()) {
      this.setActionbar();
      
      this.$bridge.registerhandler("getActionBar", function(
        data,
        responseCallback
      ) {
        responseCallback(this.getActionBar());
      });
      window.getActionBar = this.getActionBar; //第三方回调
    }
  },
  created() {
    this.$watch("timer.time", function(newValue, oldValue) {
      const login = this;
      console.log("time----" + this.timer.time);
      if (this.timer.time == "60") {
        clearInterval(this.timer.setInterName);
      }
    });
    this.$watch("input.type", function(newValue, oldValue) {
      const login = this;
      console.log("type----" + this.input.type);
      if (this.input.type == "3") {
        this.timer.setInterName = setInterval(() => {
          login.timerM();
        }, 1000);
      }
    });
    this.$once("hook:beforeDestroy", () => {
      const timer = this.timer.setInterName;
      if (timer) {
        clearInterval(timer);
      }
    });
    var email = this.$route.params.email;
    console.log(email + "1111111111111111");
    if (email) {
      this.form.acount = email;
      this.message.continueType = true;
    }
  }
};
</script>
<style scoped>
html,body{
  height: 100%;
}
#app {
  width: 750px;
  height: 100%;
  margin: 0 auto;
  /* position: relative; */
}
.header {
  width: 750px;
  height: 80px;
}
.header_nav {
  width: 750px;
  height: 88px;
  background: #ffffff url(../../assets/img/combinedShape@2x.png) no-repeat
    center;
  background-size: 118px 64px;
}
.header_nav img {
  margin-left: 16px;
  width: 88px;
  height: 88px;
  float: left;
}
.content {
  width: 750px;
}
.content .title {
  font-size: 60px; /*drp*/
  color: rgb(66, 66, 66);
  line-height: 84px;
  font-family: PingFangTC-Medium, sans-serif;
  height: 84px;
  text-align: left;
  padding: 0px 40px;
  margin-top: 48px;
}
.input_content .info {
  width: 670px;
  font-size: 28px; /*drp*/
  font-family: PingFangTC-Regular, sans-serif;
  line-height: 40px;
  color: rgb(66, 66, 66, 0.6);
  margin-top: 8px;
  text-align: left;
  margin-bottom: 32px;
}
.activeInfo {
  color: rgb(205, 5, 5);
}
.input_content {
  width: 670px;
  margin: 0 auto;
}
.account {
  margin-top: 24px;
}
.pass {
  margin-top: 32px;
}
.pass2 {
  margin-top: 32px;
}
.reMailVerified {
  width: 400px;
  height: 88px;
  text-align: center;
  line-height: 88px;
  color: rgba(66, 66, 66, 0.6);
  margin-top: 64px;
  background-color: rgb(185, 185, 185, 0.2);
  font-family: PingFangTC-Medium, sans-serif;
  font-size: 32px;
}
.input_item {
  height: 88px;
  width: 670px;
  position: relative;
  border-radius: 4px;
}
.input_item input {
  height: 56px;
  width: 630px;
  padding: 16px 20px;
  line-height: 56px;
  font-size: 28px;
  letter-spacing: 2px;
  background-color: #f6f6f6 !important;
  border-radius: 4px;
  color: rgba(66, 66, 66);
}
.input_content input::-webkit-input-placeholder {
  /* WebKit browsers */
  color: rgba(66, 66, 66, 0.6);
}
.input_content input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: rgba(66, 66, 66, 0.6);
}
.input_content input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: rgba(66, 66, 66, 0.6);
}
.input_content input:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: rgba(66, 66, 66, 0.6);
}
.input_item input:-webkit-autofill {
  background: unset !important;
  box-shadow: 0 0 0px 1000px #f6f6f6 inset;
}
.errorinfo_div {
  width: 670px;
  height: 40px;
  margin: 0 auto;
}
span.errorinfo {
  font-size: 28px; /*drp*/
  color: #cd0505;
  line-height: 40px;
  margin-top: 16px;
  float: left;
}
.foot_div {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 750px;
  overflow: hidden
}
.continue {
  width: 690px;
  height: 48px;
  background-color: rgb(185, 185, 185, 0.2);
  color: rgb(66, 66, 66, 0.6);
  font-size: 32px;
  line-height: 48px;
  text-align: center;
  padding: 20px 30px;
  font-family: PingFangTC-Medium, sans-serif;
}
.active {
  background-color: #cd0505 !important;
  color: #ffff !important;
}
.foot_fix_div {
  width: 750px;
  height: 590px;
  position: absolute;
  bottom: 0;
  left: 0;
}
.foot_bg {
  background: url("../../assets/img/showaccount@2x.png") no-repeat;
  background-size: 750px 502px;
  background-color: #ffffff;
  width: 750px;
  height: 502px;
}
.bakLogin {
  width: 690px;
  height: 48px;
  background-color: rgb(205, 5, 5);
  color: rgb(255, 255, 255);
  font-size: 32px;
  line-height: 48px;
  text-align: center;
  padding: 20px 30px;
  font-family: PingFangTC-Medium, sans-serif;
}
</style>
