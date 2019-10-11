<template>
  <div id="member_point_news">
    <Header title="會員點數資訊" :backTo="backTo"></Header>
    <div class="nav">
      <span class="get" @click="goGet" :class="{active:!useActive}">如何獲得點數</span>
      <span class="use" @click="goUse" :class="{active:useActive}">點數使用規範</span>
    </div>
    <router-view></router-view>

  </div>
</template>

<script>
  import Vue from 'vue';
  import Header from '@/components/Mycomp/Header';
  Vue.use('Header', Header);
  export default {
    name: "member_point_news",
    data(){
      return{
        //控制显示颜色状态
        useActive:true,
        backTo:"/memberpoint"
      }
    },
    methods:{
      goGet(){
        console.log(this.useActive);
        this.useActive=false;
        this.$router.push({name:"MemberPointNewsGet"});
      },
      goUse(){
        this.useActive=true;
        this.$router.push({name:"MemberPointNewsUse"});
      }
    }



  }

</script>

<style lang="less">
  #member_point_news {
    .nav {
      width: @fullWidth;
      height: @headerHeight;
      line-height: @headerHeight;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .1);

      span {
        float: left;
        width: @fullWidth/2;
        text-align: center;
        font-size: 32px;
        color: @greyishBrown;
        font-family: @fontPFMedium;
      }

      span.active {
        color: @red;
        border-bottom: @borderBottomMRed;
        font-weight: bold;
      }
    }
  }


</style>
