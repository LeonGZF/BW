<template>
  <div id="member_point">

    <Header title="會員點數" :backTo="backTo">
      <img src="@/assets/img/infoNormal@2x.png" alt="" slot="right" @click="aa">
    </Header>

    <div class="member_point_title">
      <div class="statistics">
        <div class="left">
          <i></i>會員點數總計
        </div>
        <div class="right">
          <p>
            <span class="point">{{infoArr.totalPoint}}</span>點
          </p>
          <p>
            本週獲得點數 {{infoArr.thisWeekPointCount}} 點
          </p>
        </div>
      </div>
      <div class="line_s"></div>
      <div class="expire">
        <div class="left">
          {{infoArr.lastDay}} 到期的點數
        </div>
        <div class="right">
          <span class="point">{{infoArr.expirePoint}}</span>點
        </div>
      </div>
    </div>

    <div class="line_m"></div>


    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <point_group>
        <point_item slot v-for="(i,index) in arr" :key="index" :actionType=i.actionType :date=i.date :point=i.point
                    :last=i.totalPoint :plus=i.type>
        </point_item>
      </point_group>
    </div>
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
  import {getMembershipPointInfo, getPointHistoryActionList} from '@/apis/memberPoint';
  import myTools from "@/assets/js/myTools";

  export default {
    name: "MemberPoint",
    data() {
      return {
        arr: [],
        infoArr: {
          totalPoint: 0,
          expirePoint: 0,
          thisWeekPointCount: 0,
          lastDay: myTools.getCurrentMonthLast()
        },
        backTo: "/",
        //无限滚动加载配置
        count: 0,
        pages: 0,
        busy: false

      }
    },
    methods: {
      aa() {
        this.$router.push("/memberpointnews")
      },
      getInfo() {
        let v = this;
        getMembershipPointInfo().then(function (res) {
          console.log(v.infoArr);
          console.log(res);
          if (res.data.errorCode == "200") {
            v.infoArr.thisWeekPointCount = res.data.jDate.thisWeekPointCount;
            v.infoArr.totalPoint = res.data.jDate.membershipPointUser.totalPoint;
            v.infoArr.expirePoint = res.data.jDate.membershipPointUser.expirePoint;
            v.count = res.data.jDate.page.pageNum;
            v.pages = res.data.jDate.page.pages;
            let resArr = res.data.jDate.page.result;
            for (let i = 0; i < resArr.length; i++) {
              v.arr.push(resArr[i])
            }
            console.log(v.arr);
          }

          console.log(v.infoArr);
        })
      },
      loadMore() {
        let v = this;
        console.log("count", this.count);
        this.count++;
        console.log("count", this.count);
        if (this.count > this.pages) {
          this.busy = false;
          return;
        } else {
          this.busy = true;
        }
        getPointHistoryActionList(this.count).then(function (res) {
          console.log(res);
          console.log(v.infoArr);
          if (res.data.errorCode == "200") {
            let resArr = res.data.jDate.page.result;
            if (resArr.length == 0) {
              return
            }
            for (let i = 0; i < resArr.length; i++) {
              v.arr.push(resArr[i])
            }
          }
          v.busy = false;
        })

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
      data.type = 4;
      data.backgroundColor = "";
      data.behavior = 0;
      data.rightButton = rightButtonArry;
      data.leftButton = leftButtonArry;
      return data;
    },
    },
    mounted() {
      this.getInfo();
      this.setActionbar();
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
