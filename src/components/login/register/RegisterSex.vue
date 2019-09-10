<template>
  <div>
    <div class="progress">
      <span class="bar"></span>
    </div>
    <div class="register_content">
      <div class="title">您的性別？</div>
      <div class="info">
        <span>我們會透過性別差異提供更精準的推薦</span>
      </div>
      <div class="input_content">
        <div class="input_sex">
          <span class="sex_item male">
            <input id="male" v-model="form.sex" type="radio" name="sex" value="1" />
            <label for="male" @click="sexBtn(1)"></label>
          </span>
          <span class="sex_item female">
            <input id="female" v-model="form.sex" type="radio" name="sex" value="2" />
            <label for="female" @click="sexBtn(2)"></label>
          </span>
        </div>
      </div>
    </div>

    <div class="foot_div sex_foot">
      <div class="defult_set" @click="noSetDef()">暫不提供</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: {
        continueType: ""
      },
      form: {
        sex: ""
      }
    };
  },
  methods: {
    sexBtn(sex) {
      this.message.continueType = true;
      this.form.sex = sex;
      this.$store.commit("rSex",sex);
      this.$router.push({
        name: "RegisterTrueName"
      });
    },
    noSetDef() {
        this.sexBtn(0);
    }
  }
};
</script>

<style scoped>

.progress .bar {
  width: 321px;
  height: 8px;
  background: #cd0505;
  float: left;
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
  background-image: url(../../../assets/img/femaleColor.png);
}
.male label {
  background-image: url(../../../assets/img/maleColor.png);
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
.sex_item input#male[type="radio"]:checked + label {
  background-color: rgb(111, 172, 255);
  background-image: url(../../../assets/img/maleWhite.png);
}
.sex_item input#female[type="radio"]:checked + label {
  background-color: rgb(255, 112, 112);
  background-image: url(../../../assets/img/femaleWhite.png);
}
.sex_item input {
  display: none;
  width: 100%;
  height: 100%;
}
.sex_foot {
  position: relative !important;
  margin-top: 0px !important;
}
</style>
