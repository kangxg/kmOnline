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

    CheckBox,
    TouchableOpacity
} from 'react-native';

import { NavigationActions } from 'react-navigation'
import Toast, {DURATION} from 'react-native-easy-toast'
import  ETTDevice from '../res/values/ETTDevice';
import  {
    DataManager,
    AMOUNT_MAXLEGTH,
    REG_PWDMAXLENGTH,
    REG_CODEMAXLENGTH
}  from '../res/values/ETTConfig';

import  RegStyles from '../res/styles/ETTRegisteredStyle';

import  {ETTDarkStatus} from '../common/ETTStatusBar';
import  {ETTEditPhoneView,ETTEditPwdView,ETTEditCodeView} from '../common/ETTEditView';
import  ETTString  from '../res/values/ETTString';
import  ETTCheckbox from '../common/ETTCheckboxView';


import  LoadingAnimation from '../common/ETTLoadingAnimation';
import  Network from '../utils/ETTNetworkUtil';
import  NetworkUrl from '../res/values/ETTURLConfig';
import  NetResponseHelper from '../utils/ETTNetResponseHelper';
import RequestModel from '../mobx/ETTRequestModel';
import UserAgreementScene from "./ETTUserAgreementScene";
export default class  ETTRegisteredScene extends   Component
{
    constructor(props) {
        super(props);
        this.state = {
            isChecked: this.props.isChecked || false,
            amount:'',
            password:'',
            code:''
        };
    }
    render() {
        return(
            <View style={RegStyles.reg_Mian}>
                <ETTDarkStatus/>
                <View style={RegStyles.reg_body}>

                    <View style={RegStyles.reg_body_top} >
                        <TouchableOpacity style={RegStyles.reg_close_btn} onPress={()=>this.closeScene()}>
                            <Image style={RegStyles.reg_close_image}
                                   source={require('../res/images/km_back.png')}/>
                        </TouchableOpacity >

                        <Text style={RegStyles.reg_title}>
                            注册
                        </Text>
                        <ETTEditPhoneView placeholder = {ETTString.log_amount_placeholder}
                                          maxLength   = {AMOUNT_MAXLEGTH}
                                          changeHandle ={(text) =>this.amountViewHandle(text)}/>
                        <Text style={RegStyles.reg_line}/>
                        <ETTEditCodeView ref='editCode'
                                         placeholder = {ETTString.forgetamount_pwd_placeholder}
                                         maxLength   = {REG_CODEMAXLENGTH}
                                         changeHandle ={(text) =>this.codeChangehandle(text)}
                                         getCodeHandle ={()=>this.getCodelHandel()}/>
                        <Text style={RegStyles.reg_line}/>
                        <ETTEditPwdView placeholder = {ETTString.reg_pwd_placeholder}
                                        maxLength   = {REG_PWDMAXLENGTH}
                                        changeHandle ={(text) =>this.pwdViewHandle(text)}/>
                        <Text style={RegStyles.reg_line}/>
                        <View style={RegStyles.reg_readagreed}>
                            <ETTCheckbox  info={ {'styles':RegStyles.ETTCheckbox,
                                                  'checkedImage':ETTString.reg_readagreed_checkedImage,
                                                   'checkImage':ETTString.reg_readagreed_checkImage,
                                                   'isChecked':this.state.isChecked,

                                                 }}
                                          checkSelected ={(isSelected)=>this.readagreedSelected(isSelected)}/>
                            <Text style={RegStyles.reg_readagreed_title}>
                                {ETTString.reg_readagreed_title}
                            </Text>
                            <TouchableOpacity style={RegStyles.reg_readagreed_btn} onPress ={()=>this.toReadagreed()}>
                                <Text style={RegStyles.reg_readagreed_btn_text}>
                                    {ETTString.reg_readagreed_btn_text}
                                </Text>
                            </TouchableOpacity>

                        </View>

                        <TouchableOpacity style={RegStyles.reg_btn} onPress ={()=>this.toRegistered()}>
                            <Text style={RegStyles.reg_btn_text}>
                                注册
                            </Text>
                        </TouchableOpacity>


                    </View>
                    <View style={RegStyles.reg_body_bottom}>
                        <TouchableOpacity style={RegStyles.reg_bottom} onPress ={()=>this.closeScene()}>
                            <Text style={RegStyles.reg_bottom_left}>
                                已有账号?
                            </Text>
                            <Text style={RegStyles.reg_bottom_right}>
                                立即登录
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Toast
                    ref='toast'
                    style={RegStyles.reg_toast}
                    opacity={0.8}
                    position='top'
                    positionValue={200}
                />
                <LoadingAnimation ref='loading'/>
            </View>
        );

    }
    //ref={toast =>this._toast = toast} fadeInDuration={750} fadeOutDuration={1000}
    toReadagreed()
    {
        //alert('去读');
        this.props.navigation.navigate('UserAgreementScene',{})

    }
    /*
    *
     */
    readagreedSelected(isSelected)
    {
        //alert(isSelected);
        this.setState(
            {
                isChecked:isSelected,
            }
        );
       // alert('readagreedSelected');


    }
    /*
    *  注册按钮回调
     */
    toRegistered()
    {

        let pattern = /[a-zA-Z0-9_]{6,16}$/
        if (this.state.amount.length<1)
        {
            //alert('请输入手机号')
            this.refs.toast.show(ETTString.iphone_null_toast);
        }
        else  if(this.state.amount.length<AMOUNT_MAXLEGTH)
        {
            this.refs.toast.show(ETTString.iphone_len_toast);
        }
        else  if(this.state.code.length<1)
        {
            this.refs.toast.show(ETTString.code_null_toast);
        }
        else  if(this.state.password.length<1)
        {
            this.refs.toast.show(ETTString.pwd_null_toast);
        }
        else if (!isNaN(Number(this.state.password))) {
            this.refs.toast.show(ETTString.find_pwd_is_number)
        }
        else if (this.state.password.length < 6 || this.state.password.length > 16) {
            this.refs.toast.show(ETTString.find_pwd_6_16)
        }
        else if (!pattern.test(this.state.password)) {
            this.refs.toast.show(ETTString.find_pwd_is_wrong)
        }
        else  if(this.state.isChecked == false)
        {
            this.refs.toast.show(ETTString.read_conditions);
        }
        else
        {
            //alert(this.state.amount+','+this.state.code+','+this.state.password)
            this.refs.loading._show(null);
            let formData = new FormData();
            formData.append("phone",this.state.amount);
            formData.append("phoneCode",this.state.code);
            formData.append("password",this.state.password);

            let requetModel = new RequestModel();
            requetModel._method = 'POST';
            requetModel._path =  NetworkUrl.SERVICE_NAME_ACCOUNT + NetworkUrl.amount;
            requetModel._bodyData =  formData;
            requetModel._getInfo = requetModel.getAuthorizationFormRequesetData();

            // let url='http://gw5.bj.etiantian.net:42397/accounts';

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
                    this.refs.toast.show(ETTString.reg_successful);
                    DataManager.regSuccessful(json.data);
                    setTimeout ( () => this.closeScene(), 1000)

                    let {params} = this.props.navigation.state
                    let callback = params.loginSuccessBack;
                    if (callback)
                    {
                        callback()
                    }

                }
            },(json)=>{
                //TODO 处理请求fail
                this.refs.loading._hiden();
                console.log('请求错误'+err);
                let result = NetResponseHelper.requestFailJson(json);
                this.refs.toast.show(result.msg);
            })
        }


    }


    getCodelHandel()
    {
        if (this.state.amount.length<1)
        {
            //alert('请输入手机号')
            this.refs.toast.show(ETTString.iphone_null_toast);
        }
        else  if(this.state.amount.length<AMOUNT_MAXLEGTH)
        {
            this.refs.toast.show(ETTString.iphone_len_toast);
        }
        else {
            this.refs.loading._show(null);
            var arr = NetworkUrl.base_header;
            let requetModel = new RequestModel();
            requetModel._method = 'POST';
            requetModel._path =  NetworkUrl.SERVICE_NAME_SMS + NetworkUrl.registerCode;
            requetModel._bodyData =  'phone='+this.state.amount;
            requetModel._getInfo = requetModel.getAuthorizationRequesetData();
            Network.post(requetModel).then((json) => {
                //处理 请求结果
                console.log(json);
                this.refs.loading._hiden();
                let reslut = NetResponseHelper.responseJson(json)
                if (reslut.code !=1)
                {
                    this.refs.toast.show(reslut.msg);
                }
                else
                {
                    // alert('返回'+JSON.stringify(json));
                    this.refs.toast.show(ETTString.code_send_successful);
                    this.refs.editCode._countdownAction();
                }

            },(json)=>{
                //TODO 处理请求fail
                this.refs.loading._hiden();
                let result = NetResponseHelper.requestFailJson(json)
                this.refs.toast.show(result.msg);

            })

        }

    }
    codeChangehandle(text)
    {
        this.setState(
            {
                code:text,
            }
        );
    }
    amountViewHandle(text)
    {
        this.setState(
            {
                amount:text,
            }
        );
    }

    pwdViewHandle(text)
    {
        this.setState(
            {
                password:text,
            }
        );
    }
    closeScene()
    {

        this.props.navigation.pop();
        let {params} = this.props.navigation.state

        let callback = params.stackCloseHandle;
        if (callback)
        {
            callback();
        }
    }

}