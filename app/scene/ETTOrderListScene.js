/*
   zwx 2018/06/25 订单列表页
 */

import React, {Component} from 'react';
import {
    Platform,
    TouchableOpacity,
    Image,
    Text,
    View
} from 'react-native';
import ETTPerCenterSessionView from "../common/ETTPerCenterSessionView";
import {ETTDarkStatus} from "../common/ETTStatusBar";
import ETTPerCenterStyles from '../res/styles/ETTPerlCenterStyles';
import ETTRequestModel from "../mobx/ETTRequestModel";
import ETTURLConfig from "../res/values/ETTURLConfig";
import ETTNetworkUtil from "../utils/ETTNetworkUtil";
import * as BackHandler from "react-native/Libraries/Utilities/BackHandler.android";
import LogStyles from "../res/styles/ETTLogStyles";
import Toast, {DURATION} from 'react-native-easy-toast';
import LoadingAnimation from '../common/ETTLoadingAnimation';
import PersonalStyles from "../res/styles/ETTPersonalDataStyles";
import UserAgreementStyles from "../res/styles/ETTUserAgreementStyles";


export default class ETTOrderListScene extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSet: []
        }
    }

    componentDidMount() {
        this.fetchList();
    }


    render() {
        return (
            <View style={ETTPerCenterStyles.container}>
                <View style={UserAgreementStyles.main_user_header}>
                    <TouchableOpacity onPress ={()=>this.goback()} >
                        <Image style={ETTPerCenterStyles.top_header_back_image}
                               source={require('../res/images/km_back.png')}/>
                    </TouchableOpacity >

                    <Text style={PersonalStyles.title}>
                        订单列表
                    </Text>
                </View>
                < ETTPerCenterSessionView data={this.state.dataSet}
                                          didSelected={(info, navigation)=>this.cellCallBack(info, navigation)}
                                          moreCallBack={this.cellMoreCallBack}
                                          logoutCallBack={this.logoutCallBack}
                                          iconCallBack={this.iconCallBack}
                                          editInfoCallBack={this.editInfoCallBack}
                                          bindWechatCallBack={this.bindWechatCallBack}
                                          bindQQCallBack={this.bindQQCallBack}
                                          serviceCallBack={this.serviceCallBack}
                                          nav={this.props.navigation}
                />

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
    //返回
    goback()
    {
        this.props.navigation.pop();
    }

    cellCallBack(info, navigation) {
        if (info && info.item) {
            let status = info.item.status;

            // 待支付
            if (status === 10 || status === 13) {
                this.jumpToOrderDetail(status, info, navigation);
            }
        }
    }

    jumpToOrderDetail(status, info, navigation) {
        let currentGoodsId = info.item.goodses[0].goodsId
        navigation.navigate('OrderDetailScene', {
            title: '订单结算',
            goodsId: currentGoodsId,
            orderBody: info.item,
            callback: (data) => {
                console.log("callback" + data);
            }
        });
    }

    fetchList() {

        this.refs.loading._show(null)
        let rm = new ETTRequestModel();
        rm._method = 'GET';
        rm._path = ETTURLConfig.SERVICE_TRADING + ETTURLConfig.post_orders;
        rm._getInfo = rm.getTokenRequesetData();

        ETTNetworkUtil.post(rm).then((json) => {
            this.refs.loading._hiden()
            if (json.code === 1) {
                this.setState({
                    dataSet: json
                })
            } else {
            }
        }, (json) => {

        })
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
        this.props.navigation.popToTop();
        return true;
    };

}

