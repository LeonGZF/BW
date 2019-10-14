<template>
  <div class="header_component">
    <div class="header_nav">
      <span v-if="title" class="title">
        {{title}}
      </span>
      <img
        src="../../assets/img/backBlackNormal@2x.png"
        class="back"
        @click="callBack()"
      />
    </div>
    <div class="header_right">
      <slot name="right"/>
    </div>

  </div>
</template>

<script>
  export default {
    name: "Header",
    props: ["title","backTo"],
    methods: {
      callBack() {
        if(this.backTo){
          this.$router.push(this.backTo)
        }else{
          this.$router.back();
        }
      },

    }
  }
</script>

<style lang="less">
  /*@import "/src/assets/styles/variable.less";*/

//  @fullWidth: 750px;
  //@headerHeight: 88px;
  .header_component {
    width: @fullWidth;
    height: 80px;
    box-shadow: 0 2px 0 0 rgba(0, 0, 0, .1);

    .header_nav {
      width: @fullWidth;
      height: @headerHeight;
      text-align: center;
      /*background: #ffffff url(../../assets/img/combinedShape@2x.png) no-repeat center;*/
      background-size: 118px 64px;
      position: relative;

      .title {
        font-family: "PingFangTC-Semibold";
        font-size: 34px;
        letter-spacing: -0.82px;
        color: rgb(74, 74, 74);
        line-height: @headerHeight;
      }

      img {
        position: absolute;
        left: 16px;
        width: @headerHeight;
        height: @headerHeight;
      }
    }

    .header_right {
      width: @headerHeight;
      height: @headerHeight;
      position: absolute;
      right: 16px;
      top: 0px;
      z-index: 1110;

      img {
        width: @headerHeight;
        height: @headerHeight;
      }
    }
  }


</style>
