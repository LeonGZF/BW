<template>
  <div>
    <div class="progress">
      <span class="bar"></span>
    </div>
    <div class="register_content">
      <div class="title">您的真實姓名？</div>
      <div class="info">
        <span>將作為會員顯示名稱</span>
      </div>
      <div class="input_content">
        <div class="input_item">
          <input
            type="text"
            class="username"
            placeholder="請輸入姓名"
            v-model="form.userName"
            @blur="validateNomal(form.userName)"
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
export default {
  data() {
    return {
      message: {
        errortype: false,
        continueType: false,
        errorStr: ""
      },
      form: {
        userName: ""
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
        this.$store.commit("rUserName", this.form.userName);
        this.$router.push({
          name: "RegisterBirthday"
        });
      }
    },
    validateNomal(info) {
      if (info === "") {
        return this.$Message("必填");
      } else {
        this.message.errortype = false;
        this.message.continueType = true;
        return true;
      }
    }
  },
  mounted() {
    if (this.$store.state.sso.userName) {
      let name = document.getElementsByClassName("username")[0];
      // console.log(email);
      console.log(this.$store.state.sso);
      this.form.userName=this.$store.state.sso.userName;
      name.value = this.$store.state.sso.userName;
      this.message.continueType = true;
    }
  }
};
</script>

<style scoped>
.progress .bar {
  /* 第四步 */
  width: 428px;
  height: 8px;
  background: #cd0505;
  float: left;
}
</style>
