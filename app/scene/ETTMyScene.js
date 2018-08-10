import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Modal,
    Alert,
    Image,
    TouchableOpacity,
    Button
} from 'react-native';
import {observer} from 'mobx-react';
import Communications from 'react-native-communications';
import Toast, {DURATION}  from 'react-native-easy-toast'

import  { NavigationActions } from 'react-navigation'

import  rootStyles from '../res/styles/ETTMainStyles';
import  ETTDevice from '../res/values/ETTDevice';
import {AMOUNT_MAXLEGTH, DataManager} from '../res/values/ETTConfig';
import  {ETTDarkStatus,ETTLightStatus} from '../common/ETTStatusBar';

import  ETTPerCenterStyles from '../res/styles/ETTPerlCenterStyles';


import  ETTModalLogView from '../common/ETTModalLogView';

import  ETTMediationView from '../common/ETTMediationView';

import LogStyles from "../res/styles/ETTLogStyles";


import  LoadingAnimation  from '../common/ETTLoadingAnimation';

import  Network           from '../utils/ETTNetworkUtil';
import  NetworkUrl        from '../res/values/ETTURLConfig';
import  NetResponseHelper from '../utils/ETTNetResponseHelper';
import  RequestModel      from "../mobx/ETTRequestModel";

//<ETTPerCenterListView data = {ETTPerCenterListData}/>
// < ETTPerCenterSessionView data = {ETTPerCenterListData}/>
@observer
export default class  ETTMyScene extends   Component
{
    static navigationOptions = ({ navigation }) => ({
        //${navigation.state.params.user} 是一个动态的参数，参数名为user
        title: `${navigation.state.params.title}`,
    });
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            animationType :'slide'
        }
    }
    componentDidMount(){
        // 网络请求

        // if (DataManager._userModel._isLog == true)
        // {
        //     this.requestUserInfo();
        // }

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
                //this.closeHandle();
            }
            //this.refs.loading._hiden();
           //this.refs.toast.show(reslut.msg);

        });
    }
    render() {

        if (DataManager._userModel._isLog == false)
        {
          return  this.modalLogView();
        }
        else
        {
          return  this.perCenterView()
        }
    }
    modalLogSuccessfulHandle(isLogsuccessful)
    {
        alert('denglu cheng gong');
    }
    modalLogView()
    {
        return (

            <ETTModalLogView   nav = {this.props.navigation} />
        );
    }
    //onPress={this.requestUserInfo()}
    perCenterView()
    {
        return(
            <View style={ETTPerCenterStyles.container} >
                <ETTDarkStatus/>
                <View style={ETTPerCenterStyles.top}>
                    <View style={ETTPerCenterStyles.top_header}>
                        <TouchableOpacity onPress ={()=>this.goback()} style={ETTPerCenterStyles.top_header_back}>
                            <Image style={ETTPerCenterStyles.top_header_back_image}
                                   source={require('../res/images/km_back.png')}/>
                        </TouchableOpacity >

                    </View>
                    <Image
                        source={require('../res/images/myinfo_icon_bg.png')} style={ETTPerCenterStyles.user_icon_btn}>

                    </Image>

                    <Text style={ETTPerCenterStyles.user_nickname}>
                         {
                           this.getNickname()
                         }
                        </Text>
                    <View style={ETTPerCenterStyles.user_amount}>
                        <Text style={ETTPerCenterStyles.user_amount_text}>{DataManager._userModel._phone}</Text>
                        <TouchableOpacity style={ETTPerCenterStyles.user_amount_ecit} onPress={()=>this.gersonalDataEditorHandle()}>
                            <Image style={ETTPerCenterStyles.user_amount_ecit_image}
                                   source={require('../res/images/amount_edit.png')}>
                            </Image>
                        </TouchableOpacity>
                    </View>

                </View>
                <TouchableOpacity onPress={()=>this.bindThirdAmountCallBack()}>
                    <View style={ETTPerCenterStyles.baseRow}>

                        <Text style={ETTPerCenterStyles.baseRowTitle}>关联账号</Text>
                        <View style={ETTPerCenterStyles.baseRowRight}>

                            {
                                this.getWechatBindImage()
                            }

                        </View>

                    </View>
                </TouchableOpacity>
                <View  style={ETTPerCenterStyles.row_line}/>
                <View style={ETTPerCenterStyles.baseRow}>
                    <Text style={ETTPerCenterStyles.baseRowTitle}>联系客服</Text>
                    <TouchableOpacity onPress={()=>this.serviceCallBack()}>
                        <Text style={ETTPerCenterStyles.baseRowContent}>400-661-6666</Text>
                    </TouchableOpacity>

                </View>

                <View  style={ETTPerCenterStyles.row_line}/>
                <TouchableOpacity style={ETTPerCenterStyles. row_only_title} onPress={()=>this.myOrderListCallback()}>
                    <Text style={ETTPerCenterStyles. baseRowTitle}>我的订单</Text>
                </TouchableOpacity>
                <View style ={ETTPerCenterStyles.footer}>
                    <View style ={ETTPerCenterStyles.footer_Logout}>
                        <TouchableOpacity onPress={()=>this.logoutCallBack()}>
                            <Text style ={ETTPerCenterStyles.footer_Logout_text}>
                                退出登录
                            </Text>
                        </TouchableOpacity>
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
               <ETTMediationView loadDidMountHandle = {()=>this.mediationViewDidLoadHandle()}/>
            </View>
        );



    }
    mediationViewDidLoadHandle()
    {
        if (DataManager._userModel._isLog == true)
        {
            this.requestUserInfo();
        }
    }
    getNickname()
    {

        if (DataManager._userModel._userName.length>0)
        {
            return  DataManager._userModel._userName;
        }
        return DataManager._userModel._phone;

    }
    getWechatBindImage()
    {
        //return(<View/>);
        if (DataManager._userModel._weChatisBinding == true )
        {
            return(<Image style={ETTPerCenterStyles.baseRowImage}
                          source={require('../res/images/myinfo_wechat.png')}/>) ;

        }
        else
        {
            return(<Image  style={ETTPerCenterStyles.baseRowImage}
                           source={require('../res/images/myinfo_wechat_unbind.png')}/>) ;


        }

    }
   /*
      <ETTPerCenterSessionView data = {ETTPerCenterListData}
                                          didSelected        = {()=>this.cellCallBack()}
                                          moreCallBack       = {()=>this.cellMoreCallBack()}
                                          logoutCallBack     = {()=>this.logoutCallBack()}
                                          iconCallBack       = {()=>this.iconCallBack()}
                                          editInfoCallBack   = {()=>this.editInfoCallBack()}
                                          bindWechatCallBack = {()=>this.bindWechatCallBack()}
                                          bindQQCallBack     = {()=> this.bindQQCallBack()}
                                          bindThirdCallback  = {()=> this.bindThirdAmountCallBack()}
                                          serviceCallBack    = {()=>this.serviceCallBack()}
    */
    //list cell 点击回调
    cellCallBack(item)
    {
        if(item)
        {
            alert(item.name+'订单类型：'+item.orderType);
        }
    }
    goback()
    {
        this.props.navigation.popToTop();
    }
    cellMoreCallBack()
    {
        alert('加载更多订单回调');
    }

    logoutCallBack()
    {
        DataManager.logOut();
        //this.props.navigation.pop();
    }
    //个人资料修改回调
    gersonalDataEditorHandle()
    {
        this.props.navigation.navigate('PersonalDataScene');
    }
    iconCallBack()
    {
        alert('更换头像回调');
    }

    editInfoCallBack()
    {
        // alert('编辑个人信息回调');
        this.props.navigation.navigate('ChangePwdScene');

    }
    bindWechatCallBack()
    {

    }

    bindQQCallBack()
    {
        // alert('绑定QQ回调');

    }
    bindThirdAmountCallBack()
    {
        this.props.navigation.navigate('BindThirdAmountScene');
    }
    serviceCallBack()
    {
        Communications.phonecall('400-661-6666', true)
    }
    userConfirmed()
    {
        // this.props.navigation.navigate('DetailScene');
        DataManager.logOut();
        // let   model = new ETTUserModel();
        // model.setName("Root.js");
        // DataManager.setUseModel(model);

    }

    myOrderListCallback() {
        this.props.navigation.navigate('OrderListScene', {
            isVisible: false,
            title:'我的订单',
        });
    }
}