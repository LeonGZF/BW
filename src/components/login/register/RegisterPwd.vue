<template>
  <div>
    <div class="progress">
      <span class="bar"></span>
    </div>
    <div class="register_content">
      <div class="title">請輸入密碼</div>
      <div class="info">
        <span>密碼包含英數字、底線，長度介於6~16個字元</span>
      </div>
      <div class="input_content">
        <div class="input_item">
          <input
            type="text"
            placeholder="請輸入密碼"
            v-if="form.pwdType"
            v-model="form.password"
            @blur="validatePass(form.password)"
          />
          <input
            type="password"
            placeholder="請輸入密碼"
            v-else
            v-model="form.password"
            @blur="validatePass(form.password)"
          />
          <span class="pas_eye">
            <img :src="this.form.eyeImg" @click="changeType()" />
          </span>
        </div>
        <div class="errorinfo_div" v-if="message.errortype">
          <span class="errorinfo">{{message.errorStr}}</span>
        </div>
      </div>
    </div>
    <div class="foot_div" ref="bottom">
      <div
        class="continue"
        v-bind:class="{ 'active' : message.continueType }"
        @click="continueBtn"
      >繼續</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: {
        errortype: false,
        continueType: false,
        errorStr: ""
      },
      form: {
        pwdType: "",
        password: "",
        eyeImg: require("../../../assets/img/eye.png"),
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
      if (this.message.continueType) {
        this.$store.commit("rPassword", this.form.password);
        this.$router.push({
          name: "RegisterSex"
        });
      }
    },
    changeType: function() {
      this.form.pwdType = !this.form.pwdType; //跟着小眼睛变化，密碼框隐藏显示文本框，内容就显示了
      if (this.form.pwdType) {
        this.form.eyeImg = require("../../../assets/img/openeye.png");
      } else {
        this.form.eyeImg = require("../../../assets/img/eye.png");
      }
    },
    setContinueBtn(bottom){
     if(bottom != "0"){
         bottom = bottom + this.$refs.bottom.offsetHeight;
      }
      this.$refs.bottom.style.bottom=bottom+"px";
    },
    validatePass(pass) {
      //密碼格式
      var reg = /^[a-zA-Z0-9_]{6,16}$/;
      if (pass == "") {
        this.message.continueType = false;
        return;
      } else if (!reg.test(pass)) {
        return this.$Message("密碼格式錯誤，請重新設定。");
      } else {
        this.message.errortype = false;
        this.message.continueType = true;
        return true;
      }
    }
  },
  activated() {
    let headimg = document.querySelector("#app .header img");
    // console.log(headimg);
    headimg.style.display = "inline-block";
  },
  created(){
      window.setContinueBtn = this.setContinueBtn;
  }
};
</script>

<style scoped>
  
.progress .bar {
  width: 214px;
  height: 8px;
  background: #cd0505;
  float: left;
}


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
