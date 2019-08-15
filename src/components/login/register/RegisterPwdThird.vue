<template>
  <div>
    <div class="progress">
      <span class="bar"></span>
    </div>
    <div class="register_content">
      <div class="title">請設定密碼</div>
      <div class="info">
        <span>密碼包含英數、底線，長度介於6~16個字元</span>
      </div>
      <div class="input_content">
        <div>
          <div class="input_title">账号</div>
          <div class="acount_info">{{sso.email}}</div>
          <div class="input_title">密碼</div>
          <div class="input_item">
            <input
              type="text"
              placeholder="請輸入密碼"
              v-if="form.pwdType"
              v-model="form.password"
              @input="validatePassNull(form.password)"
            />
            <input
              type="password"
              placeholder="請輸入密碼"
              v-else
              v-model="form.password"
              @input="validatePassNull(form.password)"
            />
            <span class="pas_eye">
              <img src="../../../assets/img/eye.png" @click="changeType()" />
            </span>
          </div>
          <div class="forgetPass" @click="forgetPwd()">忘记密碼</div>
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
import {
  register,
  UpdateMember,
} from "@/apis/register";
import { loginReq } from "@/apis/Login";
export default {
  data() {
    return {
      message: {
        continueType: "",
        errorStr: "",
        errortype: ""
      },
      form: {
        acount: "",
        pwdType: "",
        password: "",
        eyeImg: require("../../../assets/img/eye.png"),
      },
      sso: {
        email: ""
      }
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
      loginReq(this.sso.email, this.form.password).then(res => {
        if (res.data.errorCode == "200") {
          this.message.errortype = false;
          let token = res.data.jDate.Token;
          let Email = res.data.jDate.Email;
          let unionId = this.sso.unionId;
          let type = this.sso.loginType;
          let providerKey = this.sso.providerKey;
          console.log("providerKey" + providerKey + " == unionId " + unionId);
          // this.$store.dispatch("UserLogin",token);
          // this.$store.dispatch("Email",token);
          // const redirect =this.$route.query.redirect;
          // this.$router.push(redirect);
          UpdateMember(token, providerKey, type, unionId).then(res => {
            console.log(res.data);

            if (res.data.errorCode == "200") {
              this.$store.commit("LOGIN", token);
              this.$store.commit("EMAIL", Email);
              this.$router.push({
                name: "RegisterBindSuccess"
              });
            } else {
              console.log("绑定失败");
            }
          });
        } else if (res.data.errorCode == "204") {
          this.$Message("帳號未驗證");
        } else {
          this.$Message("驗證碼輸入錯誤，請重新輸入");
        }
      });
    },
    changeType: function() {
      this.form.pwdType = !this.form.pwdType; //跟着小眼睛变化，密碼框隐藏显示文本框，内容就显示了
        this.form.pwdType = !this.form.pwdType; //跟着小眼睛变化，密碼框隐藏显示文本框，内容就显示了
        if (this.form.pwdType) {
          this.form.eyeImg = require("../../../assets/img/openeye.png");
        } else {
          this.form.eyeImg = require("../../../assets/img/eye.png");
        }
    },
    validatePassNull(pass) {
      // if (pass == "") {
      //   return this.$Message("密碼不能为空");
      // } else {
      //   this.message.errortype = false;
      //   this.message.continueType = true;
      //   return true;
      // }
      //密碼格式
      var reg = /^[a-zA-Z0-9_]*$/;
      if (pass == "") {
        this.message.continueType = false;
        return;
      } else if (pass.length < 6 || pass.length > 16) {
        return this.$Message("請輸入6~16個字元");
      } else if (!reg.test(pass)) {
        return this.$Message("密碼格式错误，請重新輸入");
      } else {
        this.message.errortype = false;
        this.message.continueType = true;
        return true;
      }
    },
    forgetPwd() {
      var email = this.form.acount ? this.form.acount : this.sso.email;
      console.log(email + "2222222222222");
      var loginType = this.$route.params.loginType;
      var userName = this.$route.params.userName;
      var unionId = this.$route.params.unionID;
      var providerKey = this.$route.params.providerKey;
      this.$router.push({
        name: "forgotPassword",
        params: {
          email: email,
          loginType: loginType,
          userName: userName,
          unionId: unionId,
          providerKey: providerKey
        }
      });
    }
  },
  created() {
    this.sso = this.$store.state.sso;
  }
};
</script>

<style scoped>
.progress .bar {
  width: 500px;
  height: 8px;
  background: #cd0505;
  float: left;
}

/* 小眼睛 */
.pas_eye {
  position: absolute;
  width: 48px;
  height: 48px;
  right: 40px;
  top: 50%;
  margin-top: -24px;
}
.pas_eye img {
  width: 48px;
  height: 48px;
}
</style>
