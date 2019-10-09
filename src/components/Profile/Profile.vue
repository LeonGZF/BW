<template>
  <div id="Profile">
    <div class="heder">
      <div class="heder_conten">
        <span class="title">個人</span>
      </div>
    </div>
    <div class="conten">
      <div class="profile_info">
        <div class="profile_hder conter">
          <div class="profile_img">
            <img src="../../assets/img/userDefault01@2x.png" alt />
          </div>
        </div>
        <div class="profile_user conter" v-if="false">
          <div class="userName">
            <span>何飛鵬</span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <cell-group title="會員資訊">
        <cell-item-label @click.native="gologin">
          <span slot="left">帳號</span>
          <span slot="right" class="user_mail">{{ loginEmail == '' ? '登入/註冊': loginEmail}}</span>
        </cell-item-label>
        <template v-if="isLogin">
          <cell-item-label>
            <span slot="left">社群綁定</span>
            <span slot="right" style="display:block;">
              <img v-if="thirdPart.includes('3')>0" src="../../assets/img/google.png" />
              <img v-if="thirdPart.includes('2')>0" src="../../assets/img/facebook2.png" />
            </span>
          </cell-item-label>
          <cell-item-label arrow type="link" href="/changepwd">
            <span slot="left">更改密碼</span>
          </cell-item-label>
          <cell-item-label>
            <span slot="left">加入會員時間</span>
            <span slot="right">{{joinDate}}</span>
          </cell-item-label>
          <cell-item-label v-if="false">
            <span slot="left">會員級別</span>
            <span slot="right">付費會員</span>
          </cell-item-label>
          <cell-item-label arrow type="link" href="/profile/setting/accountPicker">
            <span slot="left">會員資訊</span>
          </cell-item-label>
          <cell-item-label>
            <span slot="left">會員點數</span>
            <span slot="right"><span class="memberPoint">{{memberPoint}}</span>點</span>
          </cell-item-label>
        </template>
      </cell-group>

      <cell-group title="關於我" v-if="false">
        <cell-item-label arrow>
          <span slot="left">生活要事</span>
        </cell-item-label>
        <cell-item-label arrow type="link" href="/profile/setting/workexperience">
          <span slot="left">工作經歷</span>
        </cell-item-label>
      </cell-group>

      <cell-group title="裝置" v-if="false">
        <cell-item-label>
          <span slot="left">清除暫存</span>
          <span slot="right">4.93MB</span>
        </cell-item-label>
        <cell-item-label arrow>
          <span slot="left">通知管理</span>
        </cell-item-label>
      </cell-group>

      <cell-group title="關於">
        <cell-item-label arrow  type="link" href="/termAndPolicy?cuur=0">
          <span slot="left">關於商周Plus</span>
        </cell-item-label>
        <cell-item-label arrow  type="link" href="/termAndPolicy?cuur=1">
          <span slot="left">隱私權政策與服務條款</span>
        </cell-item-label>
        <cell-item-label arrow v-if="false">
          <span slot="left">給商周Plus評分</span>
        </cell-item-label>
        <cell-item-label arrow v-if="false">
          <span slot="left">聯絡我們</span>
        </cell-item-label>
        <cell-item-label arrow v-if="false">
          <span slot="left">常見問題</span>
        </cell-item-label>
        <cell-item-label v-if="isApp" >
          <span slot="left">目前版本</span>
          <span slot="right">{{versionNum}}</span>
        </cell-item-label>
      </cell-group>
    </div>
    <div class="logOut" v-if="isLogin">
      <p class="logOut_btn"  @click="logOut">登出</p>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import CellGroup from "./myComponents/CellGroup";
import CellItemLabel from "./myComponents/CellItemLabel";
import { updatePassword, getThirdMessage } from "@/apis/proflie";
import { loginOut } from "@/apis/Login";
import Mytools from "@/assets/js/myTools";
import SendMessageToApp from "../../jsAppInteractive/index3.js";
import { browserVerify } from "@/utils/browserUtil";
import { timeout } from 'q';
Vue.component(CellGroup.name, CellGroup);
Vue.component(CellItemLabel.name, CellItemLabel);

export default {
  data() {
    return {
      //账号后面显示
      loginEmail: "",
      //判断登录状态
      isLogin: false,
      thirdPart: [],
      register: "",
      joinDate: "",
      MemberPoint:0,
      versionNum:"",
      isApp:false

    };
  },
  methods: {
    gologin() {
      console.log("点到我了么");
      if (this.$store.state.isLogin) {
        // this.$router.push("/logout")
        // return;
        console.log("已经登录了");

      } else {
        this.$router.push("/login");
      }
    },
    logOut() {
      
      loginOut().then(reg=>{
        let token 
        if(reg.data.errorCode=='200'){
          console.log('登出');
          token = reg.data.jDate.Token;
        }
        this.$store.commit("LOGOUT",token);
        window.location.reload();
      });

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
      data.type = 3;
      data.backgroundColor = "#CD0505";
      data.behavior = 0;
      data.rightButton = rightButtonArry;
      data.leftButton = leftButtonArry;
      return data;
    },
    getAppVersion(){
       if (browserVerify.verifyBW()) {
          let BW =this;
           if (browserVerify.verifyAndroid()) {
            //判断是android
             this.versionNum = SendMessageToApp("getAPPVersion");
          } else if (browserVerify.verifyIos()) {
            //判断IOS
             window.webkit.messageHandlers.getAPPVersion.postMessage("");
          }
      }else{
        // alert("2222222");
        
      }
    },
    setAppVersion(versionNum){
      this.versionNum =versionNum;
    },
    updateData(){ //数据更新
      getThirdMessage().then(reg => {
        console.log("第三方登录======>",reg.data);
        
        if (reg.data.errorCode == 200 || reg.data.errorCode == 1203) {
          this.isLogin = true;
          this.loginEmail = reg.data.jDate.third_message_email;
          this.joinDate = Mytools.setDate(reg.data.jDate.third_message_join_time);
          this.thirdPart= reg.data.jDate.third_message_login_provider.split(",");
          this.MemberPoint= reg.data.jDate.point;
        } else {
          this.isLogin = false;
          this.loginEmail = "登入/註冊";
          this.$store.commit("LOGOUT");
        }
      });
      return "call end";
    }
  },
  computed:{
    memberPoint(){
      //判断如果大于9999点就显示9999点
      return this.MemberPoint>9999?9999:this.MemberPoint;
    }
  },
  created(){
    if (browserVerify.verifyBW()) {
      this.getAppVersion();
      this.isApp=true;
      this.setActionbar();
    }
      window.getActionBar = this.getActionBar; //第三方回调
      window.updateData = this.updateData;
      window.setAppVersion=this.setAppVersion;
  },
  mounted() {
    this.updateData();
  }
};
</script>
<style scoped>
  #Profile {
    width: 750px;
    margin: 0 auto;
  }
  .heder {
    background: url("../../assets/img/profileImg@2x.png");
    background-position: center;
    background-size: 750px 240px;
    background-repeat: no-repeat;
    height: 240px;
    width: 750px;
    /* padding-top: 88px; */
  }
  .conter {
    width: 690px;
    margin: 0 auto;
  }
  .heder_conten {
    width: 750px;
    height: 88px;
    text-align: center;
    position: relative;
    padding-top: 108px;
  }
  .heder_conten .title {
    font-size: 34px;
    letter-spacing: -0.82px;
    line-height: 88px;
    height: 24px;
    width: 88px;
    color: rgb(255, 255, 255);
    font-family: PingFangTC-Semibold, sans-serif;
    display: inline-block;
  }
  .profile_hder {
    position: relative;
    height: 80px;
  }
  .profile_img {
    width: 128px;
    height: 128px;
    overflow: hidden;
    border-radius: 50%;
    position: absolute;
    left: 0px;
    top: -48px;
    background-color: #ffffff;
  }
  .profile_img img {
    width: 128px;
    height: 128px;
  }

  .profile_user {
    margin-top: 20px;
  }
  .userName {
    height: 64px;
  }
  .userName span {
    font-size: 40px;
    color: rgb(66, 66, 66);
    line-height: 64px;
    height: 64px;
    width: 120px;
    font-family: PingFangTC-Medium, sans-serif;
    float: left;
  }
  .userInfo {
    font-family: PingFangTC-Regular, sans-serif;
    font-size: 24px;
    color: rgb(66, 66, 66);
    height: 20px;
    text-align: left;
  }
  .logOut{
      height: 232px;
        width: 750px;
      background-color: rgb(220, 220, 220);
      display: block;
    margin-top: -2px;
    /*overflow: hidden;*/
  }
  .logOut:before{
    content: '';
    display: table;
  }
  .logOut_btn {
    margin: 64px auto;
    height: 88px;
    width: 750px;
    line-height: 88px;
    color: rgb(205, 5, 5);
    text-align: center;
    font-size: 32px;
    font-weight: 700;
    background-color: #fff;
  }

  /*.logOut::before {*/
  /*  content: "";*/
  /*  display: block;*/
  /*  height: 64px;*/
  /*  background-color: rgb(220, 220, 220);*/
  /*}*/
  /*.logOut::after {*/
  /*  content: "";*/
  /*  display: block;*/
  /*  height: 80px;*/
  /*  background-color: rgb(220, 220, 220);*/
  /*}*/
  .memberPoint{
    font-size: 0.533rem;
    color: rgba(66,66,66,1);
    letter-spacing: 0;
    /*font-weight: bold;*/
    margin-right: 0.107rem;
  }
  .user_mail{
    display: block;
    max-width: 580px;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>

