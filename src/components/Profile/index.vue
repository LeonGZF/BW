<template>
    <div id="Profile">
        <div class="heder">
            <div class="heder_conten">
                <span class="title">個人</span>
                <span class="bookmark"></span>
                <span class="setting"></span>
            </div>            
        </div>
        <div class="conten">
            <div class="profile_info">
                <div class="profile_hder conter">
                    <div class="profile_img">
                        <img src="../../assets/img/userDefault01@2x.png" alt="">
                    </div>
                    <span class="share"></span>
                    <span class="edit">編輯</span>
                </div>
                <div class="profile_user conter">
                    <div class="userName">
                        <span>何飛鵬</span>
                    </div>                   
                    <div class="userInfo">城邦媒體集團 首席執行長</div>
                    <div class="fansi">
                        <span class="fansi_dec">關注人數</span>
                        <span class="fansi_count">159</span>
                        <span class="fansi_dec">粉絲人數</span>
                        <span class="fansi_count">2041</span>
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
    #Profile{
        width: 750px;
        margin: 0 auto;
    }
    .heder{
        background: url('../../assets/img/profileImg@2x.png');
        background-position: center;
        background-size: 750px 240px;
        background-repeat: no-repeat;
        height: 152px;
        width: 750px;
        padding-top: 88px;
    }
    .conter{
        width: 690px;
        margin: 0 auto;
    }
    .heder_conten{
        width: 750px;
        height: 88px;
        text-align: center;
        position: relative;
    }
    .heder_conten .title{
        font-size: 34px;
        letter-spacing: -0.82px;
        line-height: 88px;
        height: 24px;
        width: 88px;
        color: rgb(255,255,255);
        font-family: PingFangTC-Semibold, sans-serif;
        display: inline-block;
        
    }
    .bookmark{
        width: 88px;
        height: 88px;
        background: url('../../assets/img/bookmarkNormal@2x.png');
        background-position: center;
        background-size: 88px 88px;
        background-repeat: no-repeat;
        display: inline-block;
        position:absolute;
        right: 120px;
        top: 0px;
    }
    .setting{
        width: 88px;
        height: 88px;
        background: url('../../assets/img/settingNormal@2x.png');
        background-position: center;
        background-size: 88px 88px;
        background-repeat: no-repeat;
        display: inline-block;
        position:absolute;
        right: 16px;
        top: 0px;
    }
    .profile_hder{
        position: relative;
        height: 80px;
    }
    .profile_img{
        width: 128px;
        height: 128px;
        overflow: hidden;
        border-radius: 50%;
        position:absolute;
        left: 0px;
        top: -48px;
        background-color: #ffffff;
    }
    .profile_img img{
        width: 128px;
        height: 128px;
    }
    .edit{
        width: 120px;
        height: 64px;
        border-radius: 32px;
        background-color: rgb(205,5,5);
        display: inline-block;
        line-height: 64px;
        color: #ffffff;
        font-size: 28px;  
        position:absolute;   
        right: 0px;   
        top: 20px;
    }
    .share{
        width: 88px;
        height: 88px;
        position:absolute; 
        top: 8px;
        right:136px;
    }
    .profile_user{
        margin-top: 20px;
    }
    .userName{
         height: 64px;
    }
    .userName span{
        font-size: 40px;
        color:rgb(66,66,66);
        line-height: 64px;
        height: 64px;
        width: 120px;
        font-family: PingFangTC-Medium, sans-serif;
        display: inline-block;
        float: left;
    }
    .userInfo{
       font-family:  PingFangTC-Regular, sans-serif;
       font-size: 24px;
       color: rgb(66,66,66);
       height: 20px;
       text-align: left;
    }
    .fansi{
        height: 56px;
        margin-top: 24px;
        
    }
    .fansi .fansi_dec{
        width: 118px;
        height: 56px;
        font-size: 28px;
        font-family: PingFangTC-Regular, sans-serif;
        height: 56px;
        line-height: 56px;
        color: rgb(66,66,66,0.6);
        float: left;
    }
    .fansi .fansi_count{
        display:inline-block;
        height: 56px;
        line-height: 56px;
        color: rgb(66,66,66);
        margin-left: 16px;
        margin-right: 32px;
        float: left;
    }
</style>

