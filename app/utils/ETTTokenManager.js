
import  ETTUserModel  from  '../mobx/ETTUserModel';

import  ETTString   from  '../res/values/ETTString'
import {ETTAppLoadState,ETTTokenStatus} from '../res/values/ETTEnum'
import NetworkUrl from "../res/values/ETTURLConfig";
import RequestModel from "../mobx/ETTRequestModel";
import  {DataManager}  from '../res/values/ETTConfig';
import ETTNetworkUtil from "./ETTNetworkUtil";

export  default  class ETTTokenManager {
     userModel:ETTUserModel;
    constructor() {
    }

    storageUserModel(model:ETTUserModel)
    {
        if (model)
        {
            this.userModel = model;
        }
    }
    //检查用于面登录等
    checkAvoidLoginTokenEffective()
    {
       if (DataManager._appInfo._tokenModel._access_token.length<1)
       {
           return ETTTokenStatus.tokenInvalid;
       }
        var nowTime = (new Date()).valueOf();
        let time = parseInt(DataManager._appInfo._tokenModel._expiration) ;

        let expiration = parseInt( (time - nowTime)/1000);
        if (time <=0 || expiration <=0)
        {
            //过期
            return ETTTokenStatus.tokenInvalid;

        }
        if ( expiration <= 60)
        {
            //过期
            return ETTTokenStatus.tokenInvalid;

        }
        else if(expiration < 1200  )
        {
            //需要刷新
            return ETTTokenStatus.tokenNeedRefresh;

        }
        else
        {
            //token在有效期内
            return ETTTokenStatus.tokenValid;
        }


    }
    //检查用户token
    checkTokenEffective()
    {
        console.log('检查token是否有效');
            //做一些异步操作
            var nowTime = (new Date()).valueOf();
            let time = parseInt(this.userModel.expiration) ;

            let expiration = parseInt( (time - nowTime)/1000);
            if (time <=0 || expiration <=0)
            {
                //过期
                return ETTTokenStatus.tokenInvalid;

            }
            let expiresIn = this.userModel.expiresIn;
            let interval  = expiresIn - expiration;
            if ( expiration <= 60)
            {
                //过期
                return ETTTokenStatus.tokenInvalid;

            }
            else if(expiration < 1200  )
            {
                //需要刷新
                return ETTTokenStatus.tokenNeedRefresh;

            }
            else
            {
                //token在有效期内
                return ETTTokenStatus.tokenValid;
            }

            console.log(this.userModel.expiresIn);
    }

    token(status){
        return new Promise(function(resolve, reject){        //做一些异步操作
            if ( status == ETTTokenStatus.tokenValid)
            {
                resolve(status);
                //resolve(ETTTokenStatus.tokenValid);
                //reject("刷新token");
                //reject("刷新token");
               // throw new Error("做一些异步操作");

            }
            else if (status == ETTTokenStatus.tokenNeedRefresh)
            {
               // reject(status);
               // this.refreToken();
                resolve(status);
            }
            else
            {
                resolve(status);
            }
        });

    }

    getRefreTokenModel()
    {
        let requetModel = new RequestModel();
        requetModel._method = 'POST'
        requetModel._path = NetworkUrl.refresh_token;
        requetModel._bodyData =  '';
        requetModel._getInfo = requetModel.getTokenRequesetData();
        return requetModel;
    }
   //刷新免登录token
    getRefreAvoidLoginTokenModel()
    {
        let requetModel = new RequestModel();
        requetModel._method = 'POST'
        requetModel._path = NetworkUrl.refresh_token;
        requetModel._bodyData =  '';
        requetModel._getInfo = requetModel.getAvoidLoginTokenRequesetData();
        return requetModel;
    }
    //免登录
    getAvoidLoginModel()
    {
        console.log('getAvoidLoginModel');
        let requetModel = new RequestModel();
        requetModel._method = 'POST'
        requetModel._path = NetworkUrl.avoid_login;
        requetModel._bodyData =  'username=' + NetworkUrl.avoid_login_name + '&password=' + NetworkUrl.avoid_login_pwd;
        requetModel._getInfo = requetModel.getAvoidLoginAuthorizationRequesetData();
        return requetModel;
    }

    refreToken()
    {

    }

}