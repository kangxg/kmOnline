import ETTBaseModel from './ETTBaseModel';
import {name} from "../res/values/ETTString";

import {observable, computed, autorun, action, useStrict} from 'mobx';
import {ETTUserLogType} from '../res/values/ETTEnum'

export default class ETTUserModel extends ETTBaseModel {

    @observable name: String = '';
    logType: ETTUserLogType = ETTUserLogType.logNone;
    @observable _isLog: Boolean = false;
    @observable _userName: String = '';
    @observable _weChatisBinding: Boolean = false;
    _weChatBinding_weChatBinding: [];
    @observable _qqBinding;

    _phone: String = '';
    ref: String = '';
    appId: String = '';
    phoneVerify: String = '';

    userId: String = '';
    password: String = '';
    access_token: String = '';
    expiresIn = '';
    refresh_token: String = '';
    expiration = '';
    appId = '';
    companyId = '';


    constructor() {
        super();

    }

    setRegSuccessfulInfo(jsonData) {
        console.log('setRegSuccessfulInfo');
        if (jsonData) {
            this._phone = jsonData.phone;
            this.ref = jsonData.ref;
            this.password = jsonData.password;
            this.appId = jsonData.appId;
            this.phoneVerify = jsonData.phoneVerify;
            this.userId = jsonData.userId;
            this._userName = jsonData.userName;
        }
    }

    setUserInfo(data) {
        if (!data) {
            return;
        }
        let userInfo = data.userInfo;
        if (userInfo) {
            this.appId = userInfo.appId;
            this.password = userInfo.password;
            this._phone = userInfo.phone;
            this.userId = userInfo.userId;
            this._userName = userInfo.userName;
            this.companyId = userInfo.companyId;
        }

        // thirdUserInfo list
        // nickname string  string 昵称
        // bindingAppId string 第三方的appid
        // bindingId  string 第三方的id
        let thirdUserInfo = data.thirdUserInfo;
        if (thirdUserInfo) {
            for (let [index, item] of thirdUserInfo.entries()) {
                if (item.bindingAppId == 'weixin') {
                    this._weChatBinding = item;
                    this._userName = item.nickname;
                    this._weChatisBinding = true;
                }
                else if (item.bindingAppId == 'qq') {
                    this._qqBinding = item;
                }
            }
        }
        else {
            this._weChatBinding = '';
            this._weChatisBinding = false;
            this._qqBinding = '';
        }
    }

    setLogSuccessfulInfo(jsonData, type, amountInfo) {
        console.log('setRegSuccessfulInfo');
        if (jsonData) {
            this.access_token = jsonData.access_token;
            this.expiration = jsonData.expiration;
            this.refresh_token = jsonData.refresh_token;
            this.expiresIn = jsonData.expiresIn;
        }
        this.logType = type;
        switch (this.logType) {
            case ETTUserLogType.logPwd: {
                this._phone = amountInfo.amount;
                this.password = amountInfo.pwd;
            }
                break;
            case ETTUserLogType.logCode: {
                this._phone = amountInfo.amount;
                this.password = ''
            }
                break;
            case ETTUserLogType.logWeChat: {
                this._phone = amountInfo.phone;
                this.userId = amountInfo.userId;
                this.password = ''
            }
                break;
            case  ETTUserLogType.logBindWechat:{
                this.userId = amountInfo.userId;
                this.password = ''
            }
               break;
            default: {
                this._phone = amountInfo.logNone;
                this.password = ''
            }
        }
    }

    removeThirdAmount(name) {
        if (name == 'wexin' || name == 'weixin') {
            this._weChatBinding = '';
            this._weChatisBinding = false;
        }
    }

    setNewPassword(newPwd) {
        this.password = newPwd;
    }

    refreshtokenSuccessfulInfo(jsonData) {
        if (jsonData) {
            this.access_token = jsonData.access_token;
            this.expiration = jsonData.expiration;
            this.refresh_token = jsonData.refresh_token;
            this.expiresIn = jsonData.expiresIn;
        }
    }

    setLoadDataComplet(data) {
        super.setLoadDataComplet(data);
        if (data) {
            this.access_token = data.access_token;
            this.expiration = data.expiration;
            this.refresh_token = data.refresh_token;
            this.expiresIn = data.expiresIn;
            this.appId = data.appId;
            this.logType = data.logType;
            this.name = data.name;
            this.password = data.password;
            this._phone = data._phone;
            this.ref = data.ref;
            this.phoneVerify = data.phoneVerify;
            this._userName = data._userName;
            this.userId = data.userId;
            this._isLog = data._isLog;
        }
    }

    resetUserInfo() {
        this.expiration = '';
        this.refresh_token = '';
        this.expiresIn = '';
        this.appId = '';
        this.logType = -1;
        this.name = '';
        this.password = '';
        this._phone = '';
        this.ref = '';
        this.phoneVerify = '';
        this._userName = '';
        this.userId = '';
        this.userId = '';
        this.companyId = '';
        this._isLog = false;
        this._weChatBinding = '';
        this._weChatisBinding = false;

    }

    setName(name, callback) {
        console.log("setName");
        this.name = name;
        var mycallback;
        mycallback = function (key) {
            if (!!callback) {
                return callback("name");
            }
        };
        mycallback("name");
    }

    getName() {
        return this.name;
    }

    valueDidChange() {

    }
}

