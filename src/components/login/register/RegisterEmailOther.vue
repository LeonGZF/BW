<template>
  <div>
    <div class="progress">
      <span class="bar"></span>
    </div>
    <div class="register_content">
      <div class="title">請輸入其他email</div>
      <div class="info">
        <span>請輸入</span>
        <span class="info_email">{{sso.email}}</span>
        <span>之外的email作為帳號</span>
      </div>
      <div class="input_content">
        <div class="input_item">
          <input
            class="email"
            type="text"
            placeholder="example@mail.com"
            v-model="form.acount"
            @blur="validateMaill(form.acount)"
          />
        </div>
        <div class="errorinfo_div" v-if="message.errortype">
          <span class="errorinfo">{{message.errorStr}}</span>
        </div>
      </div>
    </div>
    <div class="foot_div">
      <div
        class="continue"
        v-bind:class="{ 'active' : message.continueType }"
        @click="continueBtn"
      >繼續</div>
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
        acount: "",
      },
      sso: {
        email: ""
      },
      message: {
        errortype: false,
        continueType: false,
        errorStr: "",
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
    continueBtn() {
      // EventBus.$emit("email", this.form.acount);
      this.$store.commit("rEmail",this.form.acount);
      this.$router.push({
        name: "RegisterPwd"
      });
    },
    validateMaill(mail) {
      //邮箱格式
      var reg = /^([a-zA-Z]|[0-9])(\w|\-|\.)+@[a-zA-Z0-9|\-]+(\.([a-zA-Z0-9]{2,4}))+$/;
      if (mail == "") {
        return this.$Message("帳號不能為空");
      } else if (!reg.test(mail)) {
        return this.$Message("邮箱格式错误，請重新輸入");
      } else if (mail == this.sso.email) {
        return this.$Message(
          "請輸入 " + this.sso.email + " 之外的email作為帳號"
        );
      } else {
        checkMail(mail).then(res => {
          if (res.data.errorCode == "200") {
            this.message.errortype = false;
            this.message.continueType = true;
            return true;
          } else if (res.data.errorCode == "401") {
            return this.$Message("邮箱已经注册");
          }
        });
      }
    }
  },
  created() {
    window.getActionBar = this.getActionbar; //第三方回调
    if (browserVerify.verifyBW()) {
      
      this.$bridge.registerhandler("getActionBar", function(
        data,
        responseCallback
      ) {
        responseCallback(this.getActionbar());
      });
      this.setActionbar();
    };
    this.sso.email=this.$store.state.sso.email;
  }
};
</script>

<style>
.progress .bar {
  width: 140.6px;
  height: 8px;
  background: #cd0505;
  float: left;
}

input.email:-webkit-autofill {
  background: unset !important;
  box-shadow: 0 0 0px 1000px #f6f6f6 inset;
}
input.email::-webkit-input-placeholder {
  /* WebKit browsers */
  color: rgba(66, 66, 66, 0.6);
}
input.email::-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: rgba(66, 66, 66, 0.6);
}
input.email::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: rgba(66, 66, 66, 0.6);
}
input.email::-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: rgba(66, 66, 66, 0.6);
}
input.email:-webkit-autofill {
  background: unset !important;
  box-shadow: 0 0 0px 1000px #f6f6f6 inset;
}
</style>
