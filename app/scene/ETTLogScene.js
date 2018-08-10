/*
   康晓光 2018-4-13  登录
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    Modal,
    TouchableOpacity,

} from 'react-native';
import * as wechat from "react-native-wechat";
import { NavigationActions } from 'react-navigation'
import Toast, {DURATION} from 'react-native-easy-toast'
import  LogStyles from '../res/styles/ETTLogStyles';
import  ETTDevice from '../res/values/ETTDevice';
import  {DataManager,AMOUNT_MAXLEGTH,REG_PWDMAXLENGTH}  from '../res/values/ETTConfig';
import  {ETTDarkStatus} from '../common/ETTStatusBar';
import {ETTEditPhoneView, ETTEditPwdView, ETTEditView} from '../common/ETTEditView';
import  LoadingAnimation from '../common/ETTLoadingAnimation';
import  ETTString  from '../res/values/ETTString';

import  Network from '../utils/ETTNetworkUtil';
import  NetworkUrl from '../res/values/ETTURLConfig';
import  NetResponseHelper from '../utils/ETTNetResponseHelper';
import RequestModel from "../mobx/ETTRequestModel";

import {ETTUserLogType} from '../res/values/ETTEnum'
import  ETTThirdLoginBindScene from './ETTThirdLoginBindScene'
export  class  ETTLogScene extends   Component

{
    static navigationOptions = {
        title: 'Home',    //设置navigator的title
    }

    constructor(props) {
        super(props);
        this.state = {
            mobile:'',
            password:''
        };
    }

    render() {
        return(
            <View style={LogStyles.log_Mian}>

                <ETTDarkStatus/>
                <View style={LogStyles.log_body}>

                    <View style={LogStyles.log_body_top}>
                        <TouchableOpacity style={LogStyles.log_close_btn} onPress ={()=>this.closeHandle()}>
                            <Image style={LogStyles.log_close}
                               source={require('../res/images/tab_c9_close.png')}/>
                        </TouchableOpacity>
                        <Text style={LogStyles.log_title}>

                             登录
                        </Text>
                        <ETTEditPhoneView placeholder = {ETTString.log_amount_placeholder}
                                          maxLength   = {AMOUNT_MAXLEGTH}
                                          changeHandle ={(text) =>this.amountChangeHandle(text)}/>
                        <Text style={LogStyles.log_line}/>
                        <ETTEditPwdView placeholder = {ETTString.log_pwd_placeholder}
                                        maxLength   = {REG_PWDMAXLENGTH}
                                        changeHandle ={(text) =>this.pwdChangeHandle(text)}/>
                        <Text style={LogStyles.log_line}/>
                        <TouchableOpacity style={LogStyles.log_btn} onPress ={()=>this.login()}>
                            <Text style={LogStyles.log_btn_text}>
                                登录
                            </Text>
                        </TouchableOpacity>
                        <View style={LogStyles.log_body_top_bottom}>
                            <TouchableOpacity style={LogStyles.log_code_btn} onPress={()=>this.verCodeonPress()}>
                                <Text style={LogStyles.log_code_btn_text}>
                                    验证码登录
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={LogStyles.log_forget_btn} onPress ={()=>this.forgetpwd()}>
                                <Text style={LogStyles.log_forget_btn_text}>
                                    忘记密码
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={LogStyles.log_body_bottom}>
                        <TouchableOpacity style={LogStyles.log_registered_btn} onPress ={()=>this.registered()}>
                            <Text style={LogStyles.log_registered_btn_text}>
                                注册
                            </Text>
                        </TouchableOpacity>
                        <Text style={LogStyles.log_other_text}>
                            其他方式登录
                        </Text>
                        <View style={LogStyles.log_otherlog}>
                            <TouchableOpacity onPress ={()=>this.weChatLogin()} >
                                <Image  style={LogStyles.log_wechat_log}
                                        source={require('../res/images/wechat_c11.png')}/>
                            </TouchableOpacity>

                        </View>
                    </View>

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
// <TouchableOpacity >
// <Image  style={LogStyles.log_qq_log}
// source={require('../res/images/qq_c11.png')}/>
// </TouchableOpacity>
    closeHandle()
    {
        this.props.navigation.pop();
    }
    startShow=()=>{
        alert('开始显示了');
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
    //密码输入变化回调
    pwdChangeHandle(text)
    {
        this.setState(
            {
                password:text,
            }
        );
    }
    //验证码登录回调
    verCodeonPress()
    {
        this.props.navigation.navigate('VerCodeScene',{})
    }
    //登录回调
    login()
    {
       // DataManager.logSuccessful();
       // DataManager.logSuccessful();

        if(this.state.mobile.length<1)
        {
            this.refs.toast.show(ETTString.iphone_null_toast);
        }
        else if(this.state.mobile.length<AMOUNT_MAXLEGTH)
        {
            this.refs.toast.show(ETTString.iphone_len_toast);
        }
        else  if(this.state.password.length<1)
        {
            this.refs.toast.show(ETTString.pwd_null_toast);
        }
        else
        {
            this.refs.loading._show(null);
            this.login_request()

            //DataManager.logSuccessful();
        }

    }
    login_request()
    {
        console.log('登录');
        // let formData = new FormData();
        // formData.append("mobile",this.state.mobile);
        // formData.append("password",this.state.password);

        // var param = {
        //     mobile:this.state.mobile,
        //     password:this.state.password
        // };

        // var paramStr = JSON.stringify(param);


        let requetModel = new RequestModel();
        requetModel._path =  NetworkUrl.SERVICE_NAME_AUTH +NetworkUrl.password_Log;
        requetModel._bodyData =  'mobile='+this.state.mobile +'&password='+ this.state.password;
            //formData;
        requetModel._getInfo = requetModel.getAuthorizationRequesetData();

        Network.post(requetModel).then((json) => {
            //处理 请求结果
            console.log(json);
            this.refs.loading._hiden();

            if (json.access_token)
            {

                let amountInfo = {'amount':this.state.mobile,'pwd':this.state.password};
                DataManager.logSuccessful(json,ETTUserLogType.logPwd,amountInfo);
                //this.loginhandle();
            }
            else
            {
                let reslut = NetResponseHelper.responseJson(json);
                this.refs.toast.show(reslut.msg);
            }

        },(json)=>{
            //TODO 处理请求fail
            console.log('fail'+json);
            // alert('fail'+json)
            this.refs.loading._hiden();
            let result = NetResponseHelper.requestFailJson(json);

            this.refs.toast.show(result.msg);
        })
    }

    loginhandle(){

    }

    //注册回调
    registered()
    {
        this.props.navigation.navigate('RegisteredScene',{})
    }
    //忘记密码回调
    forgetpwd()
    {
        this.props.navigation.navigate('ForgetPwdScene',{})
    }
    //微信登录回调
    weChatLogin()
    {
        let scope = 'snsapi_userinfo';
        let state = 'wechat_km_app';
        //检测微信是否安装
        wechat.isWXAppInstalled()
            .then( ( isInstalled ) => {
                if ( isInstalled ) {
                   console.log('微信已经安装');
                   //发送授权
                   wechat.sendAuthRequest(scope,state).then(responseCode =>{
                       console.log('授权成功');
                       this.getWechatAccessToken(responseCode);
                       }
                   ).catch(err =>{
                       this.refs.loading._hiden();
                       switch ((err.errCode))
                       {
                           case -2:
                               this.refs.toast.show('授权登录取消 ');
                               break;
                           case -4:
                               this.refs.toast.show('登录授权已拒绝');
                               break;
                           default:
                               break
                       }

                   });
                } else {
                    this.refs.loading._hiden();
                    this.refs.toast.show('没有安装微信软件，请您安装微信之后再试');
                }
            } );
    }
    //获取微信登录token
    getWechatAccessToken(response)
    {

        this.refs.loading._show(null);
        let requetModel = new RequestModel();
        requetModel._path =  'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + NetworkUrl.wxAppid
            +'&secret='+ NetworkUrl.wxSecret +'&code='+response.code + '&grant_type=authorization_code';
        //requetModel._bodyData =  '';

        requetModel._getInfo = '';

        Network.weChatRequest(requetModel).then((json) => {
            //处理 请求结果
            console.log(json);
            if (json.access_token)
            {

               this.getWechatUserInfo(json)
                //this.closeHandle();
            }
            else
            {
                this.refs.loading._hiden();
                let reslut = NetResponseHelper.responseJson(json);
                this.refs.toast.show(reslut.msg);
            }

        },(json)=>{
            //TODO 处理请求fail
            console.log('fail'+json);
            // alert('fail'+json)
            this.refs.loading._hiden();
            let result = NetResponseHelper.requestFailJson(json);

            this.refs.toast.show(result.msg);
        })
    }
    //拉取微信上的用户信息
    getWechatUserInfo(response)
    {
        let requetModel = new RequestModel();
        requetModel._path =  'https://api.weixin.qq.com/sns/userinfo?access_token='+response.access_token
            +'&openid='+response.openid;
        //requetModel._bodyData =  '';

        requetModel._getInfo = '';

        Network.weChatRequest(requetModel).then((json) => {
            //处理 请求结果
            console.log(json);

            let openid = json.openid;

            if (openid && openid.length>0)
            {
                console.log('获取用户信息成功')
                this.thirdRegister(json);
                //this.getWechatUserInfo()
                //this.closeHandle();
            }
            else
            {
                this.refs.loading._hiden();
                let reslut = NetResponseHelper.responseJson(json);
                this.refs.toast.show(reslut.msg);
            }

        },(json)=>{
            //TODO 处理请求fail
            console.log('fail'+json);
            // alert('fail'+json)
            this.refs.loading._hiden();
            let result = NetResponseHelper.requestFailJson(json);

            this.refs.toast.show(result.msg);
        })
    }
    //将微信用户信息注册到后台
    thirdRegister(response)
    {


        let requetModel = new RequestModel();
        requetModel._path =  NetworkUrl.SERVICE_NAME_ACCOUNT +NetworkUrl.third_singin;
        requetModel._bodyData =  'bindingId='+response.unionid
            +'&bindingAppId=weixin'+'&openId='+ response.openid  +'&nickname='+ response.nickname
            +'&photoPath='+ response.headimgurl;
        //formData;
        requetModel._getInfo = requetModel.getAuthorizationRequesetData();

        Network.post(requetModel).then((json) => {
            //处理 请求结果
            console.log(json);
            this.refs.loading._hiden();
            let reslut = NetResponseHelper.responseJsonForResult(json)
            // this.refs.loading._hiden();
            if (reslut.code ==1)
            {
                let phone = reslut.data.phone;

                let amountInfo = {'userId':reslut.data.userId,'phone':reslut.data.phone};

                if (phone == null || phone.length<11)
                {
                    DataManager.thirdAmountLogSuccessful(JSON.parse(reslut.data.loginDetail)
                        ,ETTUserLogType.logWeChat,amountInfo);
                    this.bindMobiliPhone();
                }
                else
                {
                    DataManager.logSuccessful(JSON.parse(reslut.data.loginDetail)
                        ,ETTUserLogType.logWeChat,amountInfo);
                }
            }
            else
            {
                this.refs.toast.show(reslut.msg);
            }

        },(json)=>{
            //TODO 处理请求fail
            console.log('fail'+json);
            // alert('fail'+json)
            this.refs.loading._hiden();
            let result = NetResponseHelper.requestFailJson(json);

            this.refs.toast.show(result.msg);
        })
     }

    bindMobiliPhone() {
        this.props.navigation.navigate('ThirdLoginBindScene', {})

    }


}

export class ETTModalLogScene extends   ETTLogScene
{
    closeHandle()
    {
        console.log('登录关闭按钮回调');
        let callback = this.props.closeHandle;
        if (callback)
        {
           // this.props.nav.pop();
            callback()
        }
    }

    // 登陆成功回调
    loginhandle(){
        console.log('登录关闭按钮回调');
        let callback = this.props.loginHandle;
        if (callback)
        {
            // this.props.nav.pop();
            callback()
        }
    }

    //注册回调
    registered()
    {
        let callback = this.props.regHandle ;
        if (callback)
        {
            // this.props.nav.pop();
            callback()
        }
       // this.props.navigation.navigate('RegisteredScene',{})
    }
    //验证码登录回调
    verCodeonPress()
    {
        let callback = this.props.verCodeonHandle;
        if (callback)
        {
            // this.props.nav.pop();
            callback()
        }
        //this.props.nav.navigate('VerCodeScene',{})
    }

    //忘记密码回调
    forgetpwd()
    {
        let callback = this.props.forgetpwdHandle ;
        if (callback)
        {
            callback();
        }

    }

    weChatLogin()
    {
        super.weChatLogin();
    }

    bindMobiliPhone() {
        let callback = this.props.bindMobilHandle ;
        if (callback)
        {
            callback();
        }
    }
}