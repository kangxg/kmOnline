/*
    用户登录 的 中间件视图
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
    Alert,
    TouchableOpacity, Animated,

} from 'react-native';
import { NavigationActions } from 'react-navigation'
import Toast, {DURATION} from 'react-native-easy-toast'

import  ETTDevice from '../res/values/ETTDevice';
import  {DataManager,AMOUNT_MAXLEGTH,REG_PWDMAXLENGTH}  from '../res/values/ETTConfig';
import  {ETTDarkStatus} from '../common/ETTStatusBar';

import  ETTString  from '../res/values/ETTString';


import ETTModalLogStyles from "../res/styles/ETTModalLogStyles";
//
// import {ETTUserLogType} from '../res/values/ETTEnum'
import  {ETTModalLogScene}  from '../scene/ETTLogScene';

export default class ETTModalLogView extends Component {

    loginCallBack

    constructor(props) {
        super(props);//这一句不能省略，照抄即可

        let callback = this.props.loginSuccess
        this.loginCallBack = callback


    }

    state = {
        visible: true,
        animationType :'slide'
    }

    render() {
        return (
            <View style={ETTModalLogStyles.container}>

                <Modal
                    animationType= {this.state.animationType}
                    visible={this.state.visible}
                    transparent={true}
                    onRequestClose = {()=>this.onRequestClose()}>

                    <ETTModalLogScene   closeHandle      = {()=>this.closeHandle()}
                                        forgetpwdHandle  = {()=>this.forgetPwdhandle()}
                                        verCodeonHandle  = {()=>this.verCodeHandle()}
                                        weChatHandle     = {()=>this.weChatHandle()}
                                        stackCloseHandle = {()=>this.stackCloseHandle()}
                                        regHandle        = {()=>this.regHandle()}
                                        bindMobilHandle  = {()=>this.bindMobiliPhoneNoHandle()}
                                        loginHandle      = {()=>this.loginCallBack()}
                    />
                </Modal>

            </View>

        );
    }
    onRequestClose()
    {

    }
     /*
        关闭按钮回调
      */
    closeHandle()
    {
        nav = this.props.nav;
        if (nav)
        {
            nav.pop();
        }
    }
    /*
     绑定手机号回调
   */
    bindMobiliPhoneNoHandle()
    {
        nav = this.props.nav;
        if (nav)
        {
            this.setState({visible:false,
                animationType :'none'})
            nav.navigate('ThirdLoginBindScene',{
                stackCloseHandle:()=>this.stackCloseHandle()
            });
        }
    }
    /*
      忘记密码回调
    */
    forgetPwdhandle()
    {

        nav = this.props.nav;
        if (nav)
        {
            this.setState({visible:false,
                animationType :'none'})
            nav.navigate('ForgetPwdScene',{
                stackCloseHandle:()=>this.stackCloseHandle()

            });
        }
        // this.props.navigation.navigate('ForgetPwdScene');
    }
    /*
      验证码登录回调
    */
    verCodeHandle()
    {
        nav = this.props.nav;

        if (nav)
        {
            this.setState({visible:false,
                animationType :'none'})
            nav.navigate('VerCodeScene',{
                stackCloseHandle:()=>this.stackCloseHandle(),
                loginSuccessBack      :()=> this.loginSuccessHandle()
            });
        }
    }
    /*
       注册回调回调
     */
    regHandle()
    {
        nav = this.props.nav;
        if (nav)
        {
            this.setState({visible:false,
                animationType :'none'})
            nav.navigate('RegisteredScene',{
                stackCloseHandle:()=>this.stackCloseHandle(),
                loginSuccessBack      :()=> this.loginSuccessHandle()
            });
        }
    }
    /*
      微信登录回调
    */
    weChatHandle()
    {

    }
    /*
      栈视图返回按钮点击回调
    */
    stackCloseHandle()
    {
        this.setState({visible:true,
            animationType :'none'})
    }
    _setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    loginSuccessHandle(){
        let callback = this.props.loginSuccess
        if(callback){
            callback()
        }
    }



    startShow=()=>{

    }
}