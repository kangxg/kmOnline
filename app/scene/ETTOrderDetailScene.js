/*
   徐梅娜 订单详情页
 */
import React, {Component} from 'react';
import {Alert, Image, Modal, Platform, ScrollView, StatusBar, Text, View} from 'react-native';

import Toast from 'react-native-easy-toast';
import LoadingAnimation from '../common/ETTLoadingAnimation';
import orderDeatilStyle from "../res/styles/ETTOrderDetailStyle";
import ETTColor from '../res/values/ETTColor';
import ETTBottomAnimation from "../common/ETTBottomAnimation";
import Pinggg from 'pingpp-react-native';
import Network from '../utils/ETTNetworkUtil';
import NetworkUrl from '../res/values/ETTURLConfig';
import NetResponseHelper from '../utils/ETTNetResponseHelper';
import ETTBottomPayView from '../common/ETTBottomPayView';
import RequestModel from "../mobx/ETTRequestModel";
import LogStyles from "../res/styles/ETTLogStyles";
import ETTPayFinishView from "../common/ETTPayFinishView";
import MyScene from "./ETTMyScene";
import * as BackHandler from "react-native/Libraries/Utilities/BackHandler.android";


export default class ETTOrderDetailScene extends Component {

    // orderData
    goodesName = ''
    payResultType = 1

    constructor(props) {
        super(props)
        StatusBar.setBarStyle('dark-content')// black  light-content

        this.state = {
            show: false,
            orderData: '',
            paymentMethods: '',
            modalVisible: false,
        }
        // this.orderData = ''


        console.log('我是ETTOrderDetailScene')
    }


    componentDidMount() {
        // 网络请求
        this.orderDetailRequest()
    }


    // 获取订单详情页数据
    orderDetailRequest() {


        let {params} = this.props.navigation.state
        let goodsId = params.goodsId;
        let orderBody = params.orderBody;
        if (orderBody) {
            this.setState({
                orderData: orderBody
            })
            return;
        }

        let requetModel = new RequestModel()
        requetModel._method = 'POST'
        requetModel._path = NetworkUrl.SERVICE_TRADING + NetworkUrl.post_orders
        requetModel._bodyData = 'goodsIds=' + goodsId
        requetModel._getInfo = requetModel.getTokenRequesetData()

        Network.requestWithToken(requetModel, (json) => {
            let result = NetResponseHelper.responseJson(json)
            this.refs.loading._hiden()
            if (result.code != 1) {

                if (result.code == 3) {// 没有数据

                } else {
                    this.refs.toast.show(result.msg)
                }

            } else {
                this.setState({
                    orderData: result.data
                })
            }
        })
    }

    // 获取支付渠道
    getPayChnnel() {

        let requetModel = new RequestModel()
        requetModel._method = 'GET'
        requetModel._path = NetworkUrl.SERVICE_PAY + NetworkUrl.pay_getChannel + '?typeId=3'
        requetModel._bodyData = ''
        requetModel._getInfo = requetModel.getTokenRequesetData()

        Network.requestWithToken(requetModel, (json) => {
            let result = NetResponseHelper.responseJson(json)
            this.refs.loading._hiden()
            if (result.code != 1) {

                if (result.code == 3) {// 没有数据

                } else {
                    this.refs.toast.show(result.msg)
                }

            } else {

                let pay1 = ''
                let pay2 = ''
                let arr = result.data.paymentMethods
                if (arr != undefined) {
                    arr.map((item, i) => {
                        if (i == 0) {
                            pay1 = item.methodName
                        } else if (i == 1) {
                            pay2 = item.methodName
                        }
                    })
                }

                this.refs.bottomAnimation.showView('请选择支付方式', pay1, pay2, null)

            }
        })
    }

    // 选择支付方式开始发送支付请求
    postPay(channelName) {

        // 开启调试模式

        this.refs.loading._show(null)
        let requetModel = new RequestModel()
        requetModel._method = 'POST'
        requetModel._path = NetworkUrl.SERVICE_PAY + NetworkUrl.pay//  '智慧课堂(初中)'
        requetModel._bodyData = 'channel=' + channelName + '&orderNum=' + this.state.orderData.orderId + '&amount=' + this.state.orderData.amount + '&subject=' + this.goodesName + '&body=' + this.goodesName
        requetModel._getInfo = requetModel.getTokenRequesetData()

        Network.requestWithToken(requetModel, (json) => {
            let result = NetResponseHelper.responseJson(json)

            if (result.code != 1) {

                this.refs.loading._hiden()
                if (result.code == 3) {// 没有数据

                } else {
                    this.refs.toast.show(result.msg)
                }

            } else {

                let obj = this;

                if (Platform.OS === 'android') {
                    let charge = JSON.stringify(result.data);
                    Pinggg.createPayment(
                        charge,
                        function (result) {

                            obj.refs.bottomAnimation.hiddenView();

                            var res = JSON.parse(result);
                            var pay_result = res.pay_result;
                            var error_msg = res.error_msg;
                            var extra_msg = res.extra_msg;
                            obj.refs.loading._hiden()
                            if (pay_result === 'cancel') {

                                console.log("用户取消支付");
                            }
                            else {
                                obj.paySuccessCallBack(pay_result)
                            }
                        }
                    )
                } else {
                    obj.refs.loading._hiden()// iOS
                    Pinggg.createPayment({
                            "object": result.data,
                            "scheme": "wx24d51f92c3998b20"
                        }, function (res, error) {

                            obj.refs.bottomAnimation.hiddenView();
                            let result = JSON.stringify(error)
                            console.log(res);

                            if (res == 'cancel') {

                                console.log("用户取消支付");
                            }
                            else {
                                obj.paySuccessCallBack(res)
                            }
                        }
                    )
                }

            }
        })

    }


    // 支付后调用使订单列表中的数据状态显示正常
    paySuccessCallBack(res: string) {

        this.refs.loading._show(null)
        let requetModel = new RequestModel()
        requetModel._method = 'GET'
        requetModel._path = NetworkUrl.SERVICE_PAY + NetworkUrl.pay_callBack + '?orderNum=' + this.state.orderData.orderId
        requetModel._bodyData = ''
        requetModel._getInfo = requetModel.getTokenRequesetData()

        Network.requestWithToken(requetModel, (json) => {
            let result = NetResponseHelper.responseJson(json)
            this.refs.loading._hiden()
            if (result.code != 1) {

                if (result.code == 3) {// 没有数据

                } else {
                    this.refs.toast.show(result.msg)
                }

            } else {

                this.payResultType = (res === 'success') ? 1 : 2
                this.setState({
                    modalVisible: true,
                })

            }
        })


    }


    // 用户名View
    _userNameView() {
        return <View style={orderDeatilStyle.userTopViewStyle}>
            <Text style={orderDeatilStyle.userNameTitleStyle}>
                {this.state.orderData.userName}
            </Text>
            <Text style={orderDeatilStyle.userNameStyle}>
                手机号:{this.state.orderData.phone}
            </Text>
        </View>
    }


    // 根据商品类型是否返回商品名字
    _productTypeView() {
        for (let [index, item] of this.state.orderData.goodses.entries()) {
            this.goodesName = item.goodsName
            if (item.type == 1) {// 单个商品

                return null
            } else { // 套餐商品

                return <Text style={orderDeatilStyle.orderName}>
                    {item.goodsName}
                </Text>


            }
        }
    }

    _productAllSubView() {
        let productArr = [] // 存储商品
        let item
        for (let [index, a] of this.state.orderData.goodses.entries()) {
            item = a
        }
        let unit = item.units
        for (let [index, subItem] of unit.entries()) {
            productArr.push(
                <View style={{flexDirection: 'row'}} key={(item, index) => index}>
                    <Image style={orderDeatilStyle.middleLeftImageStyle} source={{uri: subItem.pictures}}/>
                    <View style={orderDeatilStyle.middleRightViewStyle}>
                        <Text style={orderDeatilStyle.middleProductNameStyle}
                              numberOfLines={2}
                              ellipsizeMode='tail'//tail：在末尾...省略（默认值）
                        >
                            {subItem.skuName}
                        </Text>
                        <Text style={orderDeatilStyle.middleProductDesStyle}>
                            {subItem.propertyName}
                        </Text>
                        <Text style={orderDeatilStyle.middleProductPriceStyle}>
                            ￥{subItem.marketPrice}
                        </Text>
                    </View>
                </View>
            )
        }
    }

    // 商品详情
    _productView() {


        let productArr = [] // 存储商品
        let item
        for (let [index, a] of this.state.orderData.goodses.entries()) {
            item = a
        }

        for (let [index, subItem] of item.units.entries()) {
            productArr.push(
                <View style={{backgroundColor: 'white', flexDirection: 'row'}} key={index + 10010}>
                    <Image style={orderDeatilStyle.middleLeftImageStyle} source={{uri: subItem.pictures}}/>
                    <View style={orderDeatilStyle.middleRightViewStyle}>
                        <Text style={orderDeatilStyle.middleProductNameStyle}
                              numberOfLines={2}
                              ellipsizeMode='tail'//tail：在末尾...省略（默认值）
                        >
                            {subItem.skuName}
                        </Text>
                        <Text style={orderDeatilStyle.middleProductDesStyle}>
                            {subItem.propertyName}
                        </Text>
                        <Text style={orderDeatilStyle.middleProductPriceStyle}>
                            ￥{subItem.marketPrice}
                        </Text>
                    </View>
                </View>
            )
        }


        return <View style={orderDeatilStyle.middleProductViewStyle}>

            <View style={orderDeatilStyle.orderInfoView}>
                <Text style={orderDeatilStyle.orderSerialNumber}>
                    订单编号:{this.state.orderData.orderId}
                </Text>
                <Text style={orderDeatilStyle.orderTime}>
                    {this.state.orderData.orderTime}
                </Text>
            </View>
            <View style={orderDeatilStyle.lineStyle}/>

            {this._productTypeView()}
            <View>

                {productArr}
            </View>


        </View>
    }

    // 订单详情
    _orderView() {
        let activityArr = []
        let arr: [] = this.state.orderData.activitDiscounts
        if (arr == undefined) {
            activityArr.push(<Text style={orderDeatilStyle.youhuiLeftTitleStyle} key={(item, index) => index}>
                无
            </Text>)
        } else {
            this.state.orderData.activitDiscounts.map((item, i) => {
                activityArr.push(
                    <Text style={orderDeatilStyle.youhuiLeftTitleStyle} key={i + 666}>
                        {item.activityName}
                    </Text>
                )
            })
        }

        return <View style={orderDeatilStyle.bottomViewStyle}>

            <View style={orderDeatilStyle.bottomFirstItemViewStyle}>

                <View style={orderDeatilStyle.bottomItemViewStyle}>
                    <Text style={orderDeatilStyle.bottomLeftTitleStyle}>
                        总价:
                    </Text>
                    <View style = {{ justifyContent:'space-between',
                        flexDirection:'row',}}>
                        <Text style={orderDeatilStyle.marketMoneyStyle}>
                            原价￥{this.state.orderData.marketMoney}
                        </Text>
                        <Text style={[orderDeatilStyle.bottomRightTitleStyle, {color: ETTColor.c3}]}>
                            ￥{this.state.orderData.amount}
                        </Text>
                    </View>

                </View>

            </View>
            <View style={orderDeatilStyle.lineStyle}/>


            <View style={{backgroundColor: 'white'}}>
                <View style={orderDeatilStyle.bottomItemViewStyle}>
                    <View style={{flexDirection: 'row',justifyContent: 'center'}}>
                        <Text style={orderDeatilStyle.youhuiLeftStyle}>
                            优惠:
                        </Text>
                        {activityArr}
                    </View>

                    <Text style={orderDeatilStyle.bottomRightTitleStyle}>
                        可优惠{this.state.orderData.reduceMoney}
                    </Text>

                </View>
            </View>
            <View style={orderDeatilStyle.lineStyle}/>


            <View style={orderDeatilStyle.bottomItemViewStyle}>
                <Text style={orderDeatilStyle.bottomLeftTitleStyle}>
                    实付总额:
                </Text>
                <Text style={[orderDeatilStyle.bottomRightTitleStyle, {color: ETTColor.c3}]}>
                    ￥{this.state.orderData.amount}
                </Text>

            </View>


        </View>

    }

    // 支付栏
    _payForItemView() {
        return <ETTBottomPayView
            price={this.state.orderData.amount}
            title={'确认支付'}
            callback={() => this._showPayResultView()}/>
    }


    _callBack() {
        this.setState({
            show: false
        })
    }

    _choosePayWay(msg) {
        // 开启调试模式
        var channel = ''

        if (msg == '支付宝') {
            channel = 'alipay'
        } else if (msg == '微信') {
            channel = 'wx'
        }

        this.setState({
            show: false,

        })
        // 开始进行网络请求
        this.postPay(channel)

    }

    pay(channel) {
        Network.post()
    }

    _showPayResultView() {
        console.log('_showPayResultView')

        // 获取支付方式
        this.setState({
            show: true
        })
    }

    _showPayFinishView() {
        if (this.state.modalVisible === true) {
            return <ETTPayFinishView type={this.payResultType}
                                     courseName={this.goodesName}
                                     callback={() => {
                                         this._clickModal()
                                     }}/>
        } else {
            return null
        }
    }

    _showPayView() {
        if (this.state.show) {
            this.getPayChnnel()

        }
    }

    // 支付完成后弹出点击模态视图按钮的回调  去订单列表页面
    _clickModal() {
        this.setState({
            modalVisible: false,
        })


        this.props.navigation.navigate('OrderListScene', {
            title: '我的订单',
            callback: (data) => {
                console.log("我是OrderListScene的返回事件" + data);
                this.props.navigation.navigate('MyScene', {
                    callback: (data) => {
                        console.log("callback" + data);
                    }
                });
            }
        });

    }


    render() {


        if (this.state.orderData.length == 0) {
            return (<View>
                <Toast
                    ref='toast'
                    style={LogStyles.reg_toast}
                    opacity={0.8}
                    position='center'
                    positionValue={300}
                />
                <LoadingAnimation ref='loading'/>
            </View>)
        } else {
            return (
                <View style={orderDeatilStyle.contain}>
                    <ScrollView style={orderDeatilStyle.scrollContain}
                                keyboardDismissMode='on-drag'// 用户拖拽滚动视图的时候，是否要隐藏软键盘
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                                ref='scrollView'
                    >

                        {this._userNameView()}
                        {this._productView()}
                        {this._orderView()}


                    </ScrollView>

                    {this._payForItemView()}


                    <Modal
                        visible={this.state.modalVisible}
                        onRequestClose = {()=>this.onBackAndroid()}
                    >

                        {this._showPayFinishView()}

                    </Modal>

                    {this._showPayView()}

                    <ETTBottomAnimation
                        ref='bottomAnimation'
                        callback={(msg) => this._choosePayWay(msg)}

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

            )
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
        Alert.alert(
            '确认要离开收银台？',
            '您的订单在24小时内未支付将被取消\n请尽快完成支付',
            [
                {text: '继续支付', onPress: () => console.log('继续支付 Pressed!')},
                {
                    text: '确认离开', onPress: () => {
                        console.log('离开 Pressed!')
                        let {goBack} = this.props.navigation;
                        goBack()
                    }
                }
            ],
        )
        return true;
    };


}