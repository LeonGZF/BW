<template>
  <div>
    <div class="progress">
      <span class="bar"></span>
    </div>
    <div class="register_content">
      <div class="title">請輸入您的手機</div>
      <div class="info">
        <span>我們將發送驗證碼至手機</span>
      </div>
      <div class="input_content">
        <div class="input_item">
          <span class="areaCode">+886</span>
          <input
            class="phone"
            type="text"
            v-model="form.phone"
            @blur="validatePhone(form.phone)"
            placeholder="987654321"
            pattern="[0-9]*"
          />
        </div>
      </div>
      <div class="errorinfo_div" v-if="message.errortype">
        <span class="errorinfo">{{message.errorStr}}</span>
      </div>
    </div>
    <div class="foot_div" ref="bottom">
      <div
        class="continue"
        v-bind:class="{ 'active' : message.continueType }"
        @click="continueBtn"
      >繼續</div>
    </div>
    <!-- 模态框 -->
    <div class="yd-toast">郵箱發信失敗</div>
  </div>
  <!-- <h1>电话号码</h1> -->
</template>

<script>
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
import Cookie from "@/assets/js/cookie"

export default {
  data() {
    return {
      message: {
        errortype: false,
        continueType: false,
        errorStr: ""
      },
      form: {
        phone: ""
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
    validatePhone(pass) {
      //手机格式
      var reg = /^0?[9]\d{8}$/;
      if (pass == "") {
        return this.$Message("必填");
      } else if (!reg.test(pass)) {
        return this.$Message("此電話號碼無效，請重新輸入。");
      } else {
        this.message.errortype = false;
        this.message.continueType = true;
        return true;
      }
    },
    setContinueBtn(bottom){
     if(bottom != "0"){
         bottom = bottom + this.$refs.bottom.offsetHeight;
      }
      this.$refs.bottom.style.bottom=bottom+"px";
    },
    continueBtn() {
      if (this.message.continueType) {
        this.$store.commit("rPhone", this.form.phone);
        //目前先假设业务逻辑为在这里点击之后直接发送注册
        let mail = this.$store.state.form.acount;
        let moblie = this.$store.state.form.phone;
        let sex = this.$store.state.form.sex;
        let birthDate = this.$store.state.form.birthday;
        let password = this.$store.state.form.password;
        let name = this.$store.state.form.userName;
        let loginProvider = this.$store.state.sso.unionId;
        let loginMethod = this.$store.state.sso.loginType;
        let providerKey = this.$store.state.sso.providerKey;
        //TODO diviceID
        let deviceId=this.$store.state.form.deviceId;
        // let deviceId=document.cookie.split("=")[1]
        console.log("deviceId",deviceId);
        
        if (loginProvider != "" && loginMethod != "") {
          // alert("三方注册")
          socialRegisterMember(
            password,
            mail,
            moblie,
            sex,
            birthDate,
            loginMethod,
            loginProvider,
            name,
            providerKey,
            deviceId
          ).then(res => {
            console.log(res.data);
            if (res.data.errorCode == "200") {
              if (this.message.continueType || this.message.isNotSet == 0) {
                this.$router.push({
                  name: "RegisterSendEmail"
                });
              } 
            } else if (res.data.errorCode == "401") {
              alert("注册失败");
            }else if(res.data.errorCode == "705"){
                let model = document.querySelector(".yd-toast");
                model.style.display = "block";
                let timer = setTimeout(() => {
                  model.style.display = "none";
                  this.$router.push({
                    name: "RegisterEmail"
                  });
                }, 1000);
              }
          });
        } else {
          // alert("普通注册")
          register(mail, moblie, sex, birthDate, password, name,deviceId).then(res => {
            console.log("普通註冊:",res.data);
            
            if (res.data.errorCode == "200") {
              if (this.message.continueType || this.message.isNotSet == 0) {
                this.$router.push({
                  name: "RegisterSendEmail"
                });
              }
            } else if (res.data.errorCode == "401") {
              alert("注册失败");
            }else if(res.data.errorCode == "104"){
                let model = document.querySelector(".yd-toast");
                model.style.display = "block";
                let timer = setTimeout(() => {
                  model.style.display = "none";
                  this.$router.push({
                    name: "RegisterEmail"
                  });
                }, 1000);
              }
          });
        }
      }
    }
  },
  created(){
      window.setContinueBtn = this.setContinueBtn;
  }
};
</script>

<style scoped>
.progress .bar {
  
  width: 642px;
  height: 8px;
  background: #cd0505;
  float: left;
}
.yd-toast {
  display: none;
  border-radius: 8px;
  top: 486px;
  width: 370px;
  line-height: 94px;
  height: 94px;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  position: fixed;
  letter-spacing: 0rem;
  left: 190px;
  font-size: 40px;
  text-align: center;
}
.input_item>input::placeholder{
  color:#999;
}
</style>
