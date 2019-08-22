<template>
  <div>
    <header class="tab">
      <div class="goBack" @click="goback"></div>
      <div class="ChangePwd">會員資訊</div>
      <div class="sure" @click="saveUserInfo()">儲存</div>
    </header>
    <cell-group>
      <cell-item-label>
        <span slot="left">姓名(必填）</span>
        <input slot="right" type="text" v-model="name" placeholder="未填寫" />
      </cell-item-label>
      <cell-item-label>
        <span slot="left">性別</span>
        <div slot="right" @click="vall">
          <div v-if="v0" style="opacity: 0.5;letter-spacing:0;">未填寫</div>
          <select name="sex" id v-model="sex" v-else>
            <option value="">暫不提供</option>
            <option value="1">男</option>
            <option value="2">女</option>
          </select>
        </div>
      </cell-item-label>
      <cell-item-label>
        <span slot="left">生日</span>
        <div slot="right" @click="v1=false" v-if="v1" style="opacity: 0.5;letter-spacing:0;">未填寫</div>
        <input slot="right" v-else type="date" v-model="date" placeholder="未填寫" />
      </cell-item-label>
    </cell-group>

    <cell-group title="手機(必填)">
      <cell-item-label>
        <span slot="left">國碼</span>
        <span slot="right">+886</span>
      </cell-item-label>
      <cell-item-label style="border:none;">
        <span slot="left">手機</span>
        <input slot="right" type="text" pattern="[0-9]*" v-model="mobile" @blur="checkMobile" placeholder="未填寫" />
      </cell-item-label>
      <div class="errorinfo_div" v-if="message.errortype">
        <span class="errorinfo">{{message.errorStr}}</span>
      </div>
    </cell-group>

    <cell-group title="地址" v-if="false">
      <cell-item-label>
        <span slot="left">縣市</span>
        <span slot="right">
          <select name="sex">
            <option value="0">選擇縣市</option>
            <option value="1">男</option>
            <option value="2">女</option>
          </select>
        </span>
      </cell-item-label>
      <cell-item-label>
        <span slot="left">鄉鎮區</span>
        <span slot="right">
          <select name="sex" id>
            <option value>選擇縣市</option>
            <option value>男</option>
            <option value>女</option>
          </select>
        </span>
      </cell-item-label>
      <cell-item-label>
        <option value>選擇鄉鎮區</option>
        <span slot="left">詳細地址</span>
        <span slot="right">
          <select name="sex" id>
            <option value>詳細地址</option>
            <!-- 解决选中之后的问题用空格符号 -->
            <option value>男</option>
            <option value>女</option>
          </select>
        </span>
      </cell-item-label>
    </cell-group>
  </div>
</template>

<script>
import Vue from "vue";
import Toast from "../../dialog/Toast";

Vue.prototype.$dialog = {
  toast: Toast
};
import CellGroup from "../myComponents/CellGroup";
import CellItemLabel from "../myComponents/CellItemLabel";
import SendMessageToApp from "../../../jsAppInteractive/index3.js";
import { browserVerify } from "../../../utils/browserUtil";
import Mytools from "@/assets/js/myTools";
import { updateUserMessage, findUserMessage } from "@/apis/proflie";
Vue.component(CellGroup.name, CellGroup);
Vue.component(CellItemLabel.name, CellItemLabel);
export default {
  data() {
    return {
      //姓名
      name: "",
      //手机号码
      mobile: "",
      sex: 0,
      //生日
      date: "",
      //当点击时隐藏未填写
      //性别 标识
      v0: true,
      //生日 标识
      v1: true,
      //判断手机号格式
      message: {
        errortype: false,
        errorStr: ""
      }
    };
  },
  methods: {
    //正则判断手机号输入情况
    checkMobile() {
      //手机格式
      let reg = /^[9]\d{8}$/;
      if (this.mobile == "") {
        this.message.errortype = true;
        this.message.errorStr = "手機號碼不能為空";
      } else if (!reg.test(this.mobile)) {
        this.message.errortype = true;
        this.message.errorStr = "手機號碼格式錯誤，請重新輸入";
      } else {
        this.message.errortype = false;
        // this.message.continueType = true;
        // return true;
      }
    },
    //性别提示切换并且赋值男
    vall() {
      this.v0 = false;
      this.sex = 1;
    },
    //左上角返回键点击跳转路由
    goback() {
      this.$router.replace("/");
    },

    saveUserInfo() {
      var realName = this.name;
      var sex = this.sex;
      var birthDay = this.date;
      var mobile = this.mobile;
      if (realName == "") {
        return;
      }
      if (this.message.errortype) {
        return;
      }
      updateUserMessage(realName, sex, birthDay, mobile).then(reg => {
        if (reg.data.errorCode == 200) {
          this.$dialog.toast({
            mes: "儲存成功",
            icon: "success",
            timeout: 1500
          });
        }
      });
    },
    setActionbar() {
      if (browserVerify.verifyAndroid()) {
        //判断是android
        SendMessageToApp("setActionBar", JSON.stringify(this.getActionBar()));
      } else if (browserVerify.verifyIos()) {
         window.webkit.messageHandlers.setActionBar.postMessage(this.getActionBar());
      }
    },
    getActionBar() {
      var data = new Object();
      var rightButtonArry = new Array();
      var leftButtonArry = new Array();
      data.title = "";
      data.type = 4;
      data.backgroundColor = "#FFFFFF";
      data.behavior = 0;
      data.rightButton = rightButtonArry;
      data.leftButton = leftButtonArry;
      return data;
    }
  },
  updated(){
     if(this.sex == 1 || this.sex==2){
        this.v0 = false;
      }else{
        this.v0 = true;
      }
  },
  mounted() {
     window.getActionBar = this.getActionBar; //第三方回调
    if (browserVerify.verifyBW()) {
      this.setActionbar();
     
      this.$bridge.registerhandler("getActionBar", function(
        data,
        responseCallback
      ) {
        responseCallback(this.getActionBar());
      });
    }
    findUserMessage().then(reg => {
      console.log(reg.data);
      if (reg.data.errorCode == 200) {
        this.isLogin = true;
        this.mobile = reg.data.jDate.mobile;
        
        try {
          if(reg.data.jDate.birthday >10){
            this.v1 = true; 
          }
          this.date = Mytools.setYYY_MM_ddDate(reg.data.jDate.birthday);
          this.v1 = false;
        } catch (error) {
          this.v1 = true;
        }

        console.log(this.date);
        this.name = reg.data.jDate.realname;
        this.sex = reg.data.jDate.sex;
        if (this.sex == "2" || this.sex == "1") {
          this.v0 = false;
        }
        if (this.sex == "2" || this.sex == "1") {
          this.v0 = false;
        }
      } else {
      }
    });
  }
};
</script>

<style scoped>
/* ----------------------------------------头部导航栏 */
.tab {
  height: 88px;
  font-size: 34px;
  font-weight: 700;
  letter-spacing: 0.82px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.not {
  padding-right: 30px;
  opacity: 0.2;
}
.sure {
  padding-right: 30px;
  opacity: 1;
}
.goBack {
  padding-left: 16px;
  width: 88px;
  height: 88px;
  background: url("../../../assets/img/backBlackNormal.png") no-repeat center;
}
/* ---------------------------------下面输入框部分 */
select {
  background: none;
  border: none;
  opacity: 0.6;
  text-align: right;
  /* 文字右对齐 */
  direction: rtl;
  /* 下面这三行代码去除右侧小三角 */
  -webkit-appearance: none;
  -webkit-tap-highlight-color: #fff;
  outline: 0;
}
input[type="date"]::-webkit-clear-button {
  display: none;
}
input[type="date"]::-webkit-calendar-picker-indicator {
  display: none;
}

input {
  text-align: right;
  opacity: 0.6;
  -webkit-appearance: none;
}
option {
  /* 文字右对齐 */
  direction: rtl;
}
.errorinfo_div {
  /* width: 600px; */
  height: 40px;
}
span.errorinfo {
  font-size: 28px; /*drp*/
  color: #cd0505;
  line-height: 40px;
  float: right;
}
</style>
