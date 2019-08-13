<template>
  <div>
    <header class="tab">
      <div class="goBack" @click="goback"></div>
      <div class="ChangePwd">工作經歷</div>
      <div class="sure"></div>
    </header>
    <cell-group>
      <cell-item-label>
        <span slot="left">職業別</span>
        <input slot="right" type="text" placeholder="未填寫" />
      </cell-item-label>
      <cell-item-label>
        <span slot="left">職業階級</span>
        <input slot="right" type="text" placeholder="未填寫" />
      </cell-item-label>
      <cell-item-label>
        <span slot="left">職稱</span>
        <input slot="right" type="text" placeholder="未填寫" />
      </cell-item-label>
      <cell-item-label>
        <span slot="left">公司名稱</span>
        <input slot="right" type="text" placeholder="未填寫" />
      </cell-item-label>
    </cell-group>

    <cell-group title="公司電話">
      <cell-item-label>
        <span slot="left">公司電話</span>
        <input slot="right" type="text" placeholder="未填寫" />
      </cell-item-label>
      <cell-item-label>
        <span slot="left">分機號碼</span>
        <input slot="right" type="text" placeholder="未填寫" />
      </cell-item-label>
    </cell-group>

    <cell-group>
      <cell-item-label>
        <span slot="left">公司email</span>
        <input slot="right" type="text" placeholder="未填寫" />
      </cell-item-label>
    </cell-group>

    <cell-group title="公司地址">
      <cell-item-label>
        <span slot="left">縣市</span>
        <span slot="right">台北市</span>
      </cell-item-label>
      <cell-item-label>
        <span slot="left">鄉鎮區</span>
        <span slot="right">信義區</span>
      </cell-item-label>
      <cell-item-label>
        <span slot="left">詳細地址</span>
        <span slot="right">信義路四段138號碼</span>
      </cell-item-label>

    </cell-group>
  </div>
</template>

<script>
import Vue from "vue";
import CellGroup from "../myComponents/CellGroup";
import CellItemLabel from "../myComponents/CellItemLabel";
Vue.component(CellGroup.name, CellGroup);
Vue.component(CellItemLabel.name, CellItemLabel);
export default {
  data() {
    return {};
  },
  methods: {
    goback() {
      this.$router.replace("/");
    }
  }
};
</script>

<style scoped>
/* ----------------------------------------头部导航栏 */
.tab {
  height: 88px;
  font-size: 34px;
  font-weight: 700;
  letter-spacing: 0.82px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.goBack {
  padding-left: 16px;
  width: 88px;
  height: 88px;
  background: url("../../../assets/img/backBlackNormal.png") no-repeat center;
}
/* ---------------------------------下面输入框部分 */


input {
  text-align: right;
  opacity: 0.6;
  -webkit-appearance: none;
}

</style>
