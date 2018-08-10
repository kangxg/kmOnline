/*
    常量、接口地址、路由、多语言化等预置数据
 */


export  let defaultExpires = 1000*3600*24;

import {ETTDataHouseManager} from "../../utils/ETTDataHouseManager"
// import ETTNetworkUtil from "../../utils/ETTNetworkUtil"



export   let DataManager =   ETTDataHouseManager.ShareInstance();

//手机号注册账号虽大长度
export   let AMOUNT_MAXLEGTH  = 11


export   let REG_PWDMAXLENGTH  = 16

export   let REG_CODEMAXLENGTH  = 8


export    let NOT_NETWORK = "网络不可用，请稍后再试"

export    let TAG_NETWORK_CHANGE = "NetworkChange"

// export  let  NetworkUtil = ETTNetworkUtil;

