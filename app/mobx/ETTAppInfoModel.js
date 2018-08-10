/*
   康晓光 2018-6-6  应用配置数据模型
 */

import ETTBaseModel from   './ETTBaseModel';
import {name} from "../res/values/ETTString";
import {ETTAppLoadState,ETTNetworkState} from '../res/values/ETTEnum'
import {observable,computed,autorun,action,useStrict} from 'mobx';
import ETTokenModel from './ETTokenModel';
import  ETTNetWorkTool  from '../utils/ETTNetWorkTool';

import {TAG_NETWORK_CHANGE} from '../res/values/ETTConfig';

export default class  ETTUserModel extends ETTBaseModel {

    @observable _isFirstOpen:String = 'YES' ;
    @observable _isLoadState:ETTAppLoadState = ETTAppLoadState.loadnone;
    @observable _networkState:ETTNetworkState = ETTNetworkState.networkNone ;
    _networkType:String = 'unkown';
    _tokenModel:ETTokenModel ;

    initData()
    {
        super.initData();

        this._tokenModel = new ETTokenModel();
        this.regNetworkObserver();

    }
    setFirstOpenStatus(value)
    {
        if(value && value.length>1)
        {
            this._isFirstOpen = value;
        }
    }

    setLoadDataComplet(data)
    {

        if (data)
        {
            this._isFirstOpen = data._isFirstOpen;
            this._tokenModel._access_token   = data._tokenModel._access_token;
            this._tokenModel._refresh_token  = data._tokenModel._refresh_token;
            this._tokenModel._expiresIn      = data._tokenModel._expiresIn;
            this._tokenModel._expiration     = data._tokenModel._expiration;
        }

    }

    resetModel()
    {
        super.resetModel();
        this._isFirstOpen = 'YES' ;
        //this. isLoadState = ETTAppLoadState.loadnone;
        this._tokenModel._access_token = '';
        this._tokenModel._expiresIn    = '';
        this._tokenModel._refresh_token = '';
        this._tokenModel._expiration    = '';

    }

    refreshtokenSuccessfulInfo(jsonData)
    {

        this._tokenModel._access_token = jsonData.access_token;
        this._tokenModel._expiration   = jsonData.expiration;
        this._tokenModel._refresh_token = jsonData.refresh_token;
        this._tokenModel._expiresIn    = jsonData.expiresIn;
    }


    regNetworkObserver()
    {
        ETTNetWorkTool.addEventListener((state)=>this.networkConnectionHandle(state),(state)=>this.networkChangehandle(state))

    }

    removeNetworkObserver()
    {
        ETTNetWorkTool.removeEventListener(TAG_NETWORK_CHANGE,this.handleMethod())
    }

    _cheackNetworkState()
    {

        this._networkType = network_state.type;
        let reselut =  ETTNetWorkTool.isNetworkConnected(network_state.type);

        if (reselut == true)
        {
            this._networkState =ETTNetworkState.networkNotUse;
        }
        else
        {
            this._networkState =ETTNetworkState.networkAvailable
        }
    }
    networkConnectionHandle(network_state)
    {

        //let reselut =  ETTNetWorkTool.isNetworkConnected(network_state);
       // console.log(reselut);
    }
    networkChangehandle(network_state){
        if (this._networkType == network_state.type)
        {
            return;
        }

        this._networkType = network_state.type;
        let reselut =  ETTNetWorkTool.isNetworkConnected(network_state.type);
        if (reselut == true)
        {
           this._networkState =ETTNetworkState.networkNotUse;
        }
        else
        {
          this._networkState =ETTNetworkState.networkAvailable
        }
    }
}