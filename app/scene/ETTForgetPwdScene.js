/*
   康晓光 2018-4-16  忘记秘密
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
import { StackNavigator } from 'react-navigation';
import Toast, {DURATION} from 'react-native-easy-toast'

import  LogStyles from '../res/styles/ETTLogStyles';
import  ETTDevice from '../res/values/ETTDevice';
import  {
         DataManager,
         REG_CODEMAXLENGTH,
         AMOUNT_MAXLEGTH,
         REG_PWDMAXLENGTH
        }  from '../res/values/ETTConfig';
import  {ETTDarkStatus} from '../common/ETTStatusBar';
import  ETTString  from '../res/values/ETTString';
import  {ETTEditPwdView,ETTEditPhoneCodeView,ETTEditCodeView} from '../common/ETTEditView';

import  LoadingAnimation from '../common/ETTLoadingAnimation';

import  Network from '../utils/ETTNetworkUtil';
import  NetworkUrl from '../res/values/ETTURLConfig';
import  NetResponseHelper from '../utils/ETTNetResponseHelper';
import RequestModel from "../mobx/ETTRequestModel";

import {isRightPwd,isRightPhone} from "../res/values/ETTInlineFuction";
export default class  ETTForgetPwdScene extends   Component
{
    constructor(props) {
        super(props);
        this.state = {
            amountverification:false,
            mobile:'',
            code:'',
            newpwd:'',
            oldpwd:''
        }
    }

    findPassword()
    {
        return(
            <View style={LogStyles.log_Mian}>
                <ETTDarkStatus/>
                <View style={LogStyles.log_forgetpwd_header}>
                    <TouchableOpacity onPress ={()=>this.goback()}>
                        <Image style={LogStyles.log_back}
                               source={require('../res/images/km_back.png')}/>
                    </TouchableOpacity >

                    <Text style={LogStyles.log_code_title}>
                        找回密码
                    </Text>
                </View>
                <ETTEditPhoneCodeView placeholder = {ETTString.log_amount_placeholder}
                                      maxLength   = {AMOUNT_MAXLEGTH}
                                      changeHandle ={(text) =>this.amountChangeHandle(text)}/>
                <Text style={LogStyles.log_line}/>
                <Text/>
                <ETTEditCodeView placeholder = {ETTString.forgetamount_pwd_placeholder}
                                 ref='editCode'
                                 maxLength   = {REG_CODEMAXLENGTH}
                                 changeHandle ={(text) =>this.codeChangehandle(text)}
                                 getCodeHandle ={()=>this.getCodelHandel()}/>
                <Text style={LogStyles.log_line}/>
                <TouchableOpacity style={LogStyles.log_forgetpwd_next_btn} onPress ={()=>this.nextCallback()}>
                    <Text style={LogStyles.log_btn_text}>
                        下一步
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

    setPassword()
    {
        return(
            <View style={LogStyles.log_Mian}>
                <ETTDarkStatus/>
                <View style={LogStyles.log_forgetpwd_header}>
                    <TouchableOpacity onPress ={()=>this.goback()}>
                        <Image style={LogStyles.log_back}
                               source={require('../res/images/km_back.png')}/>
                    </TouchableOpacity >

                    <Text style={LogStyles.log_code_title}>
                        设置密码
                    </Text>
                </View>
                <ETTEditPwdView placeholder = {ETTString.forget_resetpwd_placeholder}
                                maxLength   = {REG_PWDMAXLENGTH}
                                changeHandle ={(text) =>this.newpwdChangehandle(text)}/>
                <Text style={LogStyles.log_line}/>
                <ETTEditPwdView placeholder = {ETTString.forget_enterresetpwd_placeholder}
                                maxLength   = {REG_PWDMAXLENGTH}
                                changeHandle ={(text) =>this.oldpwdChangehandle(text)}/>
                <Text style={LogStyles.log_line}/>
                <TouchableOpacity style={LogStyles.log_forgetpwd_next_btn} onPress ={()=>this.enterSetPwdCallback()}>
                    <Text style={LogStyles.log_btn_text}>
                        完成
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
    render() {
         if (this.state.amountverification)
         {
             return this.setPassword();
         }
         return this.findPassword();
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

    nextCallback()
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
        else if(isRightPhone(this.state.mobile) == false)
        {
            this.refs.toast.show(ETTString.iphone_unqualified_toast);
        }
        else if(this.state.code.length<1)
        {
            this.refs.toast.show(ETTString.code_null_toast)
        }
        else
        {
            this.setState({amountverification:true});
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
    //新密码输入改变回调
    newpwdChangehandle(text)
    {
        this.setState(
            {
               newpwd:text,
            }
        );
    }
    //旧密码输入改变回调
    oldpwdChangehandle(text)
    {
        this.setState(
            {
                oldpwd:text,
            }
        );
    }
    //获取验证码
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
            requetModel._path =  NetworkUrl.SERVICE_NAME_SMS + NetworkUrl.find_pwd_code;
            requetModel._bodyData =  'phone='+this.state.mobile;

            requetModel._getInfo = requetModel.getAuthorizationRequesetData();

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
    //完成按钮回调
    enterSetPwdCallback()
    {
        // let pattern = /^[a-zA-Z][a-zA-Z0-9_]{5,15}$/
        let pattern = /[a-zA-Z0-9_]{6,16}$/

        if (this.state.newpwd.length<1)
        {
            this.refs.toast.show(ETTString.pwd_null_toast);
        }
        else  if(this.state.newpwd != this.state.oldpwd)
        {
            this.refs.toast.show(ETTString.find_pwd_notsame);
        }
        else if (!isNaN(Number(this.state.newpwd))) {
            this.refs.toast.show(ETTString.find_pwd_is_number)
        }
        else if (this.state.newpwd.length < 6 || this.state.newpwd.length > 16) {
            this.refs.toast.show(ETTString.find_pwd_6_16)
        }
        else if (!pattern.test(this.state.newpwd)) {
            this.refs.toast.show(ETTString.find_pwd_is_wrong)
        }
        else{
            this.setpwdRequest();
            //alert('enterSetPwdCallback');
        }

    }
    //设置密码请求
    setpwdRequest(){
        this.refs.loading._show(null);
        console.log("setpwdRequest");
        let formData = new FormData();
        formData.append("phone",this.state.mobile);
        formData.append("phoneCode",this.state.code);
        formData.append("password",this.state.newpwd);

        let requetModel = new RequestModel();
        requetModel._path =  NetworkUrl.SERVICE_NAME_ACCOUNT + NetworkUrl.find_pwd_enterset;
        requetModel._bodyData =  formData;

        requetModel._getInfo = requetModel.getAuthorizationFormRequesetData();
        // let url='http://gw5.bj.etiantian.net:42397/accounts';
        Network.post(requetModel).then((json) => {
            //处理 请求结果
            console.log("setpwdRequest"+json);
            let reslut = NetResponseHelper.responseJsonForResult(json)
            this.refs.loading._hiden();
            if (reslut.code !=1)
            {
                this.refs.toast.show(reslut.msg);
            }
            else
            {
                // alert('返回'+JSON.stringify(json));
                //DataManager.logSuccessful();
                this.refs.toast.show(ETTString.modify_successful);
                let delayFunc = this.goback.bind(this);
                setTimeout(()=>{
                    delayFunc();
                }, 300)

            }
        },(json)=>{
            //TODO 处理请求fail
            this.refs.loading._hiden();
            console.log('请求错误'+json);
            alert("请求错误"+json)
            let result = NetResponseHelper.requestFailJson(json);
            this.refs.toast.show(result.msg);
        })
    }

    resetState()
    {

    }

}