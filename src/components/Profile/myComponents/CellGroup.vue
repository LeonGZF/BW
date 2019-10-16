<template>
  <div class="yd-cell-box">
    <div class="yd-cell-title" v-if="title">{{title}}</div>
    <div class="yd-cell">
      <slot></slot>
    </div>
    <slot name="bottom"></slot>
  </div>
</template>

<script type="text/babel">
export default {
  name: "cell-group",
  props: ["title"],

};
</script>

<style>
.yd-cell-box {
  padding: 0 30px;
  height:100%
}
.yd-cell-box:after{
  content:'';
  display:block;
  width: 750px;
  height: 16px;
  background-color: rgb(220,220,220);
  margin-left: -30px;
  margin-top: -2px;
}
.yd-cell-title {
  text-align: left;
  margin-top: 30px;
  font-weight: 700;
  font-size: 28px;
  line-height: 40px;
  color: rgb(205, 5, 5);
  margin-bottom: 16px;
}

</style>
