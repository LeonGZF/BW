<template>

  <div class="collapse-group">
          
    <div class="collapse" v-for="(data, title, i) in datas" :key="'collapse' + i">

      <!-- title-->
      <div class="title-box">
        <div class="title">{{ title }}</div>
        <div class="icons"><span></span><span></span></div>
      </div>

      <!-- contents-->
      <div class="contents-box">
        <div class="contents" v-html="data"></div>
      </div>
    </div>

  </div>

</template>

<script>
  export default {
    data() {
      return {}
    },
    props: ['datas'],
    methods: {
      // 關閉collapse，關閉.coupon_detail後要執行
      closeCollapse() {
        const titles = document.querySelectorAll('.title-box');
        Array.prototype.forEach.call(titles, t => {
          t.classList.remove('active');
          const content = t.parentNode.querySelector('.contents-box');
          content.setAttribute('style', 'height: 0');
        });
      }
    },
    mounted() {
      // 寫入各 .content-box 的高，然後高度設成 0
      const contents = document.querySelectorAll('.collapse-group .contents-box');
      Array.prototype.forEach.call(contents, c => {
        c.dataset.height = c.offsetHeight + 28;
        c.setAttribute('style', 'height: 0');
      });

      // .title-box 被點擊時，加入 .active， .content-box的高度抓 data-height 的
      const titles = document.querySelectorAll('.title-box');
      Array.prototype.forEach.call(titles, t => {
        t.addEventListener('click', e => {
          e.target.classList.toggle('active'); // 加入/移除 .active

          // .title-box 同一層的 .contents-box
          const content = e.target.parentNode.querySelector('.contents-box');
          const height = content.dataset.height; // 從 dat-height 抓原本高度

          // 判斷 .title-box 有沒有 .active
          if(e.target.classList.contains('active')) {
            // 有 .active，就設高
            content.setAttribute('style', 'height: ' + height + 'px');
          } else {
            // 沒有，高度歸 0
            content.setAttribute('style', 'height: 0');
          }
        });
      });
    }
  }
</script>

<style scoped lang="less">
  
  @import '_variables';

  // collapse
  .collapse-group {
    padding-right: 36px;
    padding-left: 36px;
    padding-bottom: 36px;
    color: #FFF;

    .collapse {
      border-top: 1px solid #FFF;
      line-height: 1.5;
      font-size: @unit-mini;
      &:last-of-type {
        border-bottom: 1px solid #FFF;
      }
    }

  }

  // collapse title
  .title-box {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: @unit-mini 0;

    .title, .icons {
      pointer-events: none;
    }

    // icons transform active
    &.active .icons {
      span {
        &:first-of-type {
          transform: rotate(180deg);
        }
        &:last-of-type {
          transform: rotate(0) translateY(-4px);
        }
      }
    }

  }

  .icons {
    position: absolute;
    right: 12px;
    span {
      display: block;
      width: @unit-mini;
      height: 4px;
      background-color: #FFF;
      transition: transform .2s ease;
      &:last-of-type {
        transform: rotate(90deg) translateX(-4px);
      }
    }
  }

  // collapse contents
  .contents-box {
    overflow: hidden;
    text-align: justify;
    transition: height .3s ease;

    /deep/ ol {
      padding-top: @unit-mini;
      padding-left: 50px;
      list-style: decimal !important;
      list-style-position: outside;
    }
  }
</style>