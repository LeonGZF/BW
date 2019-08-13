<template>
  <div>
    <div class="progress">
      <span class="bar"></span>
    </div>
    <div class="register_content">
      <div class="title">這個email註冊過囉！</div>
      <div class="info">
        <span>您的信箱</span> 
        <span class="info_email" >{{sso.email}}</span>
        <span>已註冊過商周會員，是否要將社群帳號與此信箱綁定？</span>
      </div>
    </div>
    <div class="foot_div">
      <div
        class="continue active"
       @click="bind"
      >是，我要綁定</div>
      <div class="defult_set"  @click="continueBtn">否，我想用別的email創建帳號</div>
    </div>
  </div>
</template>

<script>
// import { EventBus } from "./event-bus.js";
import {
  checkMail,
  register,
  UpdateMember,
  socialRegisterMember,
  sendActiveMail
} from "@/apis/register";
import SendMessageToApp from "../../../jsAppInteractive/index3.js";
import { browserVerify } from "@/utils/browserUtil";
import { loginReq } from "@/apis/Login";
export default {
  data() {
    return {
      form: {
        pwdType: false,
        password: "",
        acount: "",
        sex: 0,
        userName: "",
        birthday: "",
        phone: ""
      },
      sso: {
        unionId: "",
        loginType: 0,
        providerKey: "",
        email: ""
      },
      message: {
        errortype: false,
        reMailVerifiedType: false,
        continueType: false,
        errorStr: "",
        inputSum: 7
      },
    };
  },
  methods: {
    $Message(errorifo) {
      this.message.errorStr = errorifo;
      this.message.errortype = true;
      this.message.continueType = false;
      return false;
    },
    bind(){
      this.$router.push({
        name: "RegisterPwdThird"
      });
    },
    continueBtn() {
      // EventBus.$emit("email", this.form.acount);
      this.$store.commit("rEmail",this.form.acount);
      this.$router.push({
        name: "RegisterEmailOther"
      });
    },
  },
  created() {
    if (browserVerify.verifyBW()) {
      window.getActionBar = this.getActionbar; //第三方回调
      this.$bridge.registerhandler("getActionBar", function(
        data,
        responseCallback
      ) {
        responseCallback(this.getActionbar());
      });
      this.setActionbar();
    }
    this.sso.email=this.$store.state.sso.email
    // 监听时间

  }
};
</script>

<style>
.progress .bar {
  width: 250px;
  height: 8px;
  background: #cd0505;
  float: left;
}
.defult_set {
  width: 480px;
}
</style>
