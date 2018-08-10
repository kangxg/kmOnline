let ETTChangePwdType ={

    changType_none:0,
    changType_oldpwd:1,
    changeType_code:2,
    //正在设置密码
    //changeType_pwd_setting:1<<2,
    changeType_pwd_setting_frompwd:3,
    changeType_pwd_setting_fromcode:4,

}

var ETTAppLoadState ={
    loadFail:-1,
    loadnone :0,
    loadWelcome:1,
    loadUserInfo:1<<1,
    loadOver:3,
}

var ETTUserLogType ={
    logNone :0,
    //手机号密码
    logPwd:1,
    //手机验证码
    logCode:2,
    logWeChat:3,
    logQQ:4,
    logBindWechat:5,
}

var ETTTokenStatus ={
    //无效
    tokenInvalid:-1,
    //有效
    tokenValid:0,
    //需要刷新
    tokenNeedRefresh :1,
}

var ETTNetworkState ={
    //不可知状态，需要进行检查
    networkNone:-1,
    //不可用
    networkNotUse:0,
    //有效
    networkAvailable:1,
}
module.exports = {ETTChangePwdType,ETTAppLoadState,ETTUserLogType,ETTTokenStatus,ETTNetworkState};