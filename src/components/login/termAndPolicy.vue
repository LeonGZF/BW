<template>
  <div class="app">
    <div class="header">
      <div class="header_nav">
        <img src="../../assets/img/backBlackNormal@2x.png" class="back" @click="callBack()" />
      </div>
      <ul class="tab-tilte">
        <li @click="cur=0" :class="{'active':cur==0}">關於商周Plus</li>
        <li @click="cur=1" :class="{'active':cur==1}">隱私權聲明</li>
        <li @click="cur=2" :class="{'active':cur==2}">服務條款</li>
      </ul>
    </div>
    <div class="tab-content">
      <div v-show="cur==0">
        <p>作為台灣社會的重要資產，「商周集團」的企業使命是以媒體的影響力，推動華人社會躋身世界一流，不只是雜誌，《商周》的使命，更是致力建立一個多元載體資源平台，讓人們可以透過不同的媒體載具，方便自主地接收文字、影音、圖像、課程等多元豐富的優質內容。</p>
        <p>創立於1987年，華人世界的第一本財經週刊，台灣發行量No.1雜誌，亞太地區閱讀人口密度最高的財經雜誌，台灣閱讀《商業周刊》人口密度為0.56%，高於《財經》約佔中國人口0.01%、《Nikkei Business》佔日本人口0.1%；經中華民國發行公信會ABC(Audit Bureau of Circulations)稽核2015年每期平均有費發行量122,268本。榮獲10次國家金鼎獎最佳財經時事雜誌獎，居同業之冠，商周.com每月觸及人數(UU)達600萬。</p>
        <br />
      </div>
      <div v-show="cur==1">
        <p>「商周集團」網站是由「城邦文化事業股份有限公司」所經營之網站，旗下包含商周.com、良醫健康網、商周財富網、Smart自學網、alive；為了尊重個人資料之隱私及保護，我們謹以下列聲明，向所有使用者說明「商周集團」相關網站在線上搜集使用者個人資料的方式、範圍、利用方法、以及查詢或更正的方式等事項。</p>
        <p>對使用者個人資料的收集，謹遵守「個人資料保護法」及相關法令之規範。</p>
        <p>「商周集團」網站伺服器會自動記錄使用者所閱讀的網頁、使用者所來自的網域名稱、cookies，作為內容與系統改進，及廣告效果評估的依據。此一部分資訊，用來作數據性的統計分析，除供內部參考，並將提供給廣告商，作為廣告效果評估之依據。</p>
        <p>使用者加入「商周集團」網站、網路購物、訂閱或參與部份活動時，本網站可能要求填寫個人資料，如姓名、年齡、性別、聯絡電話、手機號碼、電子信箱地址或取得使用者cookies等，其目的是要增加對會員的了解，以提供更好的服務，本公司或關係企業或合作對象，將於本公司業務推展之必要範圍及本公司業務進行之時間及地區內，使用您的個人資料。 惟本公司絕不非法販賣或洩露給其他無關之第三人及單位，並且嚴禁內部人員私自使用這些資料。 如您就個人資料之提供有請求本公司停止蒐集、處理、利用或刪除之需要時，您可以電子郵件與「商周集團」網站服務中心 http://www.businessweekly.com.tw/TF/index.aspx?page=Service.aspx 連絡。如您提出前述請求，即視為您同時申請終止使用「商周集團」網站之一切服務。</p>
        <p>使用者加入「商周集團」網站會員後，「商周集團」網站得利用會員所填寫的電子信箱地址/手機號碼，寄發「商周集團」網站相關之產品或活動。</p>
        <p>使用者在「商周集團」網站的互動服務上(例如：討論區或留言板等)，可自由填寫電子郵件信箱的地址，以供互動及溝通之用途。這個資訊可能經由網路傳播被其他使用者利用，此類行為非本網站所能控制，若造成使用者困擾，「商周集團」網站並不對此負責。</p>
        <p>「商周集團」網站為服務使用者，在部分網頁中會提供相關網站的連結，使用者可藉由這些連結，直接點選到感興趣的網站，但是本網站不負責保護使用者在這些經由本網站而連結到訪的網站中的隱私權。</p>
        <p>使用者個人資料有變更、或發現個人資料不正確的時候，可以隨時以電子郵件與「商周集團」網站服務中心http://www.businessweekly.com.tw/TF/index.aspx?page=Service.aspx 連繫要求更正，包括要求停止寄發相關訊息等。</p>
        <p>與外站連結：「商周集團」相關網站或網頁都可能包含其他網站或網頁的連結，對於此等不屬於「商周集團」之網站或網頁，本隱私權政策不適用於該網站或網頁，該網站或網頁將會適用其隱私權政策或相關法令規範。</p>
        <br />
        <p>Cookie程式的使用：</p>
        <br />
        <p>(一) 為了便利使用者，「商周集團」網站相關網站可能使用cookie技術，以利本網站進行網站活動之各種分析、資訊收集及使用於廣告投放服務，並進而提供更適合使用者個人需要的服務；cookie是網站伺服器用來和使用者瀏覽器進行溝通的一種技術，它可能在使用者的電腦中儲存某些資訊，但是使用者可以自由經由瀏覽器的設定，取消、或限制此項功能。</p>
        <p>(二) 「商周集團」尊重您對於個人資料應用領域的意願，依照相關規範，「商周集團」提供您自由選擇是否願意將個人資料作為本隱私權政策所提及之應用。若您不願意將個人資料(包括但不限於cookie等)提供予「商周集團」作相關利用，您可採取以下措施： • 如您不希望接受「商周集團」使用cookies，請自行利用瀏覽器的設定，關閉cookies追蹤功能，但此舉可能造成使用者在使用「商周集團」部分服務或參與活動時受到限制。 • 若您希望刪除已由「商周集團」蒐集之cookies或其他個人識別資料，歡迎您以電子郵件與「商周集團」網站服務中心http://www.businessweekly.com.tw/TF/index.aspx?page=Service.aspx 連絡。</p>
        <p>這份隱私權的保障自本網站成立起即生效，但因應社會環境及法令規定的變遷，若「商周集團」網站為保護網友隱私，認為需要修改這份聲明，會在最短的時間內更新。如果您對「商周集團」網站的隱私權政策或與個人資料有任何疑問，歡迎您以電子郵件與「商周集團」網站服務中心http://www.businessweekly.com.tw/TF/index.aspx?page=Service.aspx 連絡。</p>
        <p>【個人資料蒐集與使用】 為提供訂購、行銷、客戶管理或其他合於營業登記項目或章程所訂業務需要之目的，商周集團（英屬蓋曼群島商家庭傳媒股份有限公司城邦分公司、城邦文化事業股份有限公司、《商業周刊》、《Smart智富》、《alive》、商周編輯顧問股份有限公司），與本集團之營運期間及地區內，將以電郵、傳真、電話、簡訊或其他通知公告方式利用您所提供之資料（資料類別C001、C002、C003、C011等各項類別相關資料）。利用對象除本集團外，亦可能包括相關服務的協力機構。如您有依個資法第三條或其他需要協助之處，得致電本公司客服信箱或撥打客服電話02-2510-8888。相關資料如為非必填項目，不提供亦不影響您的權益。</p>
        <p>
          <br />
        </p>
      </div>
      <div v-show="cur==2">
        <p>商周App應用程式由「英屬蓋曼群島商家庭傳媒股份有限公司城邦分公司」負責營運並提供相關服務，所有商周App應用程式（以下簡稱本服務）之使用者，都應詳細閱讀下列約定條款，這些約定條款訂立的目的，是為了保護本服務使用者，包含已消費或未消費之使用者（以下簡稱使用者）利益，當使用者勾選「我同意遵守以上規定」、或在本服務進行線上消費時，即視為已知釋、並同意本約定條款的所有約定：</p>
        <p>一、個人資料安全</p>
        <br />
        <p>交易資料：所有本服務內進行的線上消費，均需透過本服務數位商店付款機制付款，本服務使用者的付款資料，並不會由商周App取得。</p>
        <p>個人資料：若消費者同意，商周App可透過數位商店取得消費者的使用帳號（姓名及email帳號）作為服務提供與否之判斷，所取得個人資料將遵循隱私權聲明進行利用（詳見隱私權聲明）。</p>
        <p>本服務伺服器會自動記錄使用者閱讀行為，作為內容與系統改進，及廣告效果評估的依據。此一部份資訊，用作以數據性的統計分析，除供內部參考，並將提供給廣告商，作為廣告效果評估之依據。</p>
        <p>在下列情況下，本服務有權提供使用者的個人資料給有權機關、或主張其權利受侵害並提出適當證明之第三人：</p>
        <p>‧依法令規定、或依司法機關或其他有權機關的命令；</p>
        <p>‧為執行本約定條款、或使用者違反約定條款；</p>
        <p>‧為維護商周文化事業股份有限公司網站系統之正常運作及安全；</p>
        <p>‧為保護商周文化事業股份有限公司網站、其他使用者、或其他第三人的合法權益；</p>
        <p>使用者對於其個人帳號及密碼，應妥善保管以避免外洩。所有使用其帳號和密碼進入本服務後之行為，均視為該帳號及密碼持有人之行為。</p>
        <br />
        <p>二、服務範圍</p>
        <br />
        <p>本服務提供商周報導相關內容之線上閱讀服務，使用者僅有閱讀權，不具有擁有權，一旦中止付費，其已儲存或閱讀過的文章，亦不得再重複閱讀。</p>
        <p>上述所提的商周報導相關內容，系指版權屬於商周集團所有，而內容版權之認定由商周集團認定，使用者認知且同意本服務內並不包含部份專欄。</p>
        <p>本服務僅限於一般消費者在非供公眾或其他特定/不特定之人進出之家戶場所內觀賞使用，嚴禁任何人於前述家戶場所從事公開播送/放映/傳輸等行為。</p>
        <p>部份本服務仍由廣告收入支援，並得展示廣告及宣傳內容。本服務上所有廣告之方式、模式及範圍得變更之，無需特別通知使用者。</p>
        <p>使用者認知並同意於本服務內之訂閱及退訂，應透過收款之數位商店進行，並同意依數位商店所定之相關辦法加以處理。</p>
        <br />
        <p>三、系統服務</p>
        <p>本服務係由商周集團開發之內容閱讀應用程式，我們將不斷創新以提供用戶最佳操作體驗，使用者認知並同意，商周集團提供本服務之形式及性質得不經事先通知使用者而隨時變換。</p>
        <p>本服務軟體得隨時自動下載及安裝更新版本。更新版本旨於改進、增強及進一步開發本服務，並得以錯誤修正功能、強化功能、新軟體模組及全新版本之形式為之。使用本服務時，同意接受該等更新版本。</p>
        <p>使用者認知並同意，使用本服務時，不得複製、解編譯、進行逆向工程、傳播、或創造本服務之衍生作品。如進行上述限制行為，即侵犯本服務軟體供應商及其授權人之權利，如反違上述限制，使用者將被起訴並提出賠償。</p>
        <br />
        <p>四、智慧財產權</p>
        <br />
        <p>使用者認知並同意，本服務內文章受相關智慧財產權和其他法律保護，包捨但不限於著作權法，除遵守本協議使用本服務之外，不應以任何其他方式使用本服務。除於本條款中明示准許者外，本服務任何部分均不得以任何形式或任何方式複製，及不以任何方式修訂、出租、租賃、借貸、出售、散佈或根據本服務擷取之內容。</p>
        <p>五、約定條款之修改</p>
        <p>除本服務條款外，使用者並應遵守本服務所擬定之其他相關辦法及說明。</p>
        <p>本服務保留隨時修改本服務暨交易條款之權利，修改後的服務暨交易條款將公佈在本服務，不另外個別通知使用者。使用者應同意遵守修改後之約定條款。</p>
        <br />
        <p>六、準據法及管轄權</p>
        <br />
        <p>使用者應同意，本約定條款及所有在本服務內所進行的線上消費或交易，均以中華民國法令為準據法。</p>
        <p>因本約定條款所發生之糾紛，以台灣台北地方法院為第一審管轄法院。</p>
      </div>
    </div>
  </div>
</template>
<script>
import SendMessageToApp from "../../jsAppInteractive/index3.js";
import { browserVerify } from "@/utils/browserUtil";
export default {
  name: "termAndPolicy",
  data() {
    return {
      cur: 1 //默认选中第一个tab
    };
  },
  methods: {
    callBack() {
      this.$router.back(-1)
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
      data.backgroundColor = "#FFFFFF";
      data.behavior = 0;
      data.rightButton = rightButtonArry;
      data.leftButton = leftButtonArry;                             
      return data;
    }
  },
  mounted() {
    if (browserVerify.verifyBW()) {
      this.setActionbar();
      window.getActionBar = this.getActionBar; //第三方回调
      this.$bridge.registerhandler("getActionBar", function(
        data,
        responseCallback
      ) {
        responseCallback(this.getActionBar());
      });
    }
    var cuur = this.$route.query.cuur;
    if(cuur!=undefined &&cuur!=''){
      this.cur= cuur;
    }
  }
};
</script>
<style scoped>
.header {
  width: 750px;
  height: 196px;
  position: fixed;
  top: 0;
  left: 50%;
  margin-left: -5rem;
  background-color: #ffffff;
}
.header_nav {
  width: 750px;
  height: 88px;
  background: #ffffff url(../../assets/img/combinedShape@2x.png) no-repeat
    center;
  background-size: 118px 64px;
}
.header_nav img {
  margin-left: 16px;
  width: 88px;
  height: 88px;
  float: left;
}
ul li {
  margin: 0;
  padding: 0;
  list-style: none;
}
#app {
  width: 750px;
  height: 100%;
  margin: 0 auto;
}
.tab-tilte {
  width: 100%;
  height: 88px;
  background: white;
  box-shadow: 0 6px 8px 0 rgb(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 6px 8px 0 rgb(0, 0, 0, 0.1);
  -moz-box-shadow: 0 6px 8px 0 rgb(0, 0, 0, 0.1);
}
.tab-tilte li {
  float: left;
  width: 250px;
  text-align: center;
  font-size: 32px; /*drp*/
  cursor: pointer;
  line-height: 48px;
  letter-spacing: 2px;
  font-family: PingFangTC-Regular, sans-serif;
  color: rgb(66, 66, 66);
  padding-top: 20px;
  padding-bottom: 16px;
  background-color: #ffffff;
}
/* 点击对应的标题添加对应的背景颜色 */
.tab-tilte .active {
  color: rgb(205, 5, 5);
  border-bottom: 4px solid rgb(205, 5, 5);
  font-weight: 400;
}
.tab-content{
  width: 10rem;
  margin: 0 auto;
}
.tab-content div {
  float: left;
  width: 9.2rem;
  padding: 0 0.4rem;
  text-align: left;
  margin-top: 2.613333rem;
  word-wrap: break-word;
  white-space: pre-wrap;
  background-color: #ffffff;
}
.tab-content div p {
  width: 100%;
  font-size: 32px; /*drp*/
  line-height: 48px;
  letter-spacing: 2px;
  font-family: PingFangTC-Regular, sans-serif;
  word-wrap: break-word;
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
