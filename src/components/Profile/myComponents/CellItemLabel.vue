<template>
  <router-link class="yd-cell-item" :to="href"   v-if="type=='link'">
    <div class="yd-cell-left" >
        <slot name="icon"></slot>

      <slot name="left"></slot>
    </div>
    <div class="yd-cell-right" :class="classes">
      <slot name="right"></slot>
    </div>
  </router-link>
  <label class="yd-cell-item" v-else>
    <span class="yd-cell-left">
      <slot name="left"></slot>
    </span>
    <label class="yd-cell-right" :class="classes">
      <slot name="right"></slot>
    </label>
  </label>

</template>
<script type="text/babel">
export default {
  name: "cell-item-label",
  props: {
    arrow: {
      type: Boolean,
      default: false
    },
    href: {
      type: [String, Object]
    },
    type: {
            type:String,
                default: 'label'
            }
  },
  computed: {
    classes() {
      return this.arrow ? "yd-cell-arrow" : "";
    }
  }
};
</script>
<style>
.yd-cell-item {
  font-family: "PingFangTC-Medium";
  padding: 16px 0;
  display: block;
  height: 56px;
  border-bottom: 1px solid #ccc;
  line-height: 56px;
  letter-spacing: 2px;
  font-size: 32px;
  color: rgb(66, 66, 66);
}
.yd-cell-left {
  float: left;
}
.yd-cell-right {
  float: right;
  /* opacity: 0.6; */
  color: rgba(66, 66, 66, 0.6);
}
.yd-cell-arrow {
  height: 56px;
}
.yd-cell-arrow:after {
  content: "";
  width: 88px;
  height: 88px;
  margin-top: -16px;
  /* background-color: #000; */
  float: right;
  background: url("../../../assets/img/nextPressed@2x.png") no-repeat center;
  margin-right: -30px;
  background-size:  88px;
}
a.yd-cell-item{
      color: rgb(66, 66, 66);
}
</style>



