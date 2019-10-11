<template>
  <div class="member_point_item">
    <div class="left">
      <div class="date">{{fomatDate}}</div>
      <div class="title">{{title}}</div>
    </div>
    <div class="right">
      <div class="add_point"><span class="point" :class="{'point_':plus==2}" v-if="point"><span
        v-if="plus==2">-</span><span v-else>+</span>{{point}}</span>點
      </div>
      <div class="last">剩餘 {{last}} 點</div>
    </div>
  </div>
</template>

<script>
  import Mytooles from '@/assets/js/myTools'
  import myTools from "../../assets/js/myTools";
  export default {
    name: "point_item",
    props: ["date", "point", "actionType", "last", "plus"],
    computed: {
      title() {
        switch (this.actionType) {
          case "1":
            return "閱讀1篇文章";
          case "2":
            return "分享1篇文章";
          case "3":
            return "閱讀分享1篇文章";
        }
      },
      fomatDate(){
        let date1=new Date(this.date);
        let date2=date1.getTime()
        return myTools.setYYYYMMddDate(date2);
      }

    }

  }
</script>

<style lang="less">
  .member_point_item {
    height: 92px;
    padding: 26px 0;
    border-bottom: @borderBottomS;

    .left {
      float: left;

      .date {
        .pDefault(left)
      }

      .title {
        .pTitle()
      }
    }

    .right {
      float: right;

      .add_point {
        .pDefault();

        .point {
          .pointDefault()
        }

        .point_ {
          .pointDefault();
          color: @red;
        }
      }

      .last {
        .pDefault()
      }
    }
  }

</style>
