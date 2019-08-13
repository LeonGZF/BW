<template>
  <div>
    <div class="progress">
      <span class="bar"></span>
    </div>
    <div class="register_content">
      <div class="title">email驗證信已寄送</div>
      <div class="info">
        <span>我們已經將驗證信寄至</span>
        <span class="info_email">{{form.acount}}</span>
        <span>，請至信箱收信並認證</span>
      </div>
      <div class="input_content">
        <div class="input_item"></div>
      </div>
    </div>
    <div class="foot_div">
      <div
        class="continue reMailVerified"
        v-bind:class="{ 'active' : message.reMailVerifiedType }"
        @click="reMailVerifiedBtn"
      >重新發送驗證信{{message.reMailVerifiedType ? '' :'('+timer.time+'s)'}}</div>
      <div class="continue active backLogin" @click="backLogin()">返回登入</div>
    </div>
  </div>
</template>

<script>
import { sendAllMail } from "@/apis/register";
export default {
  data() {
    return {
      form: {
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
      timer: {
        time: 60,
        setInterName: null
      }
    };
  },
  methods: {
    reMailVerifiedBtn() {
      // if (this.message.reMailVerifiedType) {
      //   alert("发送普通邮箱");
      //   var type = "emailCheck"; //普通注册

      //   console.log();

      //   if (this.sso.unionId != "" && this.sso.loginType != 0) {
      //     alert("发送三方邮箱");
      //     type = "emailCheckemailThird";
      //   }
      //   sendActiveMail(this.form.acount, type).then(res => {
      //     if (res.data.errorCode == "200") {
      //       this.message.reMailVerifiedType = false;
      //       const login = this;
      //       this.timer.setInterName = setInterval(() => {
      //         login.timerM();
      //       }, 1000);
      //     }
      //   });
      if (this.message.reMailVerifiedType) {
        sendAllMail(this.form.acount).then(res => {
          if (res.data.errorCode == "200") {
            this.message.reMailVerifiedType = false;
            const login = this;
            this.timer.setInterName = setInterval(() => {
              login.timerM();
            }, 1000);
          }
        });
      }
    },
    timerM() {
      var time = this.timer.time;
      this.timer.time = time - 1;
      if (time == 0) {
        this.timer.time = 60;
        this.message.reMailVerifiedType = true;
      }
    },
    backLogin() {
      this.$router.push({
        name: "login"
      });
      //回到首页所有数据初始化
      this.$store.commit("ssoClear");
      this.$store.commit("rClear");
    }
  },
  created() {
    this.$watch("timer.time", function(newValue, oldValue) {
      const login = this;
      if (this.timer.time == "60") {
        clearInterval(this.timer.setInterName);
      }
    });

    let login = this;
    this.timer.setInterName = setInterval(() => {
      login.timerM();
    }, 1000);

    this.$once("hook:beforeDestroy", () => {
      const timer = this.timer.setInterName;
      if (timer) {
        clearInterval(timer);
      }
    });

    this.form = this.$store.state.form;
    console.log(this.form);

    this.sso = this.$store.state.sso;
    console.log(this.sso);
  },
  activated() {
    let headimg = document.querySelector("#app .header img");
    console.log(headimg);
    headimg.style.display = "none";
  }
};
</script>

<style scoped>
.progress .bar {
  /* 最后一步 */
  width: 750px;
  height: 8px;
  background: #cd0505;
  float: left;
}
</style>
