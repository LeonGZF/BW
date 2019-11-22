<template>
  <section id="coupon">
    
    <!-- coupon page title -->
    <div class="coupon_page_title"></div>

    <!-- coupon list -->
    <div class="coupon_list_wrap">
      <h2 class="div_title">兌換商品</h2>

      <div class="coupon_list">

        <a class="d-block" href="" v-for="coupon in 6" @click.prevent="openDetail" :key="coupon">

          <!-- coupon image -->
          <div class="cover">
            <!-- 用背景圖製作 1：1正方形圖片 -->
            <div
                class="img"
                style="background-image: url(https://ibwec.bwnet.com.tw/images/Product/PROD000011071/PROD000011071.jpg)"
            ></div>
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
              <small>商周幣</small>
              <span>1656</span>
            </div>

          </div>

          <!-- date -->
          <div class="date">
            <p>2019/12/1~2020/1/2</p>
            <p>尚餘 <em>1</em> 件</p>
          </div>

        </a>

      </div>

    </div>

    <!-- coupon detail -->
    <div class="coupon_detail text-center" :class="{ 'active': couponDetailOpen, 'overlay': confirmOverlay }">

      <div class="coupon_detail_contents">

        <!-- coupon top -->
        <div class="top">
          <!-- close button -->
          <button type="button" class="close" @click="closeDetail">&times;</button>
        </div>

        <!-- coupon name -->
        <div class="name">30秒專注力法則</div>

        <figure>
          <img class="d-block" src="https://ibwec.bwnet.com.tw/images/Product/PROD000011071/PROD000011071.jpg" alt="">
        </figure>

        <!-- B coin -->
        <div class="b-coin">
          <strong>320</strong>
        </div>

        <div class="info">可用商周幣 / 1234</div>

        <!-- collapse -->
        <div class="collapse-group">
          
          <div class="collapse">
            <!-- title-->
            <div class="title-box waves">
              <div class="title">兌換與使用</div>
              <div class="icons"><span class="d-block"></span><span class="d-block"></span></div>
            </div>
            <!-- contents-->
            <div class="contents-box">
              <div class="contents">
                <p>兌換期限</p>
                <p>2019/11/20 10:00 - 2019/12/31 23:59</p>
                <p>使用期限</p>
                <p>2020/01/15 23:59</p>
              </div>
            </div>
          </div>

          <div class="collapse">
            <div class="title-box">
              <div class="title">注意事項</div>
              <div class="icons"><span class="d-block"></span><span class="d-block"></span></div>
            </div>
            <div class="contents-box">
              <div class="contents">
                <p>◆ 使用限制：</p>
                <ol>
                  <li>使用本券請至萊爾富櫃檯直接出示本券掃碼兌換（請將螢幕亮度調到最大）。</li>
                  <li>若無法成功掃碼，請出示本券兩段條碼序號，由門市人員輸入兌換。</li>
                  <li>使用時須符合本券載明之品牌與規格。商品兌換後，無法提供退貨及換貨。</li>
                  <li>本券不適用於免開立統一發票之代收/代售業務、菸酒商品及儲值(如：悠遊卡)。</li>
                  <li>本券無法兌換現金或找零，請一次抵用完畢，不可重複使用。</li>
                  <li>本券不得與其他行銷活動合併使用。</li>
                  <li>本券不適用非開立萊爾富發票之特殊門市 (如：台鐵門市、部分學校、廠辦及商場門市)與離島門市。</li>
                  <li>發行人：Edenred Taiwan 新加坡商宜睿智慧股份有限公司台灣分公司。</li>
                  <li>本券為企業贈品專用，請於指定日期前兌換，不得零售或轉售。</li>
                  <li>本券為不記名，任何人持本券皆可使用，請自行妥善保管，如遭他人盜用，本券不再補發。</li>
                  <li>本券所兌換之商品或折抵消費之金額不予開立統一發票。</li>
                  <li>本券有效與否，以發行人票券系統所記錄之狀態為憑。 如系統因網路連線有所遲延，依兌換商家系統端資訊為準。</li>
                  <li>本券為有價證券，請勿擅自偽造、變造，以免觸犯刑責。</li>
                </ol>
              </div>
            </div>
          </div>

        </div>
      
      </div>
      
    </div>

    <!-- confirm -->
    <div class="confirm-wrap text-center" :class="{ 'active': confirm }">
      <button type="button" class="close" @click="closeConfirm">&times;</button>
      <strong class="d-block">確認兌換</strong>
      <small class="d-block">使用320商周幣兌換嗎？</small>
      <button type="button" class="button d-block" @click="couponAPI">確認</button>
    </div>

    <!-- fixed bottom button -->
    <div class="fixed-button" :class="{ 'active': couponDetailOpen }">
      <button type="button" class="button d-block" @click="openComfirm">立即兌換</button>
    </div>

  </section>
</template>



<script>  
  export default {
    data() {
      return {
        
        couponList: [], // 所有coupon的清單，等API
        couponDetail: {}, // coupon_detail的資料，等API

        couponDetailOpen: false, // true：.coupon_detail會被打開
        confirmOverlay: false, // true：確認使用coupon
        confirm: false // true：再次確認兌換
      };
    },
    methods: {
      // open detail modal
      openDetail() {
        this.couponDetailOpen = true;
      },
      // open comfirm info window
      openComfirm() {
        this.confirmOverlay = true;
        this.confirm = true;
      },
      // close detail modal
      closeDetail() {
        this.couponDetailOpen = false;
        this.confirmOverlay = false;
        this.confirm = false;
        this.closeCollapse();
      },
      // close confirm info window
      closeConfirm() {
        this.confirmOverlay = false;
        this.confirm = false;
      },

      // 使用者確定兌換後，要執行的動作
      couponAPI() {},

      // collapse
      collapse() {
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
      },
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
      this.collapse();
    }
  };
</script>


<style scoped lang="less">

  // variables
  @main: #CD0505;
  @unit-mini: 28px; // 最小單位

  // helper class
  .d-block {
    display: block;
  }
  .text-center {
    text-align: center;
  }


  // 頂部banner，內容未確認，會再改
  .coupon_page_title {
    padding-top: 120px;
    background: #dcdcdc;
  }
  
  .div_title {
    margin-bottom: @unit-mini;
    padding-left: 16px;
    border-left: 8px solid @main;
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
    padding-right: 16px;
    padding-left: 16px;
    a {
      margin-bottom: 56px;
      width: calc(50% - @unit-mini);
    }
    .img {
      width: 100%;
      height: 0;
      padding-bottom: 100%;
      background-position: center top;
      background-repeat: no-repeat;
      background-size: cover;
    }
    .name {
      padding-top: 14px;
      line-height: 40px;
      font-size: 30px;
      color: #424242;
    }
    .info {
      display: flex;
      align-items: center;
      line-height: 2;
      font-size: @unit-mini;
      color: #adadad;
      span {
        text-decoration: line-through;
      }
    }
    .date {
      line-height: 1.5;
      color: #757575;
      em {
        color: @main;
      }
    }
  }

  // coupon single detail
  .coupon_detail {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding-bottom: 50px;
    background: rgba(#434343, .95);
    opacity: 0;
    transform: translateX(100%);
    transition: transform .4s ease-in-out, opacity .4s ease-in-out;
    &.active {
      opacity: 1;
      transform: translateX(0);
    }
    .top {
      position: relative;
      margin-bottom: 64px;
      .close {
        position: absolute;
        right: 0;
        appearance: none;
        width: 66px;
        height: 66px;
        background: transparent;
        font-size: 66px;
        color: #FFF;
      }
    }
    .name {
      margin-bottom: 64px;
      font-size: 36px;
      color: #FFF;
    }
    figure {
      display: block;
      margin-bottom: 32px;
      padding-right: 65px;
      padding-left: 65px;
    }
    img {
      margin-right: auto;
      margin-left: auto;
      max-width: 100%;
    }
    .info {
      padding-top: 64px;
      padding-bottom: 64px;
      font-size: @unit-mini;
      color: #FFF;
    }

    // overlay
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      background: rgba(#000, .7);
      opacity: 0;
      transition: opacity .4s ease-in-out;
    }
    &.overlay::before {
      z-index: 2;
      opacity: 1;
    }
  }

  .coupon_detail_contents {
    height: 100%;
    overflow-y: auto;
  }

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
    }
    .collapse:last-of-type {
      border-bottom: 1px solid #FFF;
    }

    ol {
      padding-top: @unit-mini;
      padding-left: 50px;
      list-style: decimal;
      list-style-position: outside;
    }
  }


  .fixed-button, .confirm-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0;
    transform: translateY(100%);
    transition: transform .4s ease-in-out, opacity .4s ease-in-out;
    &.active {
      opacity: 1;
      transform: translateY(0);
    }
    button {
      appearance: none;
      background: transparent;
    }
    .button {
      position: relative;
      z-index: 3;
      padding-top: 16px;
      padding-bottom: 16px;
      width: 100%;
      background: @main;
      font-size: 32px;
      color: #FFF;
    }
  }

  .confirm-wrap {
    z-index: 3;
    padding-top: @unit-mini;
    background: #FFF;
    .close {
      position: absolute;
      top: 8px;
      right: @unit-mini;
      margin-left: auto;
      font-size: 44px;
      color: #aaa;
    }
    strong {
      padding-top: 14px;
      padding-bottom: @unit-mini;
      font-size: 36px;
    }
    small {
      padding-bottom: @unit-mini;
      font-size: @unit-mini;
    }
  }

  // fixed bottom button
  .fixed-button {
    z-index: 2;
  }

  // B coin
  .b-coin {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 8px;
    font-size: @unit-mini;
    color: @main;
    &::before {
      content: '';
      display: inline-block;
      margin-top: -2px;
      margin-right: 8px;
      width: 36px;
      height: 36px;
      background: url("../../assets/img/bCoin@2x.png") no-repeat center/contain;
    }
  }
</style>