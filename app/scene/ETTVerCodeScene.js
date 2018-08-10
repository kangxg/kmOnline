/*
   康晓光 2018-4-13  验证码登录
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
import { NavigationActions } from 'react-navigation'
import Toast, {DURATION} from 'react-native-easy-toast'

import  LogStyles from '../res/styles/ETTLogStyles';
import  ETTDevice from '../res/values/ETTDevice';
import  {DataManager,REG_CODEMAXLENGTH,AMOUNT_MAXLEGTH}  from '../res/values/ETTConfig';
import  {ETTDarkStatus} from '../common/ETTStatusBar';
import  ETTString  from '../res/values/ETTString';
import  {ETTEditCodeView,ETTEditPhoneCodeView} from '../common/ETTEditView';

import  LoadingAnimation from '../common/ETTLoadingAnimation';

import  Network from '../utils/ETTNetworkUtil';
import  NetworkUrl from '../res/values/ETTURLConfig';
import  NetResponseHelper from '../utils/ETTNetResponseHelper';
import RequestModel from "../mobx/ETTRequestModel";
import {ETTUserLogType} from "../res/values/ETTEnum";


export default class  ETTLogScene extends   Component

{
    static navigationOptions = {
        title: 'Home',    //设置navigator的title
    }
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
                <View style={LogStyles.log_pushscene_header}>
                    <TouchableOpacity onPress ={()=>this.goback()}>
                        <Image style={LogStyles.log_back}
                               source={require('../res/images/km_back.png')}/>
                    </TouchableOpacity>

                    <Text style={LogStyles.log_code_title}>
                        验证码快捷登录
                    </Text>
                </View>

                <ETTEditPhoneCodeView placeholder = {ETTString.log_code_placeholder}
                                      maxLength   = {AMOUNT_MAXLEGTH}
                                      changeHandle ={(text) =>this.amountChangeHandle(text)}/>
                <Text style={LogStyles.log_line}/>
                <ETTEditCodeView ref='editCode'
                                 placeholder = {ETTString.log_codepwd_placeholder}
                                 maxLength   = {REG_CODEMAXLENGTH}
                                 changeHandle ={(text) =>this.codeChangehandle(text)}
                                 getCodeHandle ={()=>this.getCodelHandel()}/>
                <Text style={LogStyles.log_line}/>
                <TouchableOpacity style={LogStyles.log_btn} onPress ={()=>this.logCallback()}>
                    <Text style={LogStyles.log_btn_text}>
                        登录
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
        if (callback)
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
        requetModel._path =  NetworkUrl.SERVICE_NAME_AUTH +NetworkUrl.code_Log;
        requetModel._method = 'POST';
        requetModel._bodyData =  formData;
        requetModel._getInfo = requetModel.getAuthorizationFormRequesetData();

        // let url='http://gw5.bj.etiantian.net:42397/accounts';
        Network.post(requetModel).then((json) => {
            //处理 请求结果
            console.log("enterlog"+json);
            //alert("enterlog"+json)

            this.refs.loading._hiden();

            if (json.access_token)
            {
                let amountInfo = {'amount':this.state.mobile,'pwd':this.state.password};
                DataManager.logSuccessful(json,ETTUserLogType.logCode,amountInfo);

                this.props.navigation.pop();

                let {params} = this.props.navigation.state
                let callback = params.loginSuccessBack;
                if (callback)
                {
                    callback()
                }




            }
            else
            {
                let reslut = NetResponseHelper.responseJson(json);
                this.refs.toast.show(reslut.msg);
            }
            // if (reslut.code !=1)
            // {
            //     this.refs.toast.show(reslut.msg);
            // }
            // else
            // {
            //     // alert('返回'+JSON.stringify(json));
            //     DataManager.logSuccessful();
            //     //this.refs.toast.show(ETTString.reg_successful);
            //
            // }
        },(json)=>{
            //TODO 处理请求fail
            this.refs.loading._hiden();
            console.log('请求错误'+json);
            alert("请求错误"+json)
            let result = NetResponseHelper.requestFailJson(json);
            this.refs.toast.show(result.msg);
        })
    }
    getCodelHandel()
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
        else {

            this.refs.editCode._countdownAction();
            this.refs.loading._show(null);

            // let formData = new FormData();
            // formData.append("phone",this.state.mobile);


            let requetModel = new RequestModel();
            requetModel._path =  NetworkUrl.SERVICE_NAME_SMS + NetworkUrl.logCode;
            requetModel._method = 'POST';
            requetModel._bodyData =  'phone='+this.state.mobile;
            //requetModel.BodyData =  formData;
            requetModel._getInfo = requetModel.getAuthorizationRequesetData();

            Network.post(requetModel).then((json) => {
                //处理 请求结果
                console.log(json);
                let reslut = NetResponseHelper.responseJson(json)
                if (reslut.code !=1)
                {
                    this.refs.toast.show(reslut.msg);
                }
                else
                {
                    // alert('返回'+JSON.stringify(json));
                    this.refs.toast.show(ETTString.code_send_successful);
                }
                this.refs.loading._hiden();

            },(json)=>{
                //TODO 处理请求fail
                this.refs.loading._hiden();
                let result = NetResponseHelper.requestFailJson(json)
                this.refs.toast.show(result.msg);

            })

        }

    }

}