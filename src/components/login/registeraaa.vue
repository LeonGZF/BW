<template>
  <div class="main" id="register">
    <div class="header">
      <img src="../../assets/img/backBlackNormal@2x.png" class="back" @click="callBack()" />
    </div>

    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
import { browserVerify } from "@/utils/browserUtil";
export default {
  methods: {
    callBack() {
      history.go(-1);
    },
    setActionbar() {
      if (browserVerify.verifyAndroid()) {
        //判断是android
        SendMessageToApp("setActionBar", JSON.stringify(this.getActionBar()));
      } else if (browserVerify.verifyIos()) {
        //判断IOS
         window.webkit.messageHandlers.setActionBar.postMessage(this.getActionBar());
      }
    },
    getActionBar() {
      var data = new Object();
      var rightButtonArry = new Array();
      var leftButtonArry = new Array();
      data.title = "";
      data.type = 4;
      data.backgroundColor = "#FFFfFF";
      data.behavior = 0;
      data.rightButton = rightButtonArry;
      data.leftButton = leftButtonArry;
      return data;
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
    }
  }
};
</script>
<style>
/* 头部 */
.main {
  width: 750px;
  margin: 0 auto;
  height: 100%;
}
.header {
  width: 750px;
  height: 88px;
  background: #ffffff url(../../assets/img/combinedShape@2x.png) no-repeat
    center;
  background-size: 118px 64px;
}
.header img {
  margin-left: 16px;
  width: 88px;
  height: 88px;
  float: left;
}

/* 进度条 */
.progress {
  width: 750px;
  height: 8px;
}

/* 整体输入框样式 */
.info_email {
  margin: 0 4px;
  color :rgb(205,5,5);
}
.register_content {
  padding: 0px 40px;
  position: relative;
}
.register_content .title {
  font-size: 60px; /*drp*/
  color: rgb(66, 66, 66);
  font-family: PingFangSC-Medium, sans-serif;
  font-weight: 400;
  width: 670px;
  line-height: 84px;
  height: 84px;
  margin-top: 40px;
  text-align: left;
}
.register_content .info {
  width: 670px;
  font-size: 28px; /*drp*/
  font-family: PingFangTC-Regular, sans-serif;
  line-height: 40px;
  color: rgba(66, 66, 66, 0.6);
  margin-top: 8px;
  text-align: left;
  margin-bottom: 32px;
}
.input_content {
  width: 670px;
  margin: 0 auto;
}
.input_item {
  height: 88px;
  width: 670px;
  position: relative;
  border-radius: 4px;
}
.input_item input {
  height: 56px;
  width: 630px;
  padding: 16px 20px;
  line-height: 56px;
  font-size: 28px;
  letter-spacing: 2px;
  background-color: #f6f6f6 !important;
  border-radius: 4px;
  color: #424242;
}

.areaCode {
  width: 144px;
  height: 56px;
  padding: 16px 20px;
  line-height: 56px;
  text-align: left;
  background-color: #f6f6f6 !important;
  border-radius: 4px;
  color: #424242;
  margin-right: 16px;
  float: left;
}
.phone {
  width: 430px !important;
  float: left;
}

/* #app .input_item input::-webkit-input-placeholder{
  color:rgb(246,246,246);
}; */
.input_content input::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #424242;
}
.input_content input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #424242;
}
.input_content input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #424242;
}
.input_content input:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #424242;
}
.input_item input:-webkit-autofill {
  background: unset !important;
  box-shadow: 0 0 0px 1000px #f6f6f6 inset;
}
.errorinfo_div {
  width: 670px;
  height: 40px;
  margin: 0 auto;
}
span.errorinfo {
  font-size: 28px; /*drp*/
  color: #cd0505;
  line-height: 40px;
  margin-top: 16px;
  float: left;
  text-align: left;
}

.continue {
  width: 690px;
  height: 48px;
  background-color: rgba(185, 185, 185, 0.2);
  color: rgba(66, 66, 66, 0.6);
  font-size: 32px;
  line-height: 48px;
  text-align: center;
  padding: 20px 30px;
  font-family: PingFangTC-Medium, sans-serif;
}
.defult_set {
  width: 240px;
  height: 64px;
  font-size: 28px; /*drp*/
  line-height: 40px;
  color: rgb(66, 66, 66);
  font-family: PingFangTC-Regular, sans-serif;
  text-align: center;
  margin: 0 auto;
  margin-top: 48px;
}
.foot_div {
  position: absolute;
  bottom: 0px;
  /* left: 50%;
  margin-left: -375px;
  margin-top: 500px; */
  width: 750px;
  margin-top: 48px;
}
#register .active {
  background-color: #cd0505;
  color: #ffff;
}
#register .backLogin {
  width: 640px;
  margin: 0 auto;
  margin-top: 32px;
}
#register .reMailVerified {
  width: 640px;
  margin: 0 auto;
}
.input_title {
  text-align: left;
  width: 670px;
  font-size: 28px;
  line-height: 40px;
  color: rgba(66, 66, 66, 0.6);
  font-family: PingFangTC-Medium, sans-serif;
  height: 40px;
  margin-bottom: 8px;
}
.acount_info {
  text-align: left;
  width: 670px;
  font-size: 32px;
  line-height: 48px;
  color: rgb(66, 66, 66);
  font-family: PingFangTC-Medium, sans-serif;
  height: 48px;
  margin-bottom: 32px;
}
.forgetPass {
  width: 128px;
  height: 64px;
  line-height: 64px;
  text-align: center;
  font-size: 24px;
  color: rgb(66, 66, 66);
  bottom: -96px;
  right: 30px;
  position: absolute;
}
.black {
  color: rgb(66, 66, 66) !important;
}
.foot_img {
  width: 750px;
  height: 502px;
  background: url("../../assets/img/connect_complete.png") no-repeat;
  background-size: 750px 502px;
  background-position: center;
}

</style>
