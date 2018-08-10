
import React, { Component,PureComponent } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    ListView,
    ScrollView, StatusBar,
} from 'react-native';

import  Toast, {DURATION} from 'react-native-easy-toast';
import  ETTDevice from '../res/values/ETTDevice';
import  {ETTLightStatus} from '../common/ETTStatusBar';
import  Swiper from 'react-native-swiper';
import  homeStyle from '../res/styles/ETTHomeStyles';
import  ETTHomeSimpleCell from '../common/ETTHomeSimpleCell';
import  {scaleSize} from "../res/values/ETTInlineFuction";
import NetworkUrl from "../res/values/ETTURLConfig";
import RequestModel from "../mobx/ETTRequestModel";
import Network from "../utils/ETTNetworkUtil";
import NetResponseHelper from "../utils/ETTNetResponseHelper";
import goodsesModel from '../common/goodses';
import LogStyles from "../res/styles/ETTLogStyles";
import LoadingAnimation from '../common/ETTLoadingAnimation';
import ETTProductDeatilScene from "./ETTProductDeatilScene";




export default class  ETTHomeScene extends   Component
{
    constructor(props) {
        super(props);

        StatusBar.setBarStyle('dark-content')

        var bz = new ListView.DataSource({
            rowHasChanged: (oldRow, newRow) => oldRow!==newRow
        });

        this.state = {
            beiziData:bz,
            zhihuiData:'',//zh.cloneWithRows(goodsesModel.data),
            showBenzi:false,
            show:false,
        }


        console.log("ETTHomeScene")
        console.log(goodsesModel.data)
    }


    componentDidMount(){
        // 网络请求
        this.homeDetailRequest()
    }

    componentWillMount(){
        // 网络请求
    }


    homeDetailRequest()
    {

        this.refs.loading._show(null);

        let requetModel = new RequestModel()
        requetModel._method = 'GET'
        requetModel._path = NetworkUrl.SERVICE_TRADING + NetworkUrl.goodses_list
        requetModel._bodyData = ""
        requetModel._getInfo =   requetModel.getAvoidLoginTokenRequesetData();
           // requetModel.getTokenRequesetData()

        Network.requestAvoidLoginWithToken(requetModel,(json)=>{
            let result = NetResponseHelper.responseJson(json)
            this.refs.loading._hiden()
            if(result.code != 1){
                this.refs.loading._hiden()
                this.refs.toast.show(result.msg)
            }else{
                var zh = new ListView.DataSource({
                    rowHasChanged: (oldRow, newRow) => oldRow!==newRow
                });
                this.setState({
                    show:true,
                    zhihuiData:zh.cloneWithRows(result.data),

                })
            }
        })


    }

    _keyExtractor = (item,index) => index;

    topView (){
        return <View style={homeStyle.bannerViewStyle}>
            {/*<ETTLightStatus/>*/}
            {/*<Image source={require('../res/images/avatar.png')} style={homeStyle.bannerImgStyle}/>*/}
            <Swiper
                style={{height:200,backgroundColor:"#F5F5F5"}} //样式  如果这里设置了宽度，显示的图片会有问题，这里不能设置swiper的宽度
                height={200}                   //组件高度
                loop={true}                    //如果设置为false，那么滑动到最后一张时，再次滑动将不会滑到第一张图片。
                autoplay={true}                //自动轮播
                autoplayTimeout={4}            //每隔4秒切换
                horizontal={true}              //水平方向，为false可设置为竖直方向
                paginationStyle={{bottom: 10}} //小圆点的位置：距离底部10px
                showsButtons={false}           //为false时不显示控制按钮
                showsPagination={false}       //为false不显示下方圆点
                dot={<View style={           //未选中的圆点样式
                    homeStyle.bannerDotStyle
                }/>}
                activeDot={<View style={   //选中的圆点样式
                    homeStyle.bannerActiveDotStyle
                }/>}

            >
                <Image source={require('../res/images/1.png')} style={homeStyle.bannerImgStyle}/>
                {/*{this.refs.loading._hiden()}*/}
            </Swiper>
        </View>
    }


    _showDeatilView(){
        if(this.state.showDeatil === true){
            return <ETTProductDeatilScene goodsesId={goodsesId}/>
            {/*<ETTProductDeatilScene*/}
                {/*backgroundColor:'red'*/}
                {/*goodsesId:goodsesId*/}
            {/*></ETTProductDeatilScene>*/}
        }else {
            return null
        }

    }

    // 奔驰会员跳转
    benziJumpDetail(goodsesId){
        // alert('点击奔驰')
        this.props.navigation.navigate('ProductDeatilScene',{
            title:'酷蒙在线',
            isVisible:false,
            goodsesId:goodsesId,
            callback:(data)=>{
                console.log("callback"+data);
            }
        });
    }

    // 智慧课堂跳转
    zhihuiJumpDetail(goodsesId){
        // alert('点击智慧课堂')
        this.props.navigation.navigate('ProductDeatilScene',{
            title:'酷蒙在线',
            isVisible:false,
            goodsesId:goodsesId,
            callback:(data)=>{
                console.log("callback"+data);
            }
        });

    }
    // 智慧课堂渲染cell
    zhihuiRenderRow = (rowData) => {
        let marketPrice = rowData.marketPrice
        var plist = ''
        if  (marketPrice.includes('-')){
            plist =  marketPrice.split('-')
        }else {
            plist = marketPrice
        }

        var price:string = ''
        if(plist.length == 2) {
           price = '￥' + plist[0] + '~￥' + plist[1]
        }else{
            price = '￥' + plist
        }

        return <TouchableOpacity
            onPress={(goodsesId) => {this.zhihuiJumpDetail(rowData.goodsesId)}}
        >
        <ETTHomeSimpleCell title={rowData.name}
                                  isShowPrice={true}
                                  introduc={rowData.introduction}
                                  itemId={rowData.goodsesld}
                                  mainPicture={rowData.mainPicture}
                                  price={price}
                                  key={this._keyExtractor}

        />
        </TouchableOpacity>
    }


    zhihuiCourseStyle(){
        if(this.state.showBenzi == true) {
            return {marginTop: scaleSize(5), flex: 1, flexDirection: 'column', backgroundColor: 'white'}
        }
        return {flex:1,flexDirection:'column',backgroundColor:'white'}
    }
    // 智慧课堂视图
    zhihuiCourse(){

        return <View style={this.zhihuiCourseStyle()}>
            <Image style={{marginTop:scaleSize(15),marginLeft:scaleSize(15),width:ETTDevice.ScreenWidth - scaleSize(15)*2,resizeMode:'stretch',height:scaleSize(160)}} source={require('../res/images/3.png')}/>
            <ListView
                dataSource={this.state.zhihuiData}
                renderRow={(rowData) => this.zhihuiRenderRow(rowData)}
            />
        </View>
    }

    // 奔驰会员渲染cell
    benziRenderRow = (rowData) => {

        return <ETTHomeSimpleCell title={rowData.courseName}
                                  isShowPrice={false}
                                  introduc={rowData.introduction}
                                  itemId={rowData.goodsesld}
                                  onPress={(courseId) => {this.benziJumpDetail(rowData.courseId)}}

        />
    }


    // 奔驰会员专享课程视图
    benziMembersCourse(){
        if (this.state.showBenzi == false){
            return <View/>
        }
        let introduction = this.state.beiziData.introduction ?  this.state.beiziData.introduction:'Mercedes me 车主俱乐部联合北京四中网校，为会员打造精品课程，让会员孩子赢在起点。'
        return <View style={{flexDirection:'column',flex:1,backgroundColor:'#fff',width:ETTDevice.ScreenWidth,backgroundColor:'white'}}>
            <View style={{flexDirection:'cloumn',width:ETTDevice.ScreenWidth,marginTop:scaleSize(20)}}>
                <View style={{flexDirection:'row'}}>
                    <View style={{backgroundColor:'blue',width:scaleSize(2),height:scaleSize(10),marginLeft:scaleSize(10)}}>
                    </View>
                    <Text style={{marginLeft:scaleSize(8),fontSize:20,color:'#000'}}>
                        奔驰会员专享课程
                    </Text>
                </View>
                <Text style={{marginLeft:scaleSize(20),marginTop:scaleSize(10),marginRight:scaleSize(20),fontSize:14}}>
                    {introduction}
                </Text>
            </View>

            <ListView
                dataSource={this.state.beiziData}
                renderRow={(rowData) => this.benziRenderRow(rowData)}
            />


            <TouchableOpacity
                onPress={()=>{
                    alert("我是查看更多")
                }}>
            <View style={{flexDirection:'column',height:scaleSize(80)}}>
                <View style={{backgroundColor:'grey',height:scaleSize(0.5)}}/>

                    <Text style={{color:'blue',alignSelf:'center',width:scaleSize(80),justifyContent:'center',alignItems:'center'}}>查看更多 > </Text>

            </View>
            </TouchableOpacity>


        </View>
    }

    render() {

        if(this.state.show == false){
            return(<View>
                <Toast
                    ref='toast'
                    style={LogStyles.reg_toast}
                    opacity={0.8}
                    position='center'
                    positionValue={400}
                />
                <LoadingAnimation ref='loading'/>
            </View>)
        }else{
             // if(this.state.showDeatil){
             //     return(
             //         <View>{this._showDeatilView()}</View>
             //
             //     )
             // }else{
                 return (



                     <ScrollView style={{flex:1,width:ETTDevice.ScreenWidth}}>

                         {/*头部的图*/}
                         {this.topView()}
                         {/*{this.benziMembersCourse()}*/}
                         {this.zhihuiCourse()}
                         <Toast
                             ref='toast'
                             style={LogStyles.reg_toast}
                             opacity={0.8}
                             position='center'
                             positionValue={200}
                         />
                         <LoadingAnimation ref='loading'/>


                     </ScrollView>





                 )
             // }

        }


    }

}
