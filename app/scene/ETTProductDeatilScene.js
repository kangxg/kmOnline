/*
   徐梅娜 商品详情页
 */
import React, { Component } from 'react'
import {
    Platform,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    WebView,
    ListView,
    StatusBar,
    Animated,
    Easing, StyleSheet,
} from 'react-native'

import  Toast, {DURATION} from 'react-native-easy-toast';
import  ETTProductDeatilStyle from "../res/styles/ETTProductDeatilStyle";
import  Swiper from 'react-native-swiper';
import  homeStyle from "../res/styles/ETTHomeStyles";
import {scaleSize} from "../res/values/ETTInlineFuction";
import ETTCourseChooseView from '../common/ETTCourseChooseView';
import Web from 'react-native-webview2';
import RequestModel from "../mobx/ETTRequestModel";
import Network from "../utils/ETTNetworkUtil";
import NetResponseHelper from "../utils/ETTNetResponseHelper";
import NetworkUrl from "../res/values/ETTURLConfig";
import ETTDevice from "../res/values/ETTDevice";
import ETTColor from "../res/values/ETTColor";
import ETTCommendMealView from "../common/ETTCommendMealView";
import ETTBottomPayView from '../common/ETTBottomPayView';
import productDetailModel from '../common/productDeatil';
import activityModel from '../common/activity';
import mealsModel from '../common/meals';
import LogStyles from "../res/styles/ETTLogStyles";
import LoadingAnimation from '../common/ETTLoadingAnimation';
import ETTSubjectTimeList from '../common/ETTSubjectTimeList';
import {mockData} from '../common/mockData';
import courseChooseStyle from "../res/styles/ETTCourseChooseStyle";
import ETTNavigationBar from "../common/ETTNavBarCommon";
import backIcon from '../res/images/back.png';
import zhanfaIcon from '../res/images/zhuanfa2.png';
import {DataManager} from "../res/values/ETTConfig";
import {observer} from "mobx-react";
import  ETTModalLogView from '../common/ETTModalLogView';
import  ETTMediationView from '../common/ETTMediationView';
import * as BackHandler from "react-native/Libraries/Utilities/BackHandler.android";
@observer
export default class  ETTProductDeatilScene  extends   Component {

    payView:ETTBottomPayView
    showSelectPrice:string = '' // 显示选中组合后的价格
    zuhePrice:string = ''
    showSelectArr = [] // 显示选中组合后的选项
    describeArr = []// 存放描述图片的高度
    descriDic = {} // 存放描述图片的高度
    currentGoodsId = ''// 当前选中的哪个套餐或者规格选择
    currentItem = {} // 选中的规格
    currentItemBak = {} // 选中的规格备份
    changeScrollView: ScrollView
    bigScrollView:ScrollView


    // static defaultProps = {
    //     ...ScrollView.propTypes,
    //     windowHeight: 64,
    //     // header: <View></View>,
    //
    // };
    selectedState = {}



    constructor(props) {
        super(props)
        StatusBar.setBarStyle('dark-content')// black  light-content

        this.state = {
            show:false,
            dataSource:'',//productDetailModel.data,
            selectValue:'',
            showMealView:false,
            activityData:activityModel.data,
            reloadDescribeImage:false,
            mealData:mealsModel.data[0],
            showSelectMealView:false,
            changePrice:false,
            courseIntroduce:true,
            resourceDirectory:false,
            navOpacity:0,
            offset:new Animated.Value(0),
            height:0,
            // windowHeight: 64,//this.props.windowHeight,
            scrollY: new Animated.Value(0),
            isLogin:false,


        }

        console.log('我是ETTProductDeatilScene')

        console.log(productDetailModel.data)

    }

    componentWillMount(){

    }
    componentDidMount(){

        // 更改当前页面路由的参数，比如可以用来更新头部的按钮或者标题。
        // this.props.navigation.setParams({param:'i am the new param'})

        this.data = mockData

        // 网络请求
        this.productDetailRequest()
    }

    // 请求商品明细接口
    productDetailRequest(){

        // this.refs.loading._show(null);

        let {params} = this.props.navigation.state
        let goodsId = params.goodsesId? params.goodsesId : ''
        if(goodsId.length === 0){
            this.refs.toast.show('goodsId为空')
            // this.refs.loading._hiden()
            return
        }
        let requetModel = new RequestModel()
        requetModel._method = 'GET'
        requetModel._path = NetworkUrl.SERVICE_TRADING + NetworkUrl.goodses_detail + goodsId
        requetModel._bodyData = ""
        requetModel._getInfo = requetModel.getAvoidLoginTokenRequesetData();
        // requetModel.getTokenRequesetData()

        Network.requestWithToken(requetModel,(json)=>{
            let result = NetResponseHelper.responseJson(json)

            if(result.code != 1){
                // this.refs.loading._hiden()
                this.refs.toast.show(result.msg)
            }else{
                this.setState({
                    dataSource:result.data
                });

                this.getDescribeImageH()

                // 设置默认
                this.setDefaultGoods(result.data);
            }
        })

    }

    // 获取商品参加活动
    getProductActivity(item){

        let goodsId = item.goodsId? item.goodsId : ''
        if(goodsId.length == 0){
            this.refs.loading._hiden()
            this.setState({
                show: false,
            });
            return
        }


        let requetModel = new RequestModel()
        requetModel._method = 'GET'
        requetModel._path =  NetworkUrl.SERVICE_TRADING + NetworkUrl.goodses_detail + goodsId + '/activities'
        requetModel._bodyData = ""
        requetModel._getInfo =  requetModel.getAvoidLoginTokenRequesetData();
        // requetModel.getTokenRequesetData()

        Network.requestWithToken(requetModel,(json)=>{
            let result = NetResponseHelper.responseJson(json)
            this.refs.loading._hiden()
            if(result.code != 1){
                this.refs.toast.show(result.msg)
            }else{
                this.setState({
                    show: false,
                    activityData:result.data
                });
            }
        })
    }

    // 请求套餐详情
    requestMealData(item){


        let goodsId = item.goodsId? item.goodsId : ''
        if(goodsId.length == 0){
            this.setState({
                show: false,
            });
            this.refs.loading._hiden()
            return
        }


        let requetModel = new RequestModel()
        requetModel._method = 'GET'
        requetModel._path =  NetworkUrl.SERVICE_TRADING + NetworkUrl.goodses_detail + goodsId + '/packages'
        requetModel._bodyData = ""
        requetModel._getInfo =  requetModel.getAvoidLoginTokenRequesetData()
        // requetModel.getTokenRequesetData()

        Network.requestWithToken(requetModel,(json)=>{
            let result = NetResponseHelper.responseJson(json)
            this.refs.loading._hiden()
            if(result.code != 1){

                if(result.code == 3){// 没有数据

                }else{
                    this.refs.toast.show(result.msg)
                }

            }else{
                this.setState({
                    show: false,
                    showMealView: true,
                    mealData:result.data[0]
                });
            }
        })


    }

    // 显示选择规格界面
    _showGuiGeView(){
        this.setState({
            show:true
        })
    }

    // 选择课程组合后显示价格和选项  然后推荐套餐
    _showName(arr,item,isHidden) {
        this.currentItem = item
        this.showSelectArr = arr
        this.getProductActivity(item)
        this.requestMealData(item)

    }

    // 单单改变价格
    _changePrice(info){
        this.currentItem = info
        this.currentGoodsId = info.goodsId
        this.zuhePrice = info.marketPrice
        this.showSelectPrice = info.marketPrice
        this.setState({
            changePrice:true,
        })
    }

    // 显示选中的组合
    _reloadSelectName(){
        if (this.showSelectArr != undefined && this.showSelectArr.length > 0) {
            let str = ''
            this.showSelectArr.map((item, i) => {
                str += item + ' '
            })

            return str
        } else if (this.currentItem) {
            return this.currentItem.propertyName;
        }else{
            return  '无'
        }
    }



// 选项卡
    _courseChooseView(){
        if (this.state.show){
            return <ETTCourseChooseView info={this.state.dataSource}
                                        current={this.currentItem}
                                        onSave={this.onSaveChooseState.bind(this)}
                                        savedState={this.selectedState}
                                        showName={(arr,item,isHidden)=> this._showName(arr,item,isHidden)}
                                        changePrice={(info) => this._changePrice(info)}/>
        }
        return null
    }

// 顶部展示的图片
    _topShowImageView(){
        return <View style={ETTProductDeatilStyle.topViewStyle}>

            <Swiper
                style={{height:scaleSize(434)}}
                // loop={true}
                autoplay={true}
                autoplayTimeout={4}
                horizontal={true}
                paginationStyle={{bottom: 10}}
                showsButtons={false}
                showsPagination={false}
                dot={<View style={
                    homeStyle.bannerDotStyle
                }/>}
                activeDot={<View style={
                    homeStyle.bannerActiveDotStyle
                }/>}

            >

                <Image source={{uri:this.state.dataSource.mainPicture}} style={homeStyle.bannerImgStyle}/>
            </Swiper>

            {/*{this._showTopViewNoNavigation()}*/}
        </View>
    }

    // 没有导航栏的时候显示在图片上的
    _showTopViewNoNavigation(){

        return(

            <View style={{flexDirection:'row',justifyContent:'space-between',position:'absolute',width:ETTDevice.ScreenWidth}} ref={(ref)=>this.topView = ref}>
                <TouchableOpacity onPress={()=>{}}>
                    <Image source={require('../res/images/fanhui.png')} style={{marginTop:scaleSize(66),marginLeft:scaleSize(30),width:scaleSize(55),height:scaleSize(55)}}/>
                </TouchableOpacity>
                /*
                <TouchableOpacity onPress={()=>{}}>
                    <Image source={require('../res/images/zhuanfa.png')} style={{marginTop:scaleSize(66),marginRight:scaleSize(30),width:scaleSize(55),height:scaleSize(55)}}/>
                </TouchableOpacity>
                */

            </View>

        )
    }

    renderContainer() {
        const { windowHeight, scrollY } = this.state;
        // const {windowHeight, backgroundColor} = this.props.navigation.state;
        return (
            <View style={[styles.headerContainer, { height: windowHeight, }]}>
                <Animated.View
                    style={[styles.headerShade, {
                        height: 64,
                        backgroundColor: 'red',
                        opacity: scrollY.interpolate({
                            inputRange: [-windowHeight, 0, windowHeight*4],
                            outputRange: [0, 0, .5]
                        }),
                    }]}>
                </Animated.View>
                {/*<View style={{width:ETTDevice.ScreenWidth,height:windowHeight,position:'absolute',left:0,top:0}}>*/}
                {/*{this.props.navigation.state.params.header}*/}

                {/*</View>*/}
            </View>
        )
    }

    _leftItemAction() {
        console.log('左侧按钮点击了');
        alert('左侧按钮点击了')
    }

    _rightItemAction() {
        console.log('右侧按钮点击了');
        alert('右侧按钮点击了')
    }

    _scrollViewMethod = (e) => {

        var offsetY = e.nativeEvent.contentOffset.y

        console.log("offsetY===="+offsetY)
    }

    _startAnimation(){
        Animated.timing(this.state.opacity,{
            toValue:0,
            duration:500,
            easing:Easing.linear,
        }).start()

        Animated.timing()
    }

// 商品价格及详情
    _productDetailView(){

        var nameStr = this.state.dataSource.name ? this.state.dataSource.name:"商品名称为空"
        var descStr = this.state.dataSource.introduction ? this.state.dataSource.introduction:"描述为空"

        var plist
        if(this.state.dataSource.marketPrice.includes('-')){
            plist = this.state.dataSource.marketPrice.split('-')
        }else{
            plist = this.state.dataSource.marketPrice
        }

        var price:string = ''
        if(plist.length == 2) {
            price = '￥' + plist[0] + '~￥' + plist[1]
        }else{
            price = '￥' + plist
        }
        return <View style={ETTProductDeatilStyle.productDeatilViewStyle}>


            <Text style={ETTProductDeatilStyle.productNameStyle}
                  numberOfLines={2}
                // ellipsizeMode的取值为enum('head', 'middle', 'tail', 'clip') ,
                // 用来设定当文本显示不下全部内容时，文本应该如何被截断，需要注意的是，它必须和numberOfLines（文本显示的行数）搭配使用，才会发挥作用。
                  ellipsizeMode='tail'
            >
                {nameStr}
            </Text>
            <Text style={ETTProductDeatilStyle.productDescribeTopStyle}
            >
                {descStr}
            </Text>
            <Text style={ETTProductDeatilStyle.productPriceStyle}>
                {price}
            </Text>
        </View>
    }

    // 判断是否显示购买过的view
    showHaveBuyView(){
        if(this.currentItem != undefined){
            if(this.currentItem.isBuy == undefined || this.currentItem.isBuy == 0){
                return null
            }else {
                return  <View style={{width:ETTDevice.ScreenWidth,backgroundColor:'white'}}>
                    <Text style={{marginLeft:scaleSize(100),marginTop:scaleSize(20),color:ETTColor.f2,fontSize:scaleSize(20),marginBottom:scaleSize(24)}}>
                        已购买过
                    </Text>

                </View>
            }
        }
    }

    // 判断是否是单一商品，如果是不需要选择规格
    showHaveSelectView() {
        let bval;
        this.state.dataSource.properties.map(item=>{
            if (item.valueList) {
                bval = true;
            }
        });
        if(!bval){
            this.showSelectPrice = this.state.dataSource.shopPrice
            return null
        }else {

            return(


                <View style={ETTProductDeatilStyle.choiceItemBottomViewStyle}>

                    <TouchableOpacity onPress={()=>{
                        this._showGuiGeView()
                    }}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={ETTProductDeatilStyle.choiceItemHaveChoiceStyle}>
                                已选
                            </Text>
                            <Text style={ETTProductDeatilStyle.choiceItemSubjectStyle}>
                                {this._reloadSelectName()}
                            </Text>
                        </View>
                    </TouchableOpacity>



                    <TouchableOpacity onPress={()=>{ this._showGuiGeView() }}>
                        <View>
                            <Image style={ETTProductDeatilStyle.choiceItemImageStyle} source={require('../res/images/tab_c5.png')}/>
                        </View>

                    </TouchableOpacity>
                </View>

            )
        }
    }

    // 是否有优惠信息
    showOnSaleView(){

        let activityInfo:string = ''
        if (this.state.activityData.length == 0) {
            activityInfo = '奔驰会员享受8.5折优惠'
        } else {
            this.state.activityData.map((item, index) => {

                if(item.activityName === undefined){

                }else{
                    activityInfo += item.activityName + ' '
                }


            })

        }

        if(activityInfo === undefined || activityInfo.length === 0){

            return null
        }else{

            return(
                <View style={{flexDirection:'row'}}>
                    <View style={ETTProductDeatilStyle.choiceItemSaleViewStyle}>
                        <Text style={ETTProductDeatilStyle.choiceItemSaleTextStyle}>
                            优惠
                        </Text>
                    </View>
                    <Text style={ETTProductDeatilStyle.choiceItemSaleDescribeStyle}>
                        {activityInfo}
                    </Text>
                </View>

            )
        }


    }

// 选项栏
    _choiceItemView() {

        // 筛选优惠信息
        return <View style={ETTProductDeatilStyle.choiceItemViewStyle}>
            {this.showOnSaleView()}
            {this.showHaveSelectView()}
            {this.showHaveBuyView()}

        </View>
    }


    onMessage(e) {
        alert(1)//应该是我收到的消息
    }

    // 推荐套餐点击事件回调
    _mealDetailCallback(){
        this.currentItem = this.currentItemBak
        // this.currentItem = undefined
        this.showSelectPrice = this.currentItem.marketPrice
        this.currentGoodsId = this.currentItem.goodsId
        this.setState({
            showSelectMealView:false,
        })
    }

    _checkSelectMealDetail(){
        if(this.state.showSelectMealView === true) {
            return <ETTCommendMealView info={this.state.mealData} callback={() => this._mealDetailCallback()}/>
        }else {
            return null
        }
    }

    // 推荐套餐详情
    _checkMealDetail(){
        this.currentItemBak = this.currentItem
        this.currentItem = this.state.mealData
        this.showSelectPrice = this.currentItem.marketPrice
        this.currentGoodsId = this.currentItem.goodsId
        this.setState({
            showSelectMealView:true,
        })
    }

    _isShowHaveBugText(){
        if(this.state.mealData.isBuy === 0){
            return null
        }else {
            return <Text style={{color:ETTColor.f3,marginLeft:scaleSize(30),marginTop:scaleSize(30),marginBottom:scaleSize(30)}}>已购买过</Text>
        }
    }

    // 点击课程介绍切换视图
    _clickCourseIntroduce(){
        this.changeScrollView.scrollTo({x: 0});
        this.setState({
            courseIntroduce:true,
            resourceDirectory:false,

        })
    }

    // 点击资源目录切换视图
    _clickResourceDir(){
        this.changeScrollView.scrollToEnd({animated: true});
        this.setState({
            courseIntroduce:false,
            resourceDirectory:true,

        })
    }

    // 返回切换前后的字体状态
    _textStatue(statue){

        if(!statue){
            return {color:'#999999'}
        }else{
            return {color:'#333333'}
        }
    }


    // 套餐推荐
    _recommendedMeal(){

        if(this.state.showMealView === false){
            return (<View/>)
        }
        let goodsName = this.state.mealData.goodsName ? this.state.mealData.goodsName:''
        let showMeal = goodsName + ",套餐价" + this.state.mealData.marketPrice + "元,可节省" +  this.state.mealData.packageDiscount + "元"
        return <TouchableOpacity onPress={() => {this._checkMealDetail()}}>
            <View style={{flexDirection:'column',flex:1,width:ETTDevice.ScreenWidth,backgroundColor:'white',marginTop:scaleSize(18)}}>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:scaleSize(5)}}>
                    <Text style={{alignSelf:'center',justifyContent:'center',marginLeft:scaleSize(30)}}>{showMeal}</Text>
                    <Image style={ETTProductDeatilStyle.choiceItemImageStyle} source={require('../res/images/tab_c5.png')}/>
                </View>
                {this._isShowHaveBugText()}
            </View>
        </TouchableOpacity>

    }

    // 描述栏
    _describeItemView(){
        if( this.state.reloadDescribeImage == false){
            return
        }
        var imageArr = []

        this.state.dataSource.describes.map((item, index) => {


            let height = this.descriDic[item.picture]
            imageArr.push(<Image source={{uri:item.picture}}
                                 style={{width:ETTDevice.ScreenWidth,flex:1,height:height,resizeMode:'stretch'}}
                                 key={index}/>
            )

        })



        return <View style={{width:ETTDevice.ScreenWidth,flex:1,marginTop:scaleSize(18), marginBottom: scaleSize(50),flexDirection:'column'}}>

            <View style={{backgroundColor:'white',flex:1,width:ETTDevice.ScreenWidth,flexDirection:'column'}}>{imageArr}</View>

        </View>




    }

    // 获取描述图片的高度
    getDescribeImageH(){

        // this.refs.loading._hiden()

        if(this.describeArr.length != 0){
            this.describeArr = []
        }
        this.descriDic = {}

        this.state.dataSource.describes.map((item,index) => {

            Image.getSize(item.picture,(width,height) => {

                // this.describeArr.push(scaleSize(height))
                this.descriDic[item.picture] = scaleSize(height)
                if(index == this.state.dataSource.describes.length - 1){
                    this.setState({
                        // 获取描述图片的高度
                        reloadDescribeImage:true
                    })
                }

            })
        })


    }

// 支付栏
    _payForItemView(){
        return  <ETTBottomPayView
            ref={(ref)=>{this.payView = ref}}
            price={this.showSelectPrice}
            title={'立即购买'}
            callback={()=>this.jumpToOrderDeatil()}/>

    }




    modalLogView()
    {
        return (

            <ETTModalLogView   nav = {this.props.navigation} loginSuccess ={() => this.jumpToOrderDeatil()}/>
        );
    }


// 跳转到订单详情页
    jumpToOrderDeatil(){

        // 提交订单

        if(this.currentGoodsId){
            if(this.state.dataSource.properties.valueList === undefined){

            }else{

                this.refs.toast.show('请选择课程')
                this.refs.loading._hiden()
                return
            }

        }

        //判断有没有登陆
        if (DataManager._userModel._isLog == false) {
            // return this.modalLogView();
            this.setState({
                isLogin:true
            })

        }else {
            this.setState({
                isLogin:false
            })
            this.props.navigation.navigate('OrderDetailScene',{
                title:'订单结算',
                isVisible:false,
                goodsId:this.currentGoodsId,
                callback:(data)=>{
                    console.log("callback"+data);
                }
            });
        }



    }


    // scrollView的滑动方法
    _scrollViewScroll = (event) => {
        // console.log("scrolling",event.nativeEvent.contentOffset.y);
        const offsetY = event.nativeEvent.contentOffset.y;
        if (offsetY > 5) {
            this.setState({
                navOpacity: (offsetY - 5)/200
            });
        }else{
            this.setState({
                navOpacity: 0
            });
        };

    }

    // nav上左右图标的点击事件

    _backToFront() {
        let {goBack} = this.props.navigation;
        goBack()
    }

    _shareClick(){
        alert('分享')
    }


    mediationViewDidLoadHandle()
    {
        if(this.currentGoodsId.length>0)
        {
            this.jumpToOrderDeati();
        }

    }
    render(){

        if(this.state.isLogin == true && DataManager._userModel._isLog == false){
            return this.modalLogView()
        }else {
            if(this.state.reloadDescribeImage == false){
                return (<View style={ETTProductDeatilStyle.contain}>
                    <Toast
                        ref='toast'
                        style={LogStyles.reg_toast}
                        opacity={0.8}
                        position='top'
                        positionValue={200}
                    />
                    <LoadingAnimation ref='loading'/>
                </View>)
            }else {
                return(
                    <View style={ETTProductDeatilStyle.contain}>
                        {/*{this.renderContainer()}*/}
                        <ScrollView
                            ref={(scrollView) => { this.bigScrollView = scrollView }}
                            style={ETTProductDeatilStyle.scrollViewStyle}
                            automaticallyAdjustContentInsets={false}
                            scrollEventThrottle={16}
                            onScroll={ this._scrollViewScroll }
                            // onScroll={Animated.event(
                            //     [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
                            // )}

                        >


                            {this._topShowImageView()}
                            {this._productDetailView()}
                            {this._choiceItemView()}
                            {this._recommendedMeal()}
                            {this._describeItemView()}
                        </ScrollView>

                        <ETTNavigationBar style={{backgroundColor: 'transparent', position: 'absolute', width: ETTDevice.ScreenWidth}}
                                          leftImage={ require('../res/images/fanhui.png') }
                                          leftAction={  this._backToFront.bind(this)}
                                          rightImage={ zhanfaIcon }
                                          rightAction={  this._shareClick.bind(this)} />


                        <ETTNavigationBar style={{opacity: this.state.navOpacity}}
                                          title={'课程详情'}
                                          leftImage={ backIcon }
                                          leftAction={  this._backToFront.bind(this)}
                                          rightImage={ zhanfaIcon }
                                          rightAction={  this._shareClick.bind(this)} />


                        {this._payForItemView()}
                        {this._courseChooseView()}
                        {this._checkSelectMealDetail()}

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

                )

            }
        }



    }

    onSaveChooseState(index, state) {
        this.selectedState[index] = state;
    }


    componentWillMount() {
        console.log('willMount')
        if ('android' === Platform.OS) {
            console.log('willMount_end')
            BackHandler.addEventListener('handwareBackPress', this.onBackAndroid)
        }
    }

    componentWillUnmount() {
        console.log('willUnmount')
        if ('android' === Platform.OS) {
            console.log('willUnmount_end')
            BackHandler.removeEventListener('handwareBackPress', this.onBackAndroid)
        }
    }

    onBackAndroid = () => {
        console.log('willOnBack')
        this._backToFront();
        console.log('willOnBack_end')
        return true;
    };

    setDefaultGoods(data) {
        if (data && data.goodsList && data.goodsList.length > 0) {
            this.currentItem = data.goodsList[0]
            this.showSelectPrice = this.currentItem.marketPrice;
            this.currentGoodsId = this.currentItem.goodsId;
            this._showName(this.currentItem.propertyName.split(' '),this.currentItem,false)
            this.setDefaultSelectState(data)
        }
    }

    setDefaultSelectState(data, defaultGoods = this.currentItem) {
        if (data) {
            let goodsList = data.goodsList;
            if (goodsList && goodsList.length) {
                let stateArr = []
                this._populateState(data, stateArr);


                let propArr = defaultGoods.properties.split(';');

                for (let i = 0; i < propArr.length; i++) {
                    for (let j = 0; j < goodsList.length; j++) {
                        let theGoods = goodsList[j];
                        let propArrI = theGoods.properties.split(';')
                        if (theGoods.properties.includes(propArr[i])) {
                            // 对于选中商品的某一属性值，如果一个商品包含这个属性值，这个商品的所有属性值可选

                            for (let k = 0; k < propArrI.length; k++) {
                                if (k !== i) {
                                    stateArr[k]['enable_'+propArrI[k]] = true;
                                }
                            }
                            // 已选商品的被包含属性，选定
                            stateArr[i]['select_' + propArr[i]] = true;
                            stateArr[i]['enable_' + propArr[i]] = true;
                        }
                    }
                }
                this.selectedState = stateArr;
            }
        }
    }

    _populateState(data, stateArr) {
        for (let i = 0; i < data.properties.length; i++) {
            let propDefaultState = {}
            let prop = data.properties[i];
            let pid = prop.pid;
            for (let j = 0; j < prop.valueList.length; j++) {
                let vid = prop.valueList[j].vid;
                propDefaultState['enable_' + pid + ':' + vid] = false;
                propDefaultState['select_' + pid + ':' + vid] = false;
            }
            stateArr[i] = propDefaultState;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: '#fff',
    },
    headerContainer: {
        backgroundColor:'transparent',
        position: 'relative',
    },
    headerShade:{
        width: ETTDevice.ScreenWidth,
        position: 'absolute',
        top: 0,
        left: 0,
        height: 64,
    },
    backIconWrapper: {
        position: 'absolute',
        backgroundColor: 'transparent',
        top: scaleSize(20),
        left: scaleSize(20),
        justifyContent: 'center',
    },
    backIcon: {
        width: scaleSize(52),
        height: scaleSize(52),
    },

    shareIcon:{
        position: 'absolute',
        backgroundColor: 'transparent',
        top: scaleSize(56),
        right: scaleSize(30),
        justifyContent: 'center',
    }
});

/*
<TouchableOpacity onPress={this._shareClick.bind(this)}>
    <Image style={ styles.shareIcon } source={ require('../res/images/zhuanfa.png')}/>
</TouchableOpacity>

 */