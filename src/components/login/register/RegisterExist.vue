<template>
  <div>
    <div class="progress">
      <span class="bar"></span>
    </div>
    <div class="register_content">
      <div class="title">這個email註冊過囉！</div>
      <!-- <div class="info" v-bind:class="{ 'black' : input.type == '22' }">
        <span>{{input.info}}</span>
        <span
          class="info_email"
          v-if="input.infopre !='' &&  input.infopre !=undefined"
        >{{ input.type == '7' || input.type == '18' ? form.acount :sso.email}}</span>
        <span>{{input.infopre}}</span>
      </div> -->
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
      <div class="bing active" @click="bing()">是，我要綁定</div>
      <div class="bing unBing" @click="unBing()">否，我想用別的email創建帳號</div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      form:{
        pwdType:"",
        password:""
      }
    }
  },
  methods:{
 validatePassNull(pass) {
      if (pass == "") {
        return this.$Message("密碼不能为空");
      } else {
        this.message.errortype = false;
        this.message.continueType = true;
        return true;
      }
    },
    bing(){
      
    },
    unBing(){

    }
  }
};
</script>

<style scoped>
.progress .bar {
  width: 140.6px;
  height: 8px;
  background: #cd0505;
  float: left;
}

.bing {
  width: 580px;
  height: 48px;
  color: rgb(66, 66, 66);
  font-size: 32px;
  line-height: 48px;
  text-align: center;
  padding: 20px 30px;
  margin: 0 auto;
  font-family: PingFangTC-Medium, sans-serif;
}
.unBing {
  margin-top: 16px;
}
</style>
