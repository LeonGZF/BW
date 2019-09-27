<template>
  <div id="member_point">

    <Header title="會員點數">
      <img src="@/assets/img/infoNormal@2x.png" alt="" slot="right" @click="aa">
    </Header>

    <div class="member_point_title">
      <div class="statistics">
        <div class="left">
          <i></i>會員點數總計
        </div>
        <div class="right">
          <p>
            <span class="point">234</span>點
          </p>
          <p>
            本週獲得點數 23 點
          </p>
        </div>
      </div>
      <div class="line_s"></div>
      <div class="expire">
        <div class="left">
          2019.12.31 到期的點數
        </div>
        <div class="right">
          <span class="point">12</span>點
        </div>
      </div>
    </div>

    <div class="line_m"></div>

    <point_group>
      <point_item slot v-for="(i,index) in arr" :key="index"  :title=i.title :date=i.date :point=i.point :last=i.last :plus=i.plus>
      </point_item>
    </point_group>

  </div>
</template>

<script>
  import Vue from 'vue';
  import Header from '@/components/Mycomp/Header'
  import MemberPointItem from '@/components/Mycomp/MemberPointItem'
  import MemberPointGroup from '@/components/Mycomp/MemberPointGroup'

  Vue.component('Header', Header);
  Vue.component(MemberPointItem.name, MemberPointItem);
  Vue.component(MemberPointGroup.name, MemberPointGroup);
  export default {
    name: "MemberPoint",
    data( ){
      return{
        arr:[
          {
            title:"每日閱讀獎勵",
            date:"2019.08.16",
            point:"+30",
            last:200
          },
          {
            title:"兌換文章",
            date:"2019.08.16",
            point:"-10",
            last:200,
            plus:false
          },
          {
            title:"没有奖励",
            date:"2019.08.16",
            point:"+30",
            last:170
          },
          {
            title:"没登录",
            date:"2019.08.16",
            point:"+10",
            last:100
          },
          {
            title:"还想要奖励?",
            date:"2019.08.16",
            point:"+20",
            last:60
          },
        ]
      }
    },
    methods: {
      aa() {
        alert(11)
      }
    }

  }


</script>

<style lang="less">

  .line_s {
    height: 2px;
    .lineDefalut();
  }

  .line_m {
    .lineDefalut(0);
    height: 16px;
  }

  .member_point_title {
    height: 246px;
    padding: 0 @paddingLeftRight;

    .statistics {
      height: 156px;

      .left {
        .pTitle();
        margin-top: 30px;

        i {
          display: inline-block;
          width: 32px;
          height: 32px;
          margin-right: 8px;
          background: url("../../../../src/assets/img/bCoin@2x.png") no-repeat center/contain;
          vertical-align: -1px;
        }
      }

      .right {
        float: right;

        p:first-child {
          margin-top: 30px;
        }

        p {
          .point {
            .pointDefault()
          }

          .pDefault();
        }
      }
    }

    .expire {
      .left {

        .pTitle();
        margin-top: @expireMT;
      }

      .right {
        float: right;
        .pDefault();
        margin-top: 25px;

        .point {
          .pointDefault();
          vertical-align: 0;
          font-size: 32px;
        }
      }
    }
  }


</style>
