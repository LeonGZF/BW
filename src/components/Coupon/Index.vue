<template>
  <section id="coupon">
    <link rel="stylesheet" href="https://172.24.222.222:5757/style.css">
    
    <!-- coupon page title -->
    <div class="coupon_page_title">查看我的兌換券</div>

    <!-- coupon list -->
    <div class="coupon_list_wrap">
      <h2 class="div_title">兌換商品</h2>

      <div class="coupon_list">

        <a class="d-block" href="" v-for="coupon in 6" @click.prevent="openCouponDeatil" :key="coupon">

          <!-- coupon image -->
          <div class="cover">
            <div class="img" style="background-image: url(https://fakeimg.pl/245x365/)"></div>
          </div>

          <!-- coupon name -->
          <div class="name">30秒專注力法則</div>

          <!-- coupon information -->
          <div class="info">

            <!-- B coin -->
            <div class="b-coin">
              <strong>320</strong>
            </div>
            <div>
              <small>商周點</small>
              <span>1656</span>
            </div>

          </div>

        </a>

      </div>

    </div>

    <!-- coupon detail -->
    <div class="coupon_deatil text-center" :class="{ 'active': couponDeatilOpen, 'overlay': confirm }">

      <!-- coupon name -->
      <div class="name">30秒專注力法則</div>

      <img class="d-block" src="https://fakeimg.pl/245x365/" alt="">

      <!-- B coin -->
      <div class="b-coin">
        <strong>320</strong>
      </div>

      <div class="info">
        可用商周點 / 1234
      </div>

      <!-- collapse -->
      <div class="collapse-group">
        
        <div class="collapse">
          <!-- title-->
          <div class="title-box">
            <div class="title">兌換時間</div>
            <div class="icons"><span class="d-block"></span><span class="d-block"></span></div>
          </div>
          <!-- contents-->
          <div class="contents-box">
            <div class="contents">
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam ducimus, illum vitae nam officia quidem iste maxime provident! Temporibus repellat nulla blanditiis at accusamus minima delectus aut doloribus officia deserunt.</p>
            </div>
          </div>
        </div>

        <div class="collapse">
          <div class="title-box">
            <div class="title">獎項使用說明</div>
            <div class="icons"><span></span><span></span></div>
          </div>
          <div class="contents-box">
            <div class="contents">
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam ducimus, illum vitae nam officia quidem iste maxime provident! Temporibus repellat nulla blanditiis at accusamus minima delectus aut doloribus officia deserunt.</p>
            </div>
          </div>
        </div>

      </div>
      
    </div>

    <!-- fixed bottom button -->
    <div class="fixed-button" :class="{ 'active': couponDeatilOpen }">
      <div class="confirm text-center" :class="{ 'active': doubleConfirm }">
        <button type="button" class="close" @click="closeConfirm">&times;</button>
        <strong class="d-block">確認兌換</strong>
        <small class="d-block">使用320商周幣兌換嗎？</small>
      </div>
      <button type="button" class="button d-block" @click="openCouponComfirm" v-if="!doubleConfirm">立即兌換</button>
      <button type="button" class="button d-block" v-else>確認</button>
    </div>

  </section>
</template>



<script>
  export default {
    data() {
      return {
        couponList: [], // 所有coupon的清單
        couponDeatilOpen: false, // true：.coupon_deatil會被打開
        confirm: false, // true：確認使用coupon
        doubleConfirm: false // true：再次確認兌換
      };
    },
    methods: {
      // open coupon detail
      openCouponDeatil() {
        this.couponDeatilOpen = true;
      },
      // open coupon comfirm
      openCouponComfirm() {
        this.confirm = true;
        this.doubleConfirm = true;
      },
      // close comfirm
      closeConfirm() {
        this.couponDeatilOpen = false;
        this.confirm = false;
        this.doubleConfirm = false;
      },
      // collapse
      collapse() {
        // 寫入各 .content-box 的高，然後高度設成 0
        const contents = document.querySelectorAll('.collapse-group .contents-box');
        Array.prototype.forEach.call(contents, c => {
          c.dataset.height = c.offsetHeight;
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
    },
    mounted() {
      this.collapse();
    }
  };
</script>



<style scoped lang="less">
  // helper class
  .d-block {
    display: block;
  }
  .text-center {
    text-align: center;
  }

  .coupon_page_title {
    padding-top: 30px;
    background: #dcdcdc;
  }
  
  .div_title {
    margin-bottom: 28px;
    padding-left: 16px;
    border-left: 5px solid #cd0505;
    line-height: 40px;
    color: #424242;
    font-weight: bold;
    font-size: 40px;
  }

  .coupon_list_wrap {
    padding: 36px 16px;
  }

  // coupon list
  .coupon_list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-right: 8px;
    padding-left: 8px;
    a {
      margin-bottom: 32px;
      width: calc(50% - 16px);
    }
    .img {
      width: 100%;
      height: 0;
      padding-bottom: 100%;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
    }
    .name {
      font-size: 26px;
      color: #000;
    }
    .info {
      display: flex;
      align-items: center;
      line-height: 24px;
      color: #adadad;
      span {
        text-decoration: line-through;
      }
    }
  }

  // coupon single detail
  .coupon_deatil {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding-top: 42px;
    background: #000;
    opacity: 0;
    transform: translateX(100%);
    transition: transform .4s ease-in-out, opacity .4s ease-in-out;
    &.active {
      opacity: 1;
      transform: translateX(0);
    }
    .name {
      margin-bottom: 22px;
      color: #FFF;
    }
    img {
      margin-right: auto;
      margin-left: auto;
      margin-bottom: 14px;
    }
    .info {
      padding-top: 30px;
      padding-bottom: 30px;
      color: #FFF;
    }

    // overlay
    &.overlay::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      background: rgba(#000, .7);
    }
  }

  // collapse
  .collapse-group {
    color: #FFF;

    .collapse {
      border-top: 1px solid #FFF;
    }

    // collapse title
    .title-box {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;

      // icons transform active
      &.active .icons {
        span {
          &:first-of-type {
            transform: rotate(180deg);
          }
          &:last-of-type {
            transform: rotate(0) translateY(-2px);
          }
        }
      }

    }
  
    .icons {
      position: absolute;
      right: 12px;
      span {
        width: 12px;
        height: 2px;
        background-color: #FFF;
        transition: transform .2s ease;
        &:last-of-type {
          transform: rotate(90deg) translateX(-2px);
        }
      }
    }

    // collapse contents
    .contents-box {
      overflow: hidden;
      transition: height .3s ease;
    }
    .collapse {
      &:last-of-type .contents-box {
        border-bottom: 1px solid #FFF;
      }
    }
  }

  // fixed bottom button
  .fixed-button {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 3;
    &, .confirm {
      opacity: 0;
      transform: translateY(100%);
      transition: transform .4s ease-in-out, opacity .4s ease-in-out;
    }
    &.active, .confirm.active {
      opacity: 1;
      transform: translateY(0);
    }
    button {
      appearance: none;
      background: transparent;
    }
    .confirm, .button {
      position: relative;
    }
    .confirm {
      z-index: 2;
      background: #FFF;
    }
    .button {
      z-index: 3;
      width: 100%;
      background: #CD0505;
      color: #FFF;
    }
  }

  // B coin
  .b-coin {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 8px;
    font-size: 14px;
    color: #cd0505;
    &::before {
      content: '';
      display: inline-block;
      margin-top: -2px;
      margin-right: 8px;
      width: 24px;
      height: 24px;
      background: url("../../assets/img/bCoin@2x.png") no-repeat center/contain;
    }
  }
</style>