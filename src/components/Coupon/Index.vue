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
    <div class="coupon_detail text-center" :class="{ 'active': couponDetailOpen, 'overlay': confirm }">

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

        <!--
          component：collapse
          因為其它頁也要用到collapse，所以包成component
        -->
        <collapse ref="collapse" :datas="collapseData"></collapse>
      
      </div>
      
    </div>

    <!-- confirm -->
    <div class="confirm-wrap text-center" :class="{ 'active': confirm }">
      <button type="button" class="close" @click="confirm = false">&times;</button>
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
  import collapse from './Collapse';

  export default {
    data() {
      return {
        
        couponList: {}, // 所有coupon的清單，等API
        couponDetail: {}, // coupon_detail的資料，等API

        couponDetailOpen: false, // true：.coupon_detail會被打開
        confirm: false, // true：再次確認兌換

        collapseData: {} // 給 collapse 的資料
      };
    },
    components: {
      collapse
    },
    methods: {
      // open detail modal
      openDetail() {
        this.couponDetailOpen = true;
      },
      // open comfirm info window
      openComfirm() {
        this.confirm = true;
      },
      // close detail modal
      closeDetail() {
        this.couponDetailOpen = false;
        this.confirm = false;

        // 關閉所有被打開的collapse
        this.$refs.collapse.closeCollapse();
      },

      // 使用者確定兌換後，要執行的動作
      couponAPI() {},

    },
    created() {
      // collapse data
      this.collapseData = {
        '兌換時間': `
          <p>兌換期限</p>
          <p>2019/11/20 10:00 - 2019/12/31 23:59</p>
          <p>使用期限</p>
          <p>2020/01/15 23:59</p>
        `,
        '使用說明': `
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
        `,
        '注意事項': `
          <ol>
            <li>本兌換券限使用乙次，口味可任選，限加購乙杯</li>
            <li>本優惠可於全台十杯分店現場使用，恕無法透過網路或電話訂購</li>
            <li>本優惠不得於其他兌換券或十杯現場優惠併用，十杯保留最終解釋權</li>
            <li>目錄與營業時間以各分現場為或社群官方帳號公告為主</li>
            <li>如遇特定原料缺貨請於使用期限內擇日或選擇其他分店使用</li>
            <li>Yahoo奇摩會員中心與十杯極致手作茶飲保留修改、終止或暫停本活動之權利與最終解釋權</li>
          </ol>
        `
      };
    },
    mounted() {}
  };
</script>


<style scoped lang="less">
  @import 'coupon';
</style>