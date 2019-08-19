<template>
  <div class="yd-dialog-white-mask">
    <div class="yd-toast" :class="iconsClass == '' ? 'yd-toast-none-icon' : ''">
      <div v-if="iconsClass" :class="iconsClass"></div>
      <p class="yd-toast-content" v-html="mes"></p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mes: String,
    icon: String,
    timeout: Number,
    callback: Function
  },
  computed: {
    iconsClass() {
      let _icon = "";
      if (this.icon === "success" || this.icon === "error") {
        _icon = "yd-toast-" + this.icon + "-icon";
      }
      return _icon;
    }
  }
};
</script>

<style scoped>
/* 背景层 */
/* .yd-dialog-white-mask {
    
} */
/* 最外层 */
.yd-toast {
  width: 320px;
  height: 336px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
  /* margin:500px auto; */
  position: fixed;
  top: 500px;
  left: 214px;
}

/* 没传icon的默认样式 */
.yd-toast-none-icon {
  width: 112px;
  height: 112px;
  /* background: url("../../assets/img/success@2x.png") no-repeat center; */
  padding: 62px 120px;
  background-size: 1.493333rem;
}

/* 正确错误 */
.yd-toast-success-icon {
  width: 112px;
  height: 112px;
  background: url("../../../assets/img/success@2x.png") no-repeat center;
  margin: 62px auto;
  background-size: 1.493333rem;
}

/* .yd-toast-error-icon {



} */

/* 文字部分 */
.yd-toast-content {
  margin-top: -24px;
  font-size: 32px;
  text-align: center;
  line-height: 48px;
  font-weight: 700;
  letter-spacing: 0px;
}
</style>

