<template>
  <div class="login">
    <div id="header" :class="fixdtop"></div>
    <div class="login_img_content">
      <img class="login_img" src="../../assets/img/logo.png" />
    </div>
    <div class="login_input_contnet">
      <div class="login_fb login_item" @click="auth('facebook')">使用Facebook登入</div>
      <div class="login_gg login_item" @click="auth('google')">使用Google登入</div>
      <p class="line">
        <span class="line_or">或</span>
      </p>
      <div class="login_email login_item">
        <div class="input_item">
          <input
            type="text"
            placeholder="請輸入帳號(email)"
            v-model="form.acount"
            @blur="validateMaill(form.acount)"
          />
        </div>
      </div>
      <div class="login_pas login_item">
        <div class="input_item">
          <input type="text" placeholder="請輸入密碼" v-if="form.pwdType" v-model="form.password" />
          <input type="password" placeholder="請輸入密碼" v-else v-model="form.password" />
          <span class="pas_eye">
            <img :src="this.form.eyeImg" @click="changeType()" />
          </span>
        </div>
      </div>
      <div class="errorinfo_div" v-if="message.errortype">
        <span class="errorinfo">{{message.errorStr}}</span>
      </div>
      <div class="login_submit login_item" @click="loginHandle(form.acount,form.password)">登入</div>
    </div>
    <div class="forget_content">
      <span class="forget_pass" @click="forgotPass()">忘記密碼</span>
      <!-- <span class="forget_account">忘記账号</span> -->
    </div>
    <div class="info_content">
      <div class="info">
        <p class="info_singup">
          還不是會員？使用
          <a href="javascript:void(0);" class="singup_info" @click="gotoRegister()">email註冊</a>
        </p>
        <p class="info_termAndPolicy">
          當您按下註冊表示同意我們的
          <a
            href="javascript:void(0);"
            class="termAndPolicy_info"
            @click="gotoTermAndPolicy()"
          >服務條款與隱私權政策。</a>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
//先引入接口
import { loginReq, SocialLogin } from "@/apis/Login";
import { browserVerify } from "@/utils/browserUtil";
import SendMessageToApp from "../../jsAppInteractive/index3.js";
var login = this;
export default {
  name: "login",
  data() {
    return {
      form: {
        pwdType: false,
        eyeImg: require("../../assets/img/eye.png"),
        password: "",
        acount: "",
        type: 1
      },
      message: {
        errortype: false,
        errorStr: ""
      },
      fixdtop: ""
    };
  },
  methods: {
    changeType: function() {
      this.form.pwdType = !this.form.pwdType; //跟着小眼睛变化，密碼框隐藏显示文本框，内容就显示了
      if (this.form.pwdType) {
        this.form.eyeImg = require("../../assets/img/openeye.png");
      } else {
        this.form.eyeImg = require("../../assets/img/eye.png");
      }
    },
    validateMaill(mail) {
      //邮箱格式
      var reg = /^([a-zA-Z]|[0-9])(\w|\-|\.)+@[a-zA-Z0-9|\-]+(\.([a-zA-Z0-9]{2,4}))+$/;
      if (!reg.test(mail)) {
        return this.$Message("郵箱格式錯誤，請重新輸入");
      } else {
        this.message.errortype = false;
        return true;
      }
    },
    $Message(errorifo) {
      this.message.errorStr = errorifo;
      this.message.errortype = true;
      return false;
    },
    auth(network) {
      var loginMethod = 0;
      switch (network) {
        case "google":
          loginMethod = 3;
          break;
        case "facebook":
          loginMethod = 2;
          break;
      }
      // 1.传入参数给手机端 是那个点击 2 google 3 facebook
      console.log("loginMethod" + loginMethod);
      if (browserVerify.verifyBW()) {
        //BW APP
        var object = new Object();
        object.loginMethod = loginMethod;
        if (browserVerify.verifyAndroid()) {
          SendMessageToApp("loginWithThirdParty", JSON.stringify(object));
        } else if (browserVerify.verifyIos()) {
          window.webkit.messageHandlers.loginWithThirdParty.postMessage(object);
        }
      } else {
        //
        // hello js 第三方登录
        // const hello = this.hello;
        // hello(network).login().then(() => {
        //   const authRes = hello(network).getAuthResponse();
        //     console.log(authRes);
        //   /*
        //     performs operations using the token from authRes
        //   */
        //   hello(network).api('me').then(function (json) {
        //     const profile = json;
        //      console.log(json);
        //     /*
        //       performs operations using the user info from profile
        //     */
        //   });
        // })
        //浏览器测试 - 模拟数据
        // var unionID = "123232sss5555555";
        // var email = "guozhifu@tomonline-inc.com";
        // var providerKey = "1111111111322sdfdsfds";
        // var userName = "郭智富";
        // console.log("111");
        // this.sendUserInformation(unionID, userName, email, loginMethod);
      }
    },
    sendUserInformation(id, userName, email, loginType) {
      // alert("id:"+id+",userName:"+userName+", email:"+email+",loginType:"+loginType)
      this.form.type = loginType;
      var unionID = id;
      var email = email;
      var providerKey = userName;
      SocialLogin(unionID, loginType, providerKey, email).then(res => {
        if (res.data.errorCode == "200") {
          this.message.errortype = false;
          let token = res.data.jDate.Token;
          let Email = res.data.jDate.Email;
          this.$store.commit("LOGIN", token);
          this.$store.commit("EMAIL", Email);
          this.$router.push("/");
        } else if (res.data.errorCode == "403") {
          this.$Message("帳號未驗證");
        } else {
          if (email) {
            //this.form.acount = email;
            // this.sso.unionId = unionId;
            // this.sso.email = email;
            // this.sso.loginType = loginType;
            // this.sso.providerKey = providerKey;
            // this.form.userName = userName;

            this.$store.commit("ssoUnionId", unionId);
            this.$store.commit("ssoEmail", email);
            this.$store.commit("ssoLoginType", loginType);
            this.$store.commit("ssoProviderKey", providerKey);

            this.$store.commit("rEmail", email);
            this.$store.commit("rUserName", userName);

            checkMail(email).then(res => {
              if (res.data.errorCode == "200") {
                //邮箱未有注册注册.
                // this.goOne(1);
                // this.form.acount = email;
              this.$router.push({
                  name: "RegisterEmailThirdpart"
                });
              } else if (res.data.errorCode == "401") {
                // 邮箱已经注册
                // this.goOne(10);
                this.$router.push({
                  name: "RegisterPwdThird"
                });
              }
            });
          } else {
            // this.goOne(0);
            this.$router.push({
              name: "register"
            });
          };
          this.$router.push({
            name: "register",
            params: {
              loginType: this.form.type,
              email: email,
              unionID: unionID,
              providerKey: providerKey,
              userName: userName
            }
          });
        }
      });
    },
    loginHandle(acount, password) {
      if (acount == "") {
        return this.$Message("帳號不能為空");
      }
      if (password == "") {
        return this.$Message("密碼不能為空");
      }
      if (this.validatePassword(password) && this.validateMaill(acount)) {
        loginReq(this.form.acount, this.form.password).then(res => {
          if (res.data.errorCode == "200") {
            this.message.errortype = false;
            let token = res.data.jDate.Token;
            let Email = res.data.jDate.Email;
            console.log(Email);

            this.$store.commit("LOGIN", token);
            this.$store.commit("EMAIL", Email);
            // console.log(this.$route.query.redirect);
            // const redirect =this.$route.query.redirect;
            this.$router.push("/");
          } else if (res.data.errorCode == "204") {
            this.$Message("帳號未驗證");
            //验证未激活状态
          } else if (res.data.errorCode == "505") {
            this.$Message("帳號未驗證");
          } else {
            this.$Message("驗證碼輸入錯誤，請重新輸入");
          }
        });
      }
    },
    validatePassword(pass) {
      if (pass == "") {
        return this.$Message("帳號不能為空");
      } else {
        return true;
      }
    },
    gotoRegister() {
      this.$router.push("register");
    },
    gotoTermAndPolicy() {
      this.$router.push("termAndPolicy");
    },
    forgotPass() {
      this.$router.push("forgotPassword");
    },
    setActionbar() {
      if (browserVerify.verifyAndroid()) {
        //判断是android
        SendMessageToApp("setActionBar", JSON.stringify(this.getActionBar()));
      } else if (browserVerify.verifyIos()) {
        //判断IOS
        this.$bridge.callhandler(
          "setActionBar",
          JSON.stringify(this.getActionBar()),
          data => {}
        );
      }
    },
    getActionBar() {
      var data = new Object();
      var rightButtonArry = new Array();
      var leftButtonArry = new Array();
      data.title = "";
      data.type = 4;
      data.backgroundColor = "";
      data.behavior = 0;
      data.rightButton = rightButtonArry;
      data.leftButton = leftButtonArry;
      return data;
    },
    handleScroll() {
      //卷曲的部分
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      //header到上边的距离
      let hHeight = document.querySelector("#header").offsetHeight;

      if (scrollTop <= 0) {
        document.querySelector("#header").style.opacity = 0;
        document.querySelector(".login_img_content").style.opacity = 1;
      } else {
        document.querySelector("#header").style.opacity = 1;
        document.querySelector(".login_img_content").style.opacity = 0.5;
      }
    }
  },
  created: function() {
    if (browserVerify.verifyBW()) {
      window.sendUserInformation = this.sendUserInformation; //第三方回调
      window.getActionBar = this.getActionBar; //第三方回调
      this.$bridge.registerhandler("getActionBar", function(
        data,
        responseCallback
      ) {
        responseCallback(this.getActionBar());
      });
      this.setActionbar();
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.$bridge.registerhandler(
      "sendUserInformation",
      (data, responseCallback) => {
        var id = data["id"];
        var userName = data["userName"];
        var email = data["email"];
        var loginType = data["loginType"];
        this.sendUserInformation(id, userName, email, loginType);
      }
    );
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>
<style scoped>
#header {
  width: 100%;
  height: 88px;
  background: #ffffff url(../../assets/img/combinedShape@2x.png) no-repeat
    center;
  background-size: 118px 64px;
  position: fixed;
  background-color: #fff;
  top: 0;
  z-index: 999;
  transition: all 0.1s;
  opacity: 0;
}

.login_img_content {
  padding: 88px;
  height: 152px;
  margin-top: 60px;
  text-align: center;
  margin-bottom: 180px;
  transition: all 0.1s;
}
.login_img_content .login_img {
  height: 152px;
  width: 280px;
}
.login_input_contnet .login_item {
  width: 600px;
  height: 88px;
  border-radius: 4px;
  overflow: hidden;
  margin: 0 auto;
  text-align: center;
}
.login_fb {
  font-family: PingFangHK-Semibold, sans-serif;
  font-size: 32px; /*drp*/
  color: #fff;
  text-align: center;
  background-color: #3065b4;
  background-image: url("../../assets/img/facebook@2x.png");
  background-size: 56px 56px;
  background-position: 32px center;
  background-repeat: no-repeat;
  margin-bottom: 32px !important;
  line-height: 88px;
}
.login_gg {
  font-family: PingFangHK-Semibold, sans-serif;
  font-size: 32px; /*drp*/
  color: #424242;
  text-align: center;
  background-color: #fff;
  background-image: url("../../assets/img/google@2x.png");
  background-size: 56px 56px;
  background-position: 32px center;
  background-repeat: no-repeat;
  line-height: 88px;
  -moz-box-shadow: 0px 4px 8px 0px rgb(0, 0, 0, 0.1);
  -webkit-box-shadow: 0px 4px 8px 0px rgb(0, 0, 0, 0.1);
  box-shadow: 0px 4px 8px 0px rgb(0, 0, 0, 0.1);
}
.line {
  width: 600px;
  height: 0px;
  border-bottom: 2px solid #b9b9b9;
  position: relative;
  margin: 0 auto;
  margin-top: 70px;
  margin-bottom: 70px;
}
.line .line_or {
  width: 120px;
  height: 50px;
  font-size: 38px;
  color: #424242;
  display: inline-block;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -60px;
  margin-top: -25px;
  background-color: #fff;
  text-align: center;
}
.input_item {
  width: 600px;
  height: 88px;
  background-color: #f6f6f6;
  position: relative;
}
.errorinfo_div {
  width: 600px;
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
.input_item input {
  height: 86px;
  border: 0px;
  background-color: transparent !important;
  font-size: 28px;
  line-height: 86px;
  color: #424242;
}
.input_item input:-webkit-autofill {
  background: unset !important;
  box-shadow: 0 0 0px 1000px #f6f6f6 inset;
}
.login_email {
  margin-bottom: 16px !important;
}
.login_email input {
  width: 560px;
  padding-left: 20px;
  padding-right: 20px;
}

.login_pas input {
  width: 472px;
  padding-left: 20px;
  padding-right: 108px;
}
.pas_eye {
  position: absolute;
  width: 88px;
  height: 88px;
  right: 40px;
  top: 50%;
  margin-top: -44px;
}
.pas_eye img {
  width: 88px;
  height: 88px;
}
.login_submit {
  font-family: PingFangHK-Semibold, sans-serif;
  font-size: 32px; /*drp*/
  color: #fff;
  background-color: #cd0505;
  line-height: 88px;
  margin-top: 50px !important;
}
.forget_content {
  font-size: 24px;
  color: #424242;
  width: 600px;
  padding-right: 16px;
  line-height: 40px;
  height: 40px;
  margin: 0 auto;
  margin-top: 40px;
  margin-bottom: 60px;
}
.forget_content .forget_pass {
  float: right;
  cursor: pointer;
}
.forget_content .forget_account {
  float: right;
  margin-right: 50px;
  cursor: pointer;
}
.info_content {
  height: 240px;
  padding-left: 30px;
  padding-right: 64px;
  padding-top: 38px;
}
.info_content .info {
  background-image: url("../../assets/img/nextNormal@2x.png");
  background-repeat: no-repeat;
  background-position: right center;
  background-size: 88px 88px;
}
.info_singup {
  font-size: 28px; /*drp*/
  font-family: PingFangHK-Semibold, sans-serif;
  font-weight: bold;
  margin-bottom: 28px;
  text-align: left;
}
.info_termAndPolicy {
  text-align: left;
  font-size: 24px;
  color: #424242;
}
.singup_info,
termAndPolicy_info {
  color: #cd0505;
  cursor: pointer;
}
</style>