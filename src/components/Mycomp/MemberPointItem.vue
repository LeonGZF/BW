<template>
  <div class="member_point_item">
    <div class="left">
      <div class="date">{{date}}</div>
      <div class="title">{{title}}</div>
    </div>
    <div class="right">
      <div class="add_point"><span class="point" :class="{'point_':plus==false}" v-if="point">{{point}}</span>點</div>
      <div class="last">剩餘 {{last}} 點</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "point_item",
    props:["date","point","title","last","plus"]
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
        .point_{
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
