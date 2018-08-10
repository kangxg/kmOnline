
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import ETTURL from '../res/values/ETTURLConfig';
import RequestModel from '../mobx/ETTRequestModel';
import  {DataManager}  from '../res/values/ETTConfig';
import NetResponseHelper from "./ETTNetResponseHelper";
import {ETTTokenStatus, ETTUserLogType} from '../res/values/ETTEnum'
var ETTNetworkUtil = {};
/**
 * GET请求
 */
ETTNetworkUtil.get = function(url, params, headers) {
    if (params) {
        let paramsArray = [];
        //encodeURIComponent
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
        if (url.search(/\?/) === -1) {
            url += '?' + paramsArray.join('&')
        } else {
            url += '&' + paramsArray.join('&')
        }
    }
    return new Promise(function (resolve, reject) {
        fetch(url, {
            method: 'GET',
            headers: headers,
        })
            .then((response) =>  response.text())
            .then((response) => {
                resolve(JSON.parse(response));
            })
            .catch((err)=> {
                reject({status:-1});
            })
    })
}

/**
 * GET请求 FormData 表单数据
 */

ETTNetworkUtil.getForm = function (model:RequestModel) {
    let requesturl =  model.getKmRequestPath();
        //ETTURL.base_url + model.Path
    return new Promise(function (resolve, reject) {
        fetch(requesturl,model.getInfo)
            .then((response) =>  response.text())
            .then((response) => {
                resolve(JSON.parse(response));
            })
            .catch((err)=>{
                reject({status:-20148})
            })
    })

}

/**
 * POST请求 FormData 表单数据
 */
ETTNetworkUtil.post = function(model:RequestModel) {

    let  requesturl = model.getKmRequestPath();
        //ETTURL.base_url + model._path;

    return new Promise(function (resolve, reject) {

        fetch(requesturl, model._getInfo)
            .then((response) =>  response.text())
            .then((response) => {
                resolve(JSON.parse(response));
            })
            .catch((err)=> {
                console.log('失败了'+err);
                alert('请求错误'+err);
                reject({'code':-20148});
            })
    })
}

//免登录带token请求调用
ETTNetworkUtil.requestAvoidLoginWithToken=function(model:RequestModel,callback) {

    // let requesturl = ETTURL.base_url + model.Path;
    // console.log("发送验证码" + model);

    DataManager._tokenManager.token(DataManager._tokenManager.checkAvoidLoginTokenEffective()).then(function (data) {
        console.log(data);
        if (data == ETTTokenStatus.tokenValid)
        {
            ETTNetworkUtil.sendRequesWithToken(model,callback);
        }
        else
        {
            //token失效
            //DataManager.logout();
            let tokenRquestModel = DataManager._tokenManager.getAvoidLoginModel();
            ETTNetworkUtil.refreshToken(tokenRquestModel,(json)=>{
                console.log(json);
                if (json.access_token.length>0)
                {
                    DataManager.refreshAvoidloginToken(json);
                    model.refreshAvoidLoginToken();
                    ETTNetworkUtil.sendRequesWithToken(model,callback);
                }
                else
                {
                    callback(json);
                }
            })

        }

    }).catch((err)=> {
        console.log('失败了'+err);
        callback({'code':-20148,msg:'请求失败！'});
    })

}

ETTNetworkUtil.requestWithToken=function(model:RequestModel,callback) {

    // let requesturl = ETTURL.base_url + model.Path;
    // console.log("发送验证码" + model);

    DataManager._tokenManager.token(DataManager._tokenManager.checkTokenEffective()).then(function (data) {
        console.log(data);
        if (data == ETTTokenStatus.tokenValid)
        {
            ETTNetworkUtil.sendRequesWithToken(model,callback);
        }
        else if(data == ETTTokenStatus.tokenNeedRefresh )
        {
            let tokenRquestModel = DataManager._tokenManager.getRefreTokenModel();
            ETTNetworkUtil.refreshToken(tokenRquestModel,(json)=>{
                console.log(json);
                if (json.code == 1)
                {
                    DataManager.refreshTokenFresh(json.data);
                }
                ETTNetworkUtil.sendRequesWithToken(model,callback);
            })
        }
        else
        {
            //token失效
            DataManager.logout();

        }

    }).catch((err)=> {
        console.log('失败了'+err);
        callback({'code':-20148,msg:'请求失败！'});
    })

}

ETTNetworkUtil.sendRequesWithToken = function(model:RequestModel,callback){
    ETTNetworkUtil.post(model).then((json) => {
        //处理 请求结果
        console.log(json);
        if (callback)
        {
            callback(json);
        }


    },(json)=>{

        console.log({'code':-20148,msg:'刷新token'});
        //callback({'code':-20148,msg:'请求失败！'});
        //return {'code':-20148,msg:'刷新token'}
        if (callback)
        {
            callback({'code':-20148,msg:'请求失败！'});
        }

    });
}

ETTNetworkUtil.refreshToken = function(model:RequestModel,callback){

    ETTNetworkUtil.post(model).then((json) => {
        //处理 请求结果
        console.log(json);
        if (callback)
        {
            callback(json);
        }

    },(json)=>{

        console.log({'code':-20148,msg:'刷新token'});
        if (callback)
        {
            callback({'code':-20148,msg:'请求失败！'});
        }
    });
}

ETTNetworkUtil.weChatRequest = function(model:RequestModel) {

    let  requesturl = model._path;
    //ETTURL.base_url + model._path;

    return new Promise(function (resolve, reject) {

        fetch(requesturl, model._getInfo)
            .then((response) =>  response.text())
            .then((response) => {
                resolve(JSON.parse(response));
            })
            .catch((err)=> {
                console.log('失败了'+err);
                alert('请求错误'+err);
                reject({'code':-20148});
            })
    })
}

/*
 return new Promise(function (resolve, reject) {

        fetch(requesturl, model._getInfo)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    reject({status:response.status})
                }
                console.log('response'+response);
            })
            .then((response) => {
                resolve(response);
            })
            .catch((err)=> {
                console.log('失败了'+err);
                alert('请求错误'+err);
                reject({'code':-20148});
            })
    })

        .then((response) =>  response.text())
            .then((response) => {
                resolve(JSON.parse(response));
            })
 */

export default ETTNetworkUtil;