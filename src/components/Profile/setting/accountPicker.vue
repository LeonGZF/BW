<template>
    <div id="accountPicker">
        <div class="header">
            <div class="header_content">
                <div class="back"></div>
                <div class="header_title">會員資訊</div>
                <div class="save">儲存</div>
            </div>
        </div>
        
        <div class="account_content">
            <div class="account_info">
                <div class="acount_item">
                    <span class="item_title">姓名(必填）</span>
                    <input type="text"   />
                </div>
                <div class="acount_item">
                    <span class="item_title">性別</span>
                    <select id="sex" >
                        <option value="">未填寫</option>
                        <option value="1">男</option>
                        <option value="0">女</option>
                    </select>
                </div>
                <div class="acount_item">
                    <span class="item_title">生日</span>
                    <input type="date" placeholder="未填寫"/>
                </div>
            </div>
            <div class="account_info">
                <div class="info_title">手機(必填)</div>
                <div class="acount_item">
                    <span class="item_title">國碼</span>
                    <span class="phone_pre">+886</span>
                </div>
                <div class="acount_item">
                    <span class="item_title">手機</span>
                    <input type="number" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
#accountPicker{
    width: 750px;
    margin: 0 auto;
    height: 100%;
    background-color: rgb(220,220,220);
}
.header{
    height: 88px;
    width: 750px;
    margin: 0 auto;
    position: relative;
    -moz-box-shadow: 0px 2px 0px 0px rgb(0,0,0,0.1);
    -webkit-box-shadow: 0px 2px 0px 0px rgb(0,0,0,0.1);
    box-shadow: 0px 2px 0px 0px rgb(0,0,0,0.1);
    background-color: #ffffff;
}
.back{
    position:absolute;
    left: 16px;
    top:0px;
    background: url('../../../assets/img/backBlackNormal@2x1.png') no-repeat;
    background-position: center;
    background-size: 88px;
    height: 88px;
    width: 88px;
}
.header_title{
    width: 548px;
    text-align: center;
    height: 88px;
    line-height: 88px;
    font-size: 34px;/*drp*/
    font-family:PingFangTC-Semibold, sans-serif;
    line-height: 88px;
    letter-spacing: -0.82px;
    margin: 0 auto;
}
.save{
    width: 68px;
    text-align: center;
    height: 88px;
    line-height: 88px;
    font-size: 34px;/*drp*/
    font-family:PingFangTC-Semibold, sans-serif;
    line-height: 88px;
    letter-spacing: -0.82px;
    margin: 0 auto;
    display:inline-block;
    position:absolute;
    right: 30px;
    top:0px;
}

.account_info{
    margin-bottom: 16px;
    background-color: #ffffff;
}
.acount_item{
    height: 88px;
    width: 690px;
    margin: 0 auto;
    border-bottom: 2px solid rgb(220,220,220);
}
.item_title{
    height: 88px;
    width: 184px;
    font-size: 32px;
    line-height: 88px;
    letter-spacing: 2px;
    font-family: PingFangTC-Regular, Times, serif;
    color: rgb(66,66,66);
    text-align: left;
    display: inline-block;
    float: left;
}
.info_title{
    height: 56px;
    padding-top: 30px;
    font-size: 28px;
    font-family: PingFangTC-Medium, Times, serif;
    color: rgb(205,5,5);
    text-align: left;
    padding-left: 30px;

}
.phone_pre{
    height: 88px;
    width: 360px;
    font-size: 32px;
    line-height: 88px;
    letter-spacing: 2px;
    font-family: PingFangTC-Regular, Times, serif;
    color: rgb(66,66,66);
    text-align: right;
    display: inline-block;
    float: right;
}
.acount_item input{
    width: 360px;
    height: 88px;
    line-height: 88px;
    text-align: right;
    display: inline-block;
    float: right;
}
.acount_item select{
    width: 360px;
    height: 88px;
    line-height: 88px;
    text-align: right;
    display: inline-block;
    float: right;
}
</style>
