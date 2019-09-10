<template>
  <div>
    <div class="progress">
      <span class="bar"></span>
    </div>
    <div class="register_content">
      <div class="title">您的生日？</div>
      <div class="info">
        <span>會員將享有專屬生日禮</span>
      </div>
      <div class="input_content">
        <div class="input_item">
          <input type="date" v-model="form.birthday" @blur="validateNomal(form.birthday,'生日')" />
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
      <div class="defult_set" @click="noSetDef()">暫不提供</div>
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
        birthday: ""
      }
    };
  },
  methods: {
    continueBtn() {
      if (this.message.continueType) {
        this.$store.commit("rBirthday", this.form.birthday);
        this.$router.push({
          name: "RegisterMobile"
        });
        // this.message.continueType=false;
        // TODO 目前会有一个回退到上一页就自动变红的问题
      }
    },
    validateNomal(info, name) {
      if (info == "") {
        return this.$Message(name + "不能为空");
      } else {
        this.message.errortype = false;
        this.message.continueType = true;
        return true;
      }
    },
    setContinueBtn(bottom){
     bottom = bottom + this.$refs.bottom.offsetHeight;
      this.$refs.bottom.style.bottom=bottom+"px";
    },
    noSetDef() {
      this.message.continueType = true;
      this.form.birthday = "";
      this.continueBtn();
    }
  },
  mounted() {
    let date_now = new Date();
    let year = date_now.getFullYear();
    let month =
      date_now.getMonth() + 1 < 10
        ? "0" + (date_now.getMonth() + 1)
        : date_now.getMonth() + 1;
    let date =
      date_now.getDate() < 10 ? "0" + date_now.getDate() : date_now.getDate();
    //设置input标签的max属性
    let Birthday = document.querySelector('input[type="date"]');
    Birthday.setAttribute("max", year + "-" + month + "-" + date);
  },
  activated() {
    if (this.$store.state.form.birthday == "") {
      this.message.continueType = false;
    }
  },
  created() {
     window.setContinueBtn = this.setContinueBtn;
  }
};
</script>

<style scoped>
.progress .bar {
  
  width: 535px;
  height: 8px;
  background: #cd0505;
  float: left;
}

input[type="date"] {
  -webkit-appearance: none;
}
</style>
