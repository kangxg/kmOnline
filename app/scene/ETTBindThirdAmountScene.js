/*
   康晓光 2018-4-16  登录后第三方 账号绑定
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    TouchableOpacity,
    SectionList,
    Modal,
    Alert
} from 'react-native';
import {observer} from 'mobx-react';
import * as wechat from "react-native-wechat";
import Toast, {DURATION} from 'react-native-easy-toast'
import  LoadingAnimation from '../common/ETTLoadingAnimation';
import { StackNavigator } from 'react-navigation';
import  BindThirdAmountStyles from '../res/styles/ETTBindThirdAmountStyles';
import  ETTDevice from '../res/values/ETTDevice';
import  {DataManager}  from '../res/values/ETTConfig';
import {ETTDarkStatus, ETTLightStatus} from '../common/ETTStatusBar';
import  ETTString  from '../res/values/ETTString';
import  {ETTEditPwdView,ETTEditPhoneCodeView} from '../common/ETTEditView';
import ETTBindAmountCell from '../common/ETTBindAmountCell';
import ETTRemoveBindModal from '../common/ETTModalView';
import {ETTAlertView,ETTBindAmountAlertView} from "../common/ETTAlertView";

import  ETTBindListData from '../mobx/bindAmont.json';
import PersonalStyles from "../res/styles/ETTPersonalDataStyles";
import ETTPerCenterStyles from "../res/styles/ETTPerlCenterStyles";


import RequestModel from "../mobx/ETTRequestModel";
import NetResponseHelper from "../utils/ETTNetResponseHelper";
import {ETTUserLogType} from "../res/values/ETTEnum";
import NetworkUrl from "../res/values/ETTURLConfig";
import Network from "../utils/ETTNetworkUtil";
import LogStyles from "../res/styles/ETTLogStyles";

@observer
export default class  ETTBindThirdAmountScene extends   Component

{
    // 构造
    listData:Array =[
        {
            "title":"购买记录",
            "data":[
                {
                    "name":"微信",
                    "amount":"去绑定",
                    "openId":"",
                    "bindingAppId":"",
                    "bindingId":""
                }
            ]
        }
    ];
    _modalView:ETTRemoveBindModal ;
    _alertView:ETTAlertView;
    constructor(props) {
        super(props);


        this.organizeThirdData();
            //ETTBindListData.bind_amount_data;
            //this.organizeThirdData();
        this.state = {
            sectionData:this.listData,
            isShowModal:false
        };
    }

    // componentWillMount(){
    //     this.organizeThirdData();
    //     //ETTBindListData.bind_amount_data;
    //     //this.organizeThirdData();
    //     this.state = {
    //         sectionData:this.listData,
    //         isShowModal:false
    //     };
    // }
    organizeThirdData() {

       // var arr = Object.keys(DataManager._userModel._weChatBinding);

        if (DataManager._userModel._weChatisBinding == false)
        {
            // let list = ETTBindListData.bind_amount_data
            // this.listData =  list;
            console.log(this.listData);
        }
        else
        {
            // this.listData = ETTBindListData.bind_amount_data
            for (let [index ,item] of this.listData[0].data.entries())
            {

                if (item.name == '微信')
                {
                    let weChatInfo = DataManager._userModel._weChatBinding;
                    if(weChatInfo)
                    {
                        item.amount =  weChatInfo.nickname;
                        item.openId =  weChatInfo.openId;
                        item.bindingAppId = weChatInfo.bindingAppId;
                        item.bindingId    = weChatInfo.bindingId;
                    }

                }

            }

        }


    }

    //头
    sectionComp = (section) => {

        return (
            <View style={BindThirdAmountStyles.sessionView}>

            </View>
        )
    }
    //行
    renderItem = (item) => {


        return (

            <ETTBindAmountCell data = {item.item} didSelected =  {(item)=>this.cellDidSelected(item)}/>
        )

    }
    _extraUniqueKey(item ,index){
        return "index"+index+item;
    }
    createAlertView()
    {
      return (
          <ETTBindAmountAlertView
            ref={alertView =>this._alertView = alertView}
            bindname ='微信:'
            nickname = 'PM大宋神'
            title = '微信绑定'
            cancel = '关闭'
            enter = '解绑'
            ensureCallback={(name) => this.alertEnterCallback(name)}
        />);
    }
    render() {
        return(
            <View style={PersonalStyles.container}>
                <ETTDarkStatus/>
                <View style={PersonalStyles.header}>
                    <TouchableOpacity onPress ={()=>this.goback()} >
                        <Image style={ETTPerCenterStyles.top_header_back_image}
                               source={require('../res/images/km_back.png')}/>
                    </TouchableOpacity >

                    <Text style={PersonalStyles.title}>
                        绑定账号
                    </Text>
                </View>

                <View style={BindThirdAmountStyles.body}>
                    <View style={BindThirdAmountStyles.body_top}>
                        <SectionList
                            ref='bindsectionList'
                            keyExtractor={this._extraUniqueKey}
                            style={BindThirdAmountStyles.list}
                            renderSectionHeader={(section)=>this.sectionComp(section)}
                            renderItem={(item)=>this.renderItem(item)}
                            sections={this.state.sectionData}
                            scrollEnabled={false}
                        />
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
                {this.createAlertView()}
            </View>
        );


    }
    goback()
    {
        this.props.navigation.pop();
    }
    showModal()
    {
        if(this.state.isShowModal)
        {

            return  <ETTRemoveBindModal />

        }
    }
    logout()
    {
        DataManager.logOut();
    }
    cellDidSelected(item)
    {
        if(item.bindingAppId.length<1)
        {
           this.wechatOpenBinding();
        }
        else
        {
            this._alertView.show(item);
        }

        // this.setState({
        //     isShowModal:true,
        // });
        //Alert.alert( '标题', '正文', [ {text:'确定',onPress:this.userConfirmed}, {text:'取消',onPress:this.userCanceled,style:'cancel'} ] );


       // return  <ETTRemoveBindModal/>

    }
    //解除绑定
    alertEnterCallback(info)
    {
        if (info == null)
        {
            return;
        }
        this.refs.loading._show(null);
        let requetModel = new RequestModel();
        requetModel._method = 'DELETE';
        requetModel._path =  NetworkUrl.SERVICE_NAME_ACCOUNT +NetworkUrl.third_unbind +'?bindingId='+info.bindingId
            +'&bindingAppId=' + info.bindingAppId +'&openId='+ info.openId;
        requetModel._bodyData = '';
            //'bindingId='+info.bindingId
            +'&bindingAppId=' + info.bindingAppId +'&openId='+ info.openId ;
        //formData;
        requetModel._getInfo = requetModel.getTokenRequesetData();

        Network.requestWithToken(requetModel,(json)=>{
            this.refs.loading._hiden();
            let reslut = NetResponseHelper.responseJsonForResult(json)
            this.refs.toast.show(reslut.msg);
            // this.refs.loading._hiden();
            if (reslut.code ==1)
            {
                DataManager.removeThirdAmountSuccessful(info.bindingAppId
                );
                this.resetThisListData();
            }

        });

    }

    resetThisListData()
    {
        for (let [index ,item] of this.listData[0].data.entries())
        {

            if (item.name == '微信')
            {
                item.amount =  '去绑定';
                item.openId =  '';
                item.bindingAppId = '';
                item.bindingId    = '';

            }

        }

        this.setState(
            {
                sectionData: this.listData,
            }
        );

    }
    wechatOpenBinding()
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
                        this.refs.toast.show('登录授权发生错误'+ err.message);
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
        requetModel._path =  'https://api.weixin.qq.com/sns/oauth2/access_token?appid='+NetworkUrl.wxAppid
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
                this.serverBindThirdAmount(json);
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
    serverBindThirdAmount(response)
    {

        let requetModel = new RequestModel();
        requetModel._path =  NetworkUrl.SERVICE_NAME_ACCOUNT +NetworkUrl.third_bind;
        requetModel._bodyData =  'bindingId='+response.unionid
            +'&bindingAppId=weixin'+'&openId='+ response.openid  +'&nickname='+ response.nickname
            +'&photoPath='+ response.headimgurl;
        requetModel._method = 'POST';
        //formData;
        requetModel._getInfo = requetModel.getTokenRequesetData();

        Network.post(requetModel).then((json) => {
            //处理 请求结果
            console.log(json);

            let reslut = NetResponseHelper.responseJsonForResult(json)
            // this.refs.loading._hiden();
            if (reslut.code ==1)
            {
                //let phone = reslut.data.phone;

                let amountInfo = {'userId':reslut.data.userId,'phone':DataManager._userModel._phone};
                DataManager.logSuccessful(null
                    ,ETTUserLogType.logWeChat,amountInfo);
                this.requestUserInfo();
                // if (phone == null || phone.length<11)
                // {
                //     //this.refs.loading._hiden();
                //     DataManager.thirdAmountLogSuccessful(JSON.parse(reslut.data)
                //         ,ETTUserLogType.logWeChat,amountInfo);
                //
                //     this.requestUserInfo();
                //
                // }
                // else
                // {
                //     DataManager.logSuccessful(JSON.parse(reslut.data.loginDetail)
                //         ,ETTUserLogType.logBindWechat,amountInfo);
                //     this.requestUserInfo();
                // }

            }
            else
            {
                this.refs.loading._hiden();
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
    requestUserInfo()
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
            // this.refs.loading._hiden();
            if (reslut.code ==1)
            {

                DataManager.obtainUserInfoSuccessful(json.data);
                this.updateBindInfo();
                //setTimeout ( () => this.go, 1000)
                //this.closeHandle();
            }
            this.refs.loading._hiden();
            // this.refs.toast.show(reslut.msg);

        });
    }
    updateBindInfo()
    {
        for (let [index ,item] of this.listData[0].data.entries())
        {

            if (item.name == '微信')
            {
                let weChatInfo = DataManager._userModel._weChatBinding;
                if(weChatInfo)
                {
                    item.amount =  weChatInfo.nickname;
                    item.openId =  weChatInfo.openId;
                    item.bindingAppId = weChatInfo.bindingAppId;
                    item.bindingId    = weChatInfo.bindingId;
                }

            }

        }

        this.setState(
            {
                sectionData: this.listData,
            }
        );
    }
    bindMobiliPhone() {
        this.props.navigation.navigate('ThirdLoginBindScene', {bindfinish:(state)=> this.bindPhoneFinish(state)})

    }
    bindPhoneFinish(state)
    {
        if (state == true && DataManager._userModel._weChatisBinding == true)
        {
            this.updateBindInfo();
        }
    }
    //
    /*
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
    <ETTEditPhoneCodeView placeholder = {ETTString.bindamount_placeholder}/>
    <Text style={LogStyles.log_line}/>
    <ETTEditPwdView placeholder = {ETTString.bindamount_pwd_placeholder}/>
    <Text style={LogStyles.log_line}/>
    <TouchableOpacity style={LogStyles.log_btn}>
        <Text style={LogStyles.log_btn_text}>
            绑定
        </Text>
    </TouchableOpacity>
    <TouchableOpacity style={LogStyles.log_bind_newreg_btn}>
        <Text style={LogStyles.log_bind_newreg_text}>
            注册新账号
        </Text>
    </TouchableOpacity>
*/

}