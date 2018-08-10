import ETTBaseModel from   './ETTBaseModel';
import NetworkUrl from "../res/values/ETTURLConfig";
import  {DataManager}  from '../res/values/ETTConfig';
import ETTURL from '../res/values/ETTURLConfig';
export default class  ETTRequestModel extends ETTBaseModel
{
    _method:string ='';
    _authKey:String = '';
    _authValue:String= '';
    _path:String ='';
    _bodyData;
    _getInfo;
    static  transFormBodyData(params,url)
    {

        //var params = new URLSearchParams();
        // var str ='';
        // for (var key in formData) {
        //     //params.append(key, formData[key])
        //     str = str + key +'=' + formData[key]
        // }
        // //return params;
        // if (str.length>0)
        // {
        //     str = str + '&';
        // }
        // return str;

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

    }
    getKmRequestPath()
    {
       return  ETTURL.base_url + this._path;
    }

    getWechatRequestPath()
    {
        return  'https://api.weixin.qq.com/sns/oauth2/access_token';
    }

    getAuthorizationRequesetData()
    {
        let requestOptional = {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/x-www-form-urlencoded',
                'Authorization':NetworkUrl.base_header,
            },
            body:this._bodyData
        };

        return requestOptional;
    }

    getAuthorizationFormRequesetData()
    {
        let requestOptional = {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'multipart/form-data',
                'Authorization':NetworkUrl.base_header,
            },
            body:this._bodyData
        };

        return requestOptional;
    }

    getAuthorizationRequesetDataForJson()
    {
        let requestOptional = {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/application/json',
                'Authorization':NetworkUrl.base_header,
            },
            body:this._bodyData
        };

        return requestOptional;
    }

    getAuthorizationRequesetDataGetWay(){
        let requestOptional = {
            method:'GET',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/x-www-form-urlencoded',
                'Authorization':NetworkUrl.base_header,
            },
            body:this.BodyData
        };

        return requestOptional;
    }

    getAuthorizationRequesetDataForJsonGetWay()
    {

        let requestOptional = {
            method:'GET',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/application/json',
                'Authorization':NetworkUrl.base_header,
            },
            body:this.BodyData
        };

        return requestOptional;
    }

    getTokenRequesetData()
    {
        let requestOptional = {
            method:this._method,
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/x-www-form-urlencoded',
                'Authorization':'Bearer '+ DataManager._userModel.access_token
            },
            body:this._bodyData
        };
        return requestOptional;
    }

    getTokenFormRequesetData()
    {
        let requestOptional = {
            method:this._method,
            headers:{
                'Accept':'application/json',
                'Content-Type':'multipart/form-data',
                'Authorization':'Bearer '+ DataManager._userModel.access_token
            },
            body:this._bodyData
        };
        return requestOptional;
    }

    getRefreshTokenRequesetData()
    {
        let requestOptional = {
            method:this._method,
            headers:{
                'Accept':'application/json',
                'Authorization':'Bearer '+ DataManager._userModel.refresh_token
            },
            body:this._bodyData
        };
        return requestOptional;
    }


    //免登录application/json;charset=UTF-8'Content-Type':'application/x-www-form-urlencoded',
    getAvoidLoginAuthorizationRequesetData()
    {

        let requestOptional = {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/x-www-form-urlencoded',
                'Authorization':NetworkUrl.avoid_login_header,
            },
            body:this._bodyData
        };

        return requestOptional;
    }
    //免登录token
    getAvoidLoginTokenRequesetData()
    {
        console.log('getAvoidLoginTokenRequesetData');
        let requestOptional = {
            method:this._method,
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/x-www-form-urlencoded',
                'Authorization':'Bearer '+ DataManager._appInfo._tokenModel._access_token,
            },
            body:this._bodyData
        };
        return requestOptional;
    }

    refreshAvoidLoginToken()
    {
        if (this._getInfo)
        {
            this._getInfo.headers.Authorization  = 'Bearer '+ DataManager._appInfo._tokenModel._access_token;

        }
    }
}