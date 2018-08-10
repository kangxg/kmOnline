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
import  changeStyles from '../res/styles/ETTChangePwdStyles';
import  ETTDevice from '../res/values/ETTDevice';
import  {
         DataManager,
         REG_CODEMAXLENGTH,
         REG_PWDMAXLENGTH,
         AMOUNT_MAXLEGTH}
         from '../res/values/ETTConfig';

import  {ETTDarkStatus} from '../common/ETTStatusBar';
import  ETTString  from '../res/values/ETTString';
import  {ETTEditPwdView,ETTEditPhoneCodeView,ETTEditCodeView,ETTEditOldPwdView,ETTEditPhoneView} from '../common/ETTEditView';
import  {ETTChangePwdType} from '../res/values/ETTEnum'

import  LoadingAnimation from '../common/ETTLoadingAnimation';

import  Network from '../utils/ETTNetworkUtil';
import  NetworkUrl from '../res/values/ETTURLConfig';
import  NetResponseHelper from '../utils/ETTNetResponseHelper';
import RequestModel from "../mobx/ETTRequestModel";


import {isRightPwd,isRightPhone} from "../res/values/ETTInlineFuction";
export default class  ETTChangePwdScene extends   Component
{
    constructor(props) {
        super(props);
        this.state = {
            changePwdType:ETTChangePwdType.changType_oldpwd,
            oldpwd:'',
            newpwd:'',
            newpwdenter:'',//再次输入的密码
            mobile:'',
            code:''
        }
    }
    //通过旧密码修改视图
    changepwdforoldpwd()
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
                        修改密码
                    </Text>
                </View>
                <ETTEditOldPwdView placeholder = {ETTString.changepwd_old_placeholder}
                                   maxLength   = {REG_PWDMAXLENGTH}
                                   changeHandle ={(text) =>this.oldpwdChangeHandle(text)}/>
                <Text style={LogStyles.log_line}/>
                <TouchableOpacity style={LogStyles.log_forgetpwd_next_btn} onPress ={()=>this.oldpwdNextCallback()}>
                    <Text style={LogStyles.log_btn_text}>
                        下一步
                    </Text>
                </TouchableOpacity>
                <View style={changeStyles.down_nav}>
                    <TouchableOpacity  onPress ={()=>this.changepwdToSetPwdForCodeCallback()}>
                        <Text style={changeStyles.down_nav_text}>
                            {ETTString.changepwd_forcode_text}
                        </Text>
                    </TouchableOpacity>
                    <Image style={changeStyles.down_nav_image}
                           source={require('../res/images/tab_c5.png')}/>
                </View>
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
    //通过验证码修改视图
    changepwdforCode()
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
                        修改密码
                    </Text>
                </View>
                <ETTEditPhoneView placeholder = {ETTString.log_amount_placeholder}
                                  maxLength   = {AMOUNT_MAXLEGTH}
                                  changeHandle ={(text) =>this.iphoneChangeHandle(text)}/>
                <Text style={LogStyles.log_line}/>
                <ETTEditCodeView ref='editCode'
                                 placeholder = {ETTString.forgetamount_pwd_placeholder}
                                 maxLength   = {REG_CODEMAXLENGTH}
                                 changeHandle ={(text) =>this.codeChangeHandle(text)}
                                 getCodeHandle ={()=>this.getCodelHandel()} />

                <Text style={LogStyles.log_line}/>

                <TouchableOpacity style={LogStyles.log_forgetpwd_next_btn} onPress ={()=>this.codeNextCallback()}>
                    <Text style={LogStyles.log_btn_text}>
                        下一步
                    </Text>
                </TouchableOpacity>
                <View style={changeStyles.down_nav}>
                    <TouchableOpacity  onPress ={()=>this.changepwdToSetPwdForOldPwdCallback()}>
                        <Text style={changeStyles.down_nav_text}>
                            {ETTString.changepwd_forOldpwd_text}
                        </Text>
                    </TouchableOpacity>
                    <Image style={changeStyles.down_nav_image}
                           source={require('../res/images/tab_c5.png')}/>
                </View>
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
    //设置密码视图
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
                                changeHandle ={(text) =>this.newpwdChangeHandle(text)}/>
                <Text style={LogStyles.log_line}/>
                <ETTEditPwdView placeholder = {ETTString.forget_enterresetpwd_placeholder}
                                maxLength   = {REG_PWDMAXLENGTH}
                                changeHandle ={(text) =>this.newpwdEnterChangeHandle(text)}/>
                <Text style={LogStyles.log_line}/>
                <TouchableOpacity style={LogStyles.log_forgetpwd_next_btn} onPress ={()=>this.setPwdCompleteCallback()}>
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
    //旧密码输入改变回调
    oldpwdChangeHandle(text)
    {
        this.setState(
            {
                oldpwd:text,
            });
    }
    //新密码输入改变回调
    newpwdChangeHandle(text)
    {
        this.setState(
            {
                newpwd:text,
            });
    }
    //再次输入新密码输入改变回调
    newpwdEnterChangeHandle(text)
    {
        this.setState(
            {
                newpwdenter:text,
            });
    }
    //手机号输入改变回调
    iphoneChangeHandle(text)
    {
        this.setState(
            {
                mobile:text,
            });
    }
    codeChangeHandle(text)
    {
        this.setState(
            {
                code:text,
            });
    }

    //通过手机验证码按钮回调
    changepwdToSetPwdForCodeCallback()
    {

        this.setState(
            {
                changePwdType:ETTChangePwdType.changeType_code,
            });
    }
    changepwdToSetPwdForOldPwdCallback()
    {
        this.setState(
            {
                changePwdType:ETTChangePwdType.changType_oldpwd,
            });
    }
    //通过旧密码修改 下一步按钮回调
    oldpwdNextCallback()
    {
        console.log('oldpwdNextCallback');

        if(this.state.oldpwd.length<1)
        {
            this.refs.toast.show(ETTString.pwd_null_toast)
        }
        else if(this.state.oldpwd.length<6)
        {
            this.refs.toast.show(ETTString.pwd_min_length_toast)
        }
        else if(isRightPwd(this.state.oldpwd) == false)
        {
            this.refs.toast.show(ETTString.pwd_format_toast)
        }
        else
        {
            this.setState(
                {
                    changePwdType:ETTChangePwdType.changeType_pwd_setting_frompwd
                });
        }

    }
    //通过验证码修改下一步按钮回调
    codeNextCallback()
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
        else  if(this.state.code.length<1)
        {
            this.refs.toast.show(ETTString.code_null_toast)
        }
        else
        {
            this.setState(
                {
                    changePwdType:ETTChangePwdType.changeType_pwd_setting_fromcode
                });
        }


    }


    render() {
        switch (this.state.changePwdType)
        {
            case ETTChangePwdType.changType_none:
            {

            }

            case ETTChangePwdType.changType_oldpwd:
            {
                return this.changepwdforoldpwd();
            }
                break;
            case ETTChangePwdType.changeType_code:
            {
                return this.changepwdforCode();
            }
                break;
            case ETTChangePwdType.changeType_pwd_setting_frompwd:
            {
            }
            case ETTChangePwdType.changeType_pwd_setting_fromcode:
            {
                return this.setPassword();
            }
                break;
            default:
            {
                return this.changepwdforoldpwd();
            }
        }
    }
    //返回
    goback()
    {
        this.props.navigation.pop();
    }

    //获得验证码回调
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

            let formData = new FormData();
            formData.append("phone",this.state.mobile);

            let requetModel = new RequestModel();
            requetModel._path =  NetworkUrl.SERVICE_NAME_SMS +NetworkUrl.pwd_reset_sendcode;
            requetModel._bodyData =  'phone='+this.state.mobile;
            requetModel._method = 'POST',

            //formData;
            requetModel._getInfo = requetModel.getTokenFormRequesetData();

            Network.requestWithToken(requetModel,(json)=>{
                console.log(json);
                let reslut = NetResponseHelper.responseJsonForResult(json)
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
            });

        }
    }


    //设置密码成功回调
    setPwdCompleteCallback()
    {
        //alert(this.state.changePwdType);
        if (this.state.changePwdType == ETTChangePwdType.changeType_pwd_setting_frompwd)
        {
            this.resetPwdforOldpwdRequest();

        }
        else
        {
            this.resetPwdforCodepwaRequest();
        }

    }

    resetPwdforOldpwdRequest()
    {

        if(this.state.newpwd.length<1)
        {
            this.refs.toast.show(ETTString.pwd_null_toast)
        }
        else  if(this.state.newpwd.length<6)
        {
            this.refs.toast.show(ETTString.pwd_min_length_toast)
        }
        else  if(isRightPwd(this.state.newpwd) == false)
        {
            this.refs.toast.show(ETTString.pwd_format_toast)
        }
        else if(this.state.newpwdenter.length<1)
        {
            this.refs.toast.show(ETTString.pwd_enter_toast)
        }

        else if(this.state.newpwd != this.state.newpwdenter)
        {
            this.refs.toast.show(ETTString.find_pwd_notsame)
        }
        else
        {
            console.log("enterSetPasswor");

            this.refs.loading._show(null);
            let formData = new FormData();
            formData.append("oldPassword",this.state.oldpwd);
            formData.append("password",this.state.newpwd);

            let requetModel = new RequestModel();
            requetModel._method = 'PUT'
            requetModel._path =  NetworkUrl.SERVICE_NAME_ACCOUNT + NetworkUrl.pwd_reset_oldpwd;
            requetModel._bodyData =  'oldPassword='+this.state.oldpwd +'&password='+this.state.newpwd;
            //formData;
            requetModel._getInfo = requetModel.getTokenRequesetData();

            Network.requestWithToken(requetModel,(json)=>{
                let reslut = NetResponseHelper.responseJson(json)
                this.refs.loading._hiden();
                if (reslut.code !=1)
                {
                    this.refs.toast.show(reslut.msg);
                }
                else
                {
                    // alert('返回'+JSON.stringify(json));
                    this.refs.toast.show(reslut.msg);
                    DataManager.changePassword(this.state.newpwd);
                }
            });
            // let url='http://gw5.bj.etiantian.net:42397/accounts';

        }
    }


    resetPwdforCodepwaRequest() {
        if(this.state.newpwd.length<1)
        {
            this.refs.toast.show(ETTString.pwd_null_toast)
        }
        else if(this.state.newpwdenter.length<1)
        {
            this.refs.toast.show(ETTString.pwd_enter_toast)
        }
        else if(this.state.newpwd != this.state.newpwdenter)
        {
            this.refs.toast.show(ETTString.find_pwd_notsame)
        }
        else
        {
            console.log("enterSetPasswor");
            // let formData = new FormData();
            // formData.append("phone",this.state.mobile);
            // formData.append("phoneCode",this.state.code);
            // formData.append("password",this.state.newpwd);

            let requetModel = new RequestModel();
            requetModel._path =  NetworkUrl.SERVICE_NAME_ACCOUNT +NetworkUrl.pwd_reset_code;
            requetModel._bodyData = 'phone='+this.state.mobile + '&phoneCode='+this.state.code + '&password='+this.state.newpwd;
            requetModel._method = 'PUT',

                //formData;
                requetModel._getInfo = requetModel.getTokenRequesetData();
            // let url='http://gw5.bj.etiantian.net:42397/accounts';
            Network.requestWithToken(requetModel,(json)=>{
                console.log("enterlog"+json);
                let reslut = NetResponseHelper.responseJsonForResult(json)
                this.refs.loading._hiden();
                if (reslut.code !=1)
                {
                    this.refs.toast.show(reslut.msg);
                }
                else
                {
                    this.refs.toast.show(reslut.msg);
                    //DataManager.logSuccessful();
                    //this.refs.toast.show(ETTString.reg_successful);

                }});
        }
    }

    nextCallback()
    {
        this.setState({amountverification:true});
    }

    resetState()
    {

    }
}