<template>
  <div>
    <div class="progress">
      <span class="bar"></span>
    </div>
    <div class="register_content">
      <div class="title">綁定成功</div>
      <div class="info">
        <span>綁定後，您將可以用email與社群登入同一帳號。</span>
      </div>
      <div class="input_content">
        <div class="input_item"></div>
      </div>
    </div>
    <div class="foot_div">
      <div class="continue active backLogin" @click="backLogin()">完成</div>
    </div>
  </div>
</template>

<script>
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
      timer: {
        time: 60,
        setInterName: null
      }
    };
  },
  methods: {
    backLogin() {
      this.$router.replace("/");
    }
  },
    activated() {
    let headimg = document.querySelector("#app .header img");
    headimg.style.display = "none";
  }

};
</script>

<style scoped>
.progress .bar {
  width: 750px;
  height: 8px;
  background: #cd0505;
  float: left;
}
</style>
