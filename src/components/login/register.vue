<template>
  <div class="main">
    <div class="header">
      <img src="../../assets/img/backBlackNormal@2x.png" class="back" @click="callBack()" />
    </div>
    <div class="progress">
      <span class="bar"></span>
    </div>
    <div class="register_content">
      <div class="title">{{input.title}}</div>
      <div class="info" v-bind:class="{ 'black' : input.type == '22' }">
        <span>{{input.info}}</span>
        <span
          class="info_email"
          v-if="input.infopre !='' &&  input.infopre !=undefined"
        >{{ input.type == '7' || input.type == '18' ? form.acount :sso.email}}</span>
        <span>{{input.infopre}}</span>
      </div>
      <div class="input_content">
        <div class="input_item" v-if="input.type =='0' || input.type == '11' ">
          <input
            class="email"
            type="text"
            placeholder="example@mail.com"
            v-model="form.acount"
            @blur="validateMaill(form.acount)"
          />
        </div>
        <div class="input_item" v-else-if="input.type == '1' || input.type == '12' ">
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
            <img src="../../assets/img/eye.png" @click="changeType()" />
          </span>
        </div>
        <div class="input_sex" v-else-if="input.type == '2' || input.type == '13' ">
          <span class="sex_item male">
            <input id="male" v-model="form.sex" type="radio" name="sex" value="1" />
            <label   for="male" @click="sexBtn(1)"></label>
          </span>
          <span class="sex_item female">
            <input id="female" v-model="form.sex" type="radio"  name="sex" value="2" />
            <label for="female"   @click="sexBtn(2)"></label>
          </span>
        </div>
        <div class="input_item" v-else-if="input.type == '3' || input.type == '14' ">
          <input
            type="text"
            placeholder="請輸入姓名"
            v-model="form.userName"
            @blur="validateNomal(form.userName,'姓名')"
          />
        </div>
        <div class="input_item" v-else-if="input.type == '4' || input.type == '15' ">
          <input type="date" v-model="form.birthday" @blur="validateNomal(form.birthday,'生日')"/>
        </div>
        <div class="input_item" v-else-if="input.type == '5' || input.type == '16' ">
          <span class="areaCode">+886</span>
          <input
            class="phone"
            type="number"
            v-model="form.phone"
            @blur="validatePhone(form.phone)"
          />
        </div>
        <div class="input_item" v-else-if="input.type == '6' || input.type == '17' "></div>
        <div v-else-if="input.type == '21'">
          <div class="input_title">账号</div>
          <div class="acount_info">{{sso.email}}</div>
          <div class="input_title">密碼</div>
          <div class="input_item">
            <input
              type="text"
              placeholder="請輸入密碼"
              v-if="form.pwdType"
              v-model="form.password"
              @blur="validatePassNull(form.password)"
            />
            <input
              type="password"
              placeholder="請輸入密碼"
              v-else
              v-model="form.password"
              @blur="validatePassNull(form.password)"
            />
            <span class="pas_eye">
              <img src="../../assets/img/eye.png" @click="changeType()" />
            </span>
          </div>
          <div class="forgetPass" @click="forgetPwd()">忘记密碼</div>
        </div>
        <div class="errorinfo_div" v-if="message.errortype">
          <span class="errorinfo">{{message.errorStr}}</span>
        </div>
      </div>
    </div>
    <div class="foot_div" v-if="input.isNotSet =='0'">
      <div
        class="continue"
        v-bind:class="{ 'active' : message.continueType }"
        @click="continueBtn"
      >繼續</div>
    </div>
    <div class="foot_div sex_foot" v-else-if="input.isNotSet =='1'">
      <div class="defult_set" @click="noSetDef()">暫不提供</div>
    </div>
    <div class="foot_div" v-else-if="input.isNotSet =='2'">
      <div
        class="continue"
        v-bind:class="{ 'active' : message.continueType }"
        @click="continueBtn"
      >繼續</div>
      <div class="defult_set" @click="noSetDef()">暫不提供</div>
    </div>

    <div class="foot_div" v-else-if="input.isNotSet =='4'">
      <div class="bing active" @click="bing()">是，我要綁定</div>
      <div class="bing unBing" @click="unBing()">否，我想用別的email創建帳號</div>
    </div>
    <div class="foot_div" v-else-if="input.isNotSet =='5'">
      <div class="foot_img"></div>
      <div class="continue active" @click="bingo()">完成</div>
    </div>
  </div>
</template>
<script>
import {
  checkMail,
  register,
  UpdateMember,
  socialRegisterMember,
  sendActiveMail
} from "@/apis/register";
import SendMessageToApp from "../../jsAppInteractive/index3.js";
import { browserVerify } from "@/utils/browserUtil";
import { loginReq } from "@/apis/Login";
export default {
  name: "register",
  updated() {
    if (
      (this.input.type == "14" || this.input.type == "3") &&
      this.form.userName != ""
    ) {
      this.message.continueType = true;
    }
  },
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
      },
      input: {
        type: -1, //1 meail 2 password  3 sex ,4 birthday ,5 phone
        title: "",
        info: "",
        infopre: "",
        isNotSet: -1
      }
    };
  },
  methods: {
    changeType: function() {
      this.form.pwdType = !this.form.pwdType; //跟着小眼睛变化，密碼框隐藏显示文本框，内容就显示了
    },
    validateMaill(mail) {
      //邮箱格式
      var reg = /^([a-zA-Z]|[0-9])(\w|\-|\.)+@[a-zA-Z0-9|\-]+(\.([a-zA-Z0-9]{2,4}))+$/;
      if (mail == "") {
        return this.$Message("帳號不能為空");
      } else if (!reg.test(mail)) {
        return this.$Message("邮箱格式错误，請重新輸入");
      } else if (mail == this.sso.email) {
        return this.$Message(
          "請輸入 " + this.sso.email + " 之外的email作為帳號"
        );
      } else {
        checkMail(mail).then(res => {
          if (res.data.errorCode == "200") {
            this.message.errortype = false;
            this.message.continueType = true;
            return true;
          } else if (res.data.errorCode == "401") {
            return this.$Message("邮箱已经注册");
          }
        });
      }
    },
    sexBtn(sex) {
     this.message.continueType = true;
      this.form.sex =sex;
     this.continueBtn();
    },
    validatePass(pass) {
      //密碼格式
      console.log(this.input.type);
      var reg = /^[a-zA-Z0-9_]*$/;
      if (pass == "") {
        this.message.continueType = false;
        return ;
      } else if (pass.length < 6 || pass.length > 16) {
        return this.$Message("請輸入6~16個字元");
      } else if (!reg.test(pass)) {
        return this.$Message("密碼格式错误，請重新輸入");
      } else {
        this.message.errortype = false;
        this.message.continueType = true;
        return true;
      }
    },
    validatePassNull(pass) {
      if (pass == "") {
        return this.$Message("密碼不能为空");
      } else {
        this.message.errortype = false;
        this.message.continueType = true;
        return true;
      }
    },
    validatePhone(pass) {
      //手机格式
      var reg = /^[9]\d{8}$/;
      if (pass == "") {
        return this.$Message("手機号不能为空");
      } else if (!reg.test(pass)) {
        return this.$Message("手機号格式错误，請重新輸入");
      } else {
        this.message.errortype = false;
        this.message.continueType = true;
        return true;
      }
    },
    bing() {
      var currType = 20;
      this.goOne(currType + 1);
    },
    unBing() {
      var currType = 10;
      this.goOne(currType + 1);
      this.form.acount = "";
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
    $Message(errorifo) {
      this.message.errorStr = errorifo;
      this.message.errortype = true;
      this.message.continueType = false;
      return false;
    },
    continueBtn() {
      var currType = this.input.type;
      if (currType == "21") {
        //绑定第三发账号
        loginReq(this.sso.email, this.form.password).then(res => {
          if (res.data.errorCode == "200") {
            this.message.errortype = false;
            let token = res.data.jDate.Token;
            let Email = res.data.jDate.Email;
            let unionId = this.sso.unionId;
            let type = this.sso.loginType;
            let providerKey = this.sso.providerKey;
            console.log("providerKey" + providerKey + " == unionId " + unionId);
            // this.$store.dispatch("UserLogin",token);
            // this.$store.dispatch("Email",token);
            // const redirect =this.$route.query.redirect;
            // this.$router.push(redirect);
            UpdateMember(token, providerKey, type, unionId).then(res => {
              if (res.data.errorCode == "200") {
                this.goOne(currType + 1);
                this.$store.commit("LOGIN", token);
                this.$store.commit("EMAIL", Email);
              } else {
                console.log("绑定失败");
              }
            });
          } else if (res.data.errorCode == "204") {
            this.$Message("帳號未驗證");
          } else {
            this.$Message("驗證碼輸入錯誤，請重新輸入");
          }
        });
      } else if (this.message.continueType && currType == "5") {
        //普通注册
        var mail = this.form.acount;
        var moblie = this.form.phone;
        var sex = this.form.sex;
        var birthDate = this.form.birthday;
        var password = this.form.password;
        var name = this.form.userName;
        let loginProvider = this.sso.unionId;
        let loginMethod = this.sso.loginType;
        let providerKey = this.sso.providerKey;
        if (loginProvider != "" && loginMethod != "") {
          socialRegisterMember(
            password,
            mail,
            moblie,
            sex,
            birthDate,
            loginMethod,
            loginProvider,
            name,
            providerKey
          ).then(res => {
            if (res.data.errorCode == "200") {
              if (this.message.continueType || this.message.isNotSet == 0) {
                this.goOne(currType + 1);
              }
            } else if (res.data.errorCode == "401") {
              alert("注册失败");
            }
          });
        } else {
          register(mail, moblie, sex, birthDate, password, name).then(res => {
            if (res.data.errorCode == "200") {
              if (this.message.continueType || this.message.isNotSet == 0) {
                this.goOne(currType + 1);
              }
            } else if (res.data.errorCode == "401") {
              alert("注册失败");
            }
          });
        }
      } else if (this.message.continueType && currType == "16") {
        //第三方绑定注册
        var mail = this.form.acount;
        var moblie = this.form.phone;
        var sex = this.form.sex;
        var birthDate = this.form.birthday;
        var password = this.form.password;
        var name = this.form.userName;
        let loginProvider = this.sso.unionId;
        let loginMethod = this.sso.loginType;
        let providerKey = this.sso.providerKey;
        socialRegisterMember(
          password,
          mail,
          moblie,
          sex,
          birthDate,
          loginMethod,
          loginProvider,
          name,
          providerKey
        ).then(res => {
          if (res.data.errorCode == "200") {
            if (this.message.continueType || this.message.isNotSet == 0) {
              this.goOne(currType + 1);
            }
          } else if (res.data.errorCode == "401") {
            alert("注册失败");
          }
        });
      } else {
        //下一步
        if (this.message.continueType || this.message.isNotSet == 0) {
          this.goOne(currType + 1);
        }
      }
    },
    goOne(currType) {
      var jsondata =
        '[{"type":0,"title":"您的email是？","info":"輸入的email將作為帳號。","isNotSet":0},{"type":1,"title":"請設定密碼","info":"密碼包含英數、底線，長度介於6~16個字元","isNotSet":0},{"type":2,"title":"您的性別？","info":"我們會透過性別差異提供更精準的推薦","isNotSet":1},{"type":3,"title":"您的真實姓名？","info":"將作為會員顯示名稱","isNotSet":0},{"type":4,"title":"您的生日？","info":"會員將享有專屬生日禮","infopre":"","isNotSet":2},{"type":5,"title":"請輸入您的手機","info":"我們將發送驗證碼至手機","infopre":"","isNotSet":0},{"type":6,"title":"email驗證信已寄送","info":"我們已經將驗證信寄至","infopre":"，請至信箱收信並認證","isNotSet":3},{"type":10,"title":"這個email註冊過囉！","info":"您的信箱","infopre":" 已註冊過商周會員，是否要將社群帳號與此信箱綁定？","isNotSet":4},{"type":11,"title":"請輸入其他email","info":"請輸入","infopre":"之外的email作為帳號","isNotSet":0},{"type":12,"title":"請設定密碼","info":"密碼包含英數、底線，長度介於6~16個字元","infopre":"","isNotSet":0},{"type":13,"title":"您的性別？","info":"我們會透過性別差異提供更精準的推薦","infopre":"","isNotSet":1},{"type":14,"title":"您的真實姓名？","info":"將作為會員顯示名稱","infopre":"","isNotSet":0},{"type":15,"title":"您的生日？","info":"會員將享有專屬生日禮","infopre":"","isNotSet":2},{"type":16,"title":"請輸入您的手機","info":"我們將發送驗證碼至手機","infopre":"","isNotSet":0},{"type":17,"title":"email驗證信已寄送","info":"我們已經將驗證信寄至","infopre":"，請至信箱收信並認證","isNotSet":3},{"type":20,"title":"這個email註冊過囉！","info":"您的信箱 ","infopre":" 已註冊過商周會員，是否要將社群帳號與此信箱綁定？","isNotSet":4},{"type":21,"title":"請輸入密碼","info":"確認您為帳戶本人，請先登入email帳號","infopre":"","isNotSet":0},{"type":22,"title":"綁定成功","info":"綁定後，您將可以用email與社群登入同一帳號。","infopre":"","isNotSet":5}]';

      if (currType < 10 && currType > 0) {
        var inputSum = this.message.inputSum;
        console.log((currType * 1.0) / (inputSum * 1.0));
        console.log(currType);
        console.log(inputSum);
        console.log(document.querySelector(".bar"));
        document.querySelector(".bar").style.width =
          ((currType + 1) / inputSum) * 100 + "%";
      }
      var array = JSON.parse(jsondata);
      for (var i = 0; i < array.length; i++) {
        var type = array[i].type;
        var title = array[i].title;
        var info = array[i].info;
        var infopre = array[i].infopre;
        var isNotSet = array[i].isNotSet;
        if (currType == type) {
          this.input.type = type;
          this.input.title = title;
          this.input.info = info;
          this.input.infopre = infopre;
          console.log("infopre" + infopre);
          this.input.isNotSet = isNotSet;
          this.message.continueType = false;
        }
      }
    },
    callBack() {
      var currType = this.input.type;
      this.message.errortype = false;
      
      if (currType % 10 == 0 || (this.sso.unionId != "" && currType == 1)) {
        this.$router.push("login");
      } else {
        this.goOne(currType - 1);
      }
      this.message.continueType=true;
    },
    backLogin() {
      this.$router.push("login");
    },
    noSetDef() {
      var type = this.input.type;
      this.message.continueType = true;
      if (type == "2" || type == "13") {
        this.form.sex = 0;
        this.continueBtn();
      } else if (type == "4" || type == "15") {
        this.form.birthday = "";
        this.continueBtn();
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
    reMailVerifiedBtn() {
      if (this.message.reMailVerifiedType) {
        var type="emailCheck";//普通注册
        if(this.sso.unionId !='' &&  this.sso.loginType !=0){
            type="emailCheckemailThird";
        }
        sendActiveMail(this.form.acount,type).then(res => {
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
    setActionbar() {
      if (browserVerify.verifyAndroid) {
        SendMessageToApp("setActionBar", JSON.stringify(this.getActionbar()));
      } else if (browserVerify.verifyIos) {
        this.$bridge.callhandler(
          "setActionBar",
          JSON.stringify(this.getActionbar()),
          data => {}
        );
      }
    },
    getActionbar() {
      var data = new Object();
      var rightButtonArry = new Array();
      var leftButtonArry = new Array();
      data.title = "";
      data.type = 4;
      data.backgroundColor = "#CD0505";
      data.behavior = 0;
      data.rightButton = rightButtonArry;
      data.leftButton = leftButtonArry;
      return data;
    },
    bingo() {
      this.$router.push("/");
    },
    forgetPwd() {
      var email = this.form.acount ? this.form.acount : this.sso.email;
      console.log(email + "2222222222222");
      var loginType = this.$route.params.loginType;
      var userName = this.$route.params.userName;
      var unionId = this.$route.params.unionID;
      var providerKey = this.$route.params.providerKey;
      this.$router.push({
        name: "forgotPassword",
        params: {
          email: email,
          loginType: loginType,
          userName: userName,
          unionId: unionId,
          providerKey: providerKey
        }
      });
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
    this.$watch("timer.time", function(newValue, oldValue) {
      const login = this;
      if (this.timer.time == "60") {
        clearInterval(this.timer.setInterName);
      }
    });
    this.$watch("input.type", function(newValue, oldValue) {
      const login = this;
      if (this.input.type == "6" || this.input.type == "17") {
        this.timer.setInterName = setInterval(() => {
          login.timerM();
        }, 1000);
      }
    });
    this.$once("hook:beforeDestroy", () => {
      const timer = this.timer.setInterName;
      if (timer) {
        clearInterval(timer);
      }
    });
    // 第三方注册
    var email = this.$route.params.email;
    var loginType = this.$route.params.loginType;
    var userName = this.$route.params.userName;
    var unionId = this.$route.params.unionID;
    var providerKey = this.$route.params.providerKey;
    console.log(
      "{email:" +
        email +
        ", loginType:" +
        loginType +
        ",unionId:" +
        unionId +
        ",providerKey:" +
        providerKey +
        "}"
    );
    this.sso.unionId = unionId;
    this.sso.loginType = loginType;
    this.sso.providerKey = providerKey;
    this.form.userName = userName;
    if (email) {
      //this.form.acount = email;
      this.sso.unionId = unionId;
      this.sso.email = email;
      this.sso.loginType = loginType;
      this.sso.providerKey = providerKey;
      this.form.userName = userName;
      checkMail(email).then(res => {
        if (res.data.errorCode == "200") {
          //邮箱未有注册注册.
          this.goOne(1);
          this.form.acount = email;
        } else if (res.data.errorCode == "401") {
          // 邮箱已经注册
          this.goOne(10);
        }
      });
    } else {
      this.goOne(0);
    }
  }
};
</script>
<style scoped>
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
.progress {
  width: 750px;
  height: 8px;
}
.progress .bar {
  width: 140.6px;
  height: 8px;
  background: #cd0505;
  float: left;
}
.info_email {
  margin: 0 4px;
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
input.email:-webkit-autofill {
  background: unset !important;
  box-shadow: 0 0 0px 1000px #f6f6f6 inset;
}
input.email::-webkit-input-placeholder {
  /* WebKit browsers */
  color: rgba(66, 66, 66, 0.6);
}
input.email::-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: rgba(66, 66, 66, 0.6);
}
input.email::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: rgba(66, 66, 66, 0.6);
}
input.email::-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: rgba(66, 66, 66, 0.6);
}
input.email:-webkit-autofill {
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

.input_sex {
  width: 602px;
  height: 196px;
  margin: 0 auto;
  margin-top: 286px;
}
.sex_item {
  width: 280px;
  height: 196px;
  border-radius: 4px;
  float: left;
  position: relative;
  overflow: hidden;
}
.female label {
  background-image: url(../../assets/img/femaleColor.png);
}
.male label{
  background-image: url(../../assets/img/maleColor.png);
}
.male {
  margin-right: 40px;
}
.sex_item label {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgb(246, 246, 246);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 128px 128px;
}
.sex_item input#male[type=radio]:checked + label  {
    background-color: rgb(111,172,255);
    background-image: url(../../assets/img/maleWhite.png);
}
.sex_item input#female[type=radio]:checked + label  {
    background-color: rgb(255,112,112);
    background-image: url(../../assets/img/femaleWhite.png);
}
.sex_item input {
  display: none;
  width: 100%;
  height: 100%;
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
  position: fixed;
  bottom: 0px;
  left: 50%;
  margin-left: -375px;
  margin-top: 500px;
  width: 750px;
}
.active {
  background-color: #cd0505 !important;
  color: #ffff !important;
}
.backLogin {
  width: 640px !important;
  margin: 0 auto;
  margin-top: 32px;
}
.reMailVerified {
  width: 640px !important;
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
.sex_foot {
  position: relative !important;
  margin-top: 0px !important;
}
/* 去掉生日默认样式 */
input[type="date"]{
  -webkit-appearance: none;
}

</style>
