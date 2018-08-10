/*
   康晓光 2018-4-16  第三方登录 账号绑定
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    TouchableOpacity
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast'
import { StackNavigator } from 'react-navigation';
import  LogStyles from '../res/styles/ETTLogStyles';
import  ETTDevice from '../res/values/ETTDevice';
import {AMOUNT_MAXLEGTH, DataManager, REG_CODEMAXLENGTH} from '../res/values/ETTConfig';
import  {ETTDarkStatus} from '../common/ETTStatusBar';
import  ETTString  from '../res/values/ETTString';
import  {ETTEditPwdView,ETTEditCodeView,ETTEditPhoneCodeView} from '../common/ETTEditView';


import  LoadingAnimation from '../common/ETTLoadingAnimation';

import  Network from '../utils/ETTNetworkUtil';
import  NetworkUrl from '../res/values/ETTURLConfig';
import  NetResponseHelper from '../utils/ETTNetResponseHelper';
import RequestModel from "../mobx/ETTRequestModel";
import {ETTUserLogType} from "../res/values/ETTEnum";
import * as BackHandler from "react-native/Libraries/Utilities/BackHandler.android";
export default class  ETTThirdLoginBindScene extends   Component

{
    constructor(props) {
        super(props);
        this.state = {
            mobile:'',
            code:''
        };
    }
    render() {
        return(
            <View style={LogStyles.log_Mian}>
                <ETTDarkStatus/>
                <View style={LogStyles.log_bind_header}>
                    <TouchableOpacity onPress ={()=>this.goback()}>
                        <Image style={LogStyles.log_back}
                               source={require('../res/images/km_back.png')}/>
                    </TouchableOpacity >

                    <Text style={LogStyles.log_code_title}>
                        绑定账号
                    </Text>
                </View>
                <Text style={LogStyles.log_bind_amount_prompt}>
                    {ETTString.bindamount_prompt_title}
                </Text>
                <ETTEditPhoneCodeView placeholder = {ETTString.log_code_placeholder}
                                      maxLength   = {AMOUNT_MAXLEGTH}
                                      changeHandle ={(text) =>this.amountChangeHandle(text)}/>
                <Text style={LogStyles.log_line}/>
                <ETTEditCodeView ref='editCode'
                                 placeholder = {ETTString.forgetamount_pwd_placeholder}
                                 maxLength   = {REG_CODEMAXLENGTH}
                                 changeHandle ={(text) =>this.codeChangehandle(text)}
                                 getCodeHandle ={()=>this.getCodelHandel()}/>
                <Text style={LogStyles.log_line}/>
                <TouchableOpacity style={LogStyles.log_btn} onPress ={()=>this.logCallback()}>
                    <Text style={LogStyles.log_btn_text}>
                        绑定
                    </Text>
                </TouchableOpacity>

                <Toast
                    ref='toast'
                    style={LogStyles.reg_toast}
                    opacity={0.8}
                    position='top'
                    positionValue={200}
                />
                <LoadingAnimation ref='loading'/>
            </View>
        );

    }
    goback()
    {
        this.props.navigation.pop();
        let {params} = this.props.navigation.state

        let callback = params.stackCloseHandle;
        if (callback && DataManager._userModel._isLog == false)
        {
            callback();
        }
    }

    //手机号码输入变化回调
    amountChangeHandle(text)
    {
        this.setState(
            {
                mobile:text,
            }
        );
    }
    //验证码输入改变回调
    codeChangehandle(text)
    {
        this.setState(
            {
                code:text,
            }
        );
    }

    logCallback()
    {
        if (this.state.mobile.length<1)
        {
            //alert('请输入手机号')
            this.refs.toast.show(ETTString.iphone_null_toast);
        }
        else  if(this.state.mobile.length<AMOUNT_MAXLEGTH)
        {
            this.refs.toast.show(ETTString.iphone_len_toast);
        }

        else  if(this.state.code.length<1)
        {
            this.refs.toast.show(ETTString.code_null_toast)
        }
        else
        {
            this.refs.loading._show(null);
            this.enterLog();
        }

    }
    enterLog()
    {
        console.log("enterlog");
        let formData = new FormData();
        formData.append("mobile",this.state.mobile);
        formData.append("mobileCode",this.state.code);
        // var param = {
        //     mobile:this.state.mobile,
        //     mobileCode:this.state.code
        // };

        //var paramStr = JSON.stringify(param);

        let requetModel = new RequestModel();
        requetModel._path =  NetworkUrl.SERVICE_NAME_ACCOUNT +NetworkUrl.third_log_bind;
        requetModel._method = 'POST';
        requetModel._bodyData =  'phone='+this.state.mobile +'&phoneCode='+this.state.code;
        requetModel._getInfo = requetModel.getTokenRequesetData();

        // let url='http://gw5.bj.etiantian.net:42397/accounts';
        Network.requestWithToken(requetModel, (json) => {

            let reslut = NetResponseHelper.responseJson(json)
            if (reslut.code !=1)
            {
                this.refs.loading._hiden();
                this.refs.toast.show(reslut.msg);
            }
            else
            {
                // alert('返回'+JSON.stringify(json));
                if(reslut.data != null)
                {
                    DataManager.bindMobiePhoneSuccessful(JSON.parse(reslut.data.loginInfo),ETTUserLogType.logWeChat,{'phone':this.state.mobile});
                }
                else
                {
                    DataManager.bindMobiePhoneSuccessful(null,ETTUserLogType.logWeChat,{'phone':this.state.mobile});
                }
                setTimeout ( () =>  this.requestUserThirdInfo(ETTString.bind_phone_successful), 2000);

            }
        })
    }

    requestUserThirdInfo(msg)
    {
        //this.refs.loading._show(null);
        let requetModel = new RequestModel();
        requetModel._path =  NetworkUrl.SERVICE_NAME_ACCOUNT +NetworkUrl.edit_nickname;
        requetModel._bodyData =  '';
        requetModel._method = 'GET',

            //formData;
            requetModel._getInfo = requetModel.getTokenRequesetData();

        Network.requestWithToken(requetModel,(json) => {
            //处理 请求结果
            console.log(json);
            let reslut = NetResponseHelper.responseJsonForResult(json)
            this.refs.loading._hiden();
            // this.refs.loading._hiden();
            if (reslut.code ==1)
            {

                DataManager.obtainUserInfoSuccessful(json.data);

                if (DataManager._userModel._weChatisBinding == false)
                {

                    this.refs.toast.show('绑定失败');
                }
                else
                {
                    this.refs.toast.show(msg);
                    let {params} = this.props.navigation.state;

                    let bindfinish = params.bindfinish;
                    if (bindfinish)
                    {
                        bindfinish(true);
                    }
                    setTimeout ( () => this.goback(), 1000)
                }
                //this.closeHandle();
            }
            // this.refs.toast.show(reslut.msg);

        });
    }
    getCodelHandel()
    {
        console.log("绑定手机号获取验证码");
        if (this.state.mobile.length<1)
        {
            //alert('请输入手机号')
            this.refs.toast.show(ETTString.iphone_null_toast);
        }
        else  if(this.state.mobile.length<AMOUNT_MAXLEGTH)
        {
            this.refs.toast.show(ETTString.iphone_len_toast);
        }
        else {

            this.refs.editCode._countdownAction();
            this.refs.loading._show(null);

            // let formData = new FormData();
            // formData.append("phone",this.state.mobile);


            let requetModel = new RequestModel();
            requetModel._path =  NetworkUrl.SERVICE_NAME_SMS + NetworkUrl.third_log_bind_getCode;
            requetModel._method = 'POST';
            requetModel._bodyData =  'phone='+this.state.mobile;
            //requetModel.BodyData =  formData;
            requetModel._getInfo = requetModel.getTokenRequesetData();

            Network.post(requetModel).then((json) => {
                //处理 请求结果
                console.log(json);
                let reslut = NetResponseHelper.responseJson(json)
                this.refs.loading._hiden();
                if (reslut.code !=1)
                {
                    this.refs.toast.show(reslut.msg);
                }
                else
                {
                    // alert('返回'+JSON.stringify(json));
                    this.refs.toast.show(ETTString.code_send_successful);
                }


            },(json)=>{
                //TODO 处理请求fail
                this.refs.loading._hiden();
                let result = NetResponseHelper.requestFailJson(json)
                this.refs.toast.show(result.msg);

            })

        }

    }

    componentWillMount() {
        if ('android' === Platform.OS) {
            BackHandler.addEventListener('handwareBackPress', this.onBackAndroid)
        }
    }

    componentWillUnmount() {
        if ('android' === Platform.OS) {
            BackHandler.removeEventListener('handwareBackPress', this.onBackAndroid)
        }
    }

    onBackAndroid = () => {
        this.goback();
        return true;
    };

}