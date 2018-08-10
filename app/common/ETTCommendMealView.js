/*
   徐梅娜 推荐套餐展示页
 */
import React, { Component } from 'react';
import {
    View,
    TouchableHighlight,
    TouchableOpacity,
    Animated,
    Easing,
    ScrollView,
    Text,
    Image,
    FlatList,
    ListView,
    Dimensions, Platform
} from 'react-native';

import courseChooseStyle from '../res/styles/ETTCourseChooseStyle';
import {scaleSize} from "../res/values/ETTInlineFuction";
import RequestModel from "../mobx/ETTRequestModel";
import Network from "../utils/ETTNetworkUtil";
import NetResponseHelper from "../utils/ETTNetResponseHelper";
import NetworkUrl from "../res/values/ETTURLConfig";
import mealsModel from '../common/meals';
import ETTDevice from "../res/values/ETTDevice";
import ETTColor from "../res/values/ETTColor";
import * as StatusBarManager from "react-native/Libraries/Components/StatusBar/StatusBar";


const {width, height} = Dimensions.get('window');

export default class ETTCommendMealView extends Component {



    constructor(props){
        super(props)
        console.log('ETTCommendMealView')
        this.state={
            offset:new Animated.Value(0),
            opacity:new Animated.Value(0),
            hide:true,
            dataSource:mealsModel.data
        };


    }


    _callBack(){
        this.out()
        let callBack=this.props.callback;
        if (callBack){
            callBack();
        }
    }

    componentWillMount(){
        console.log('ETTCommendMealView')
        this.setState(
            {
            hide:false
            },
            this.in);
    }

    componentDidMount(){
     // this.requestData()
    }

    requestData(){
        let goodsId = this.props.goodsesId ? this.props.goodsesId : ''
        if (goodsId.length == 0){
            alert('参数为空')
        }else{
            let requetModel = new RequestModel()
            requetModel.Path =  NetworkUrl.SERVICE_TRADING + NetworkUrl.goodses_detail + goodsId + '/packages'
            requetModel.BodyData = ""
            requetModel.getInfo = requetModel.getAuthorizationRequesetDataGetWay()

            Network.getForm(requetModel).then((json) => {
                let result = NetResponseHelper.responseJson(json)
                alert(json)
                if (result.code != 1){

                }else{
                    this.setState({
                        dataSource:result.data.packages
                    });
                }
            },(json)=>{
                let result = NetResponseHelper.requestFailJson(json)
                alert(result.msg)
            })
        }

    }

    render(){
        if(this.state.hide){
            return(<View/>)
        }else{

            let imgArr = []
            let skuNameArr = []
            for (let [index,item] of this.props.info.units.entries()){
                let price = '￥' +  item.marketPrice?item.marketPrice:0
                imgArr.push(<Image key={index + 10086} source={{uri:item.pictures}} style={{width:scaleSize(186),height:scaleSize(168),marginTop:scaleSize(48),marginLeft:scaleSize(33),borderRadius:4}}/>)
                skuNameArr.push(<View style={{justifyContent:'space-between',width:ETTDevice.ScreenWidth,flexDirection:'row'}} key={index}>
                    <Text style={{marginTop:scaleSize(36),marginLeft:scaleSize(30),fontSize:scaleSize(24),width:ETTDevice.ScreenWidth - scaleSize(200)}}>{item.skuName}</Text>
                    <Text style={{marginTop:scaleSize(36),marginRight:scaleSize(30),color:ETTColor.c3,fontSize:scaleSize(24)}}> ￥{price}</Text>
                </View>)
            }


            return(
                <View style={courseChooseStyle.container}>
                    <Animated.View style={courseChooseStyle.mask}></Animated.View>
                    <Animated.View style={[courseChooseStyle.tip,{transform:[{
                            translateY:this.state.offset.interpolate({
                                inputRange:[0,1],
                                outputRange:[height,height-scaleSize(700)-scaleSize(88) -(Platform.OS === "ios" ? 0 : StatusBarManager.currentHeight)],
                            })
                        }]}]}>

                        <View style={courseChooseStyle.mealCourseContain}>
                            <View style={courseChooseStyle.courseTopViewStyle}>
                                <Text style={courseChooseStyle.courseTitleStyle}>
                                    {this.props.info.goodsName}
                                </Text>
                                <TouchableOpacity onPress={()=>{
                                    this._callBack()
                                }}>
                                    <Image style={courseChooseStyle.courseTopCloseStyle} source={require('../res/images/close.png')}/>
                                </TouchableOpacity>

                            </View>

                            <ScrollView style={{flexDirection:'column'}}>

                                <View style={{width:ETTDevice.ScreenWidth,flexDirection:'row',marginLeft:scaleSize(30),width:ETTDevice.ScreenWidth - scaleSize(30)*2}}>
                                    {imgArr}
                                </View>

                            <Text style={{marginLeft:scaleSize(30),marginRight:scaleSize(30),height:scaleSize(0.3),backgroundColor:ETTColor.l1,marginTop:scaleSize(30),width:ETTDevice.ScreenWidth - scaleSize(30)*2}}/>

                            <View style={{flexDirection:'column'}}>
                                {skuNameArr}
                            </View>



                            <View style={{flexDirection:'row',marginTop:scaleSize(42)}}>
                            <Text style={{marginLeft:scaleSize(250),color:ETTColor.f2,fontSize:scaleSize(24)}}>
                                套餐价
                            </Text>
                                <Text style={{color:ETTColor.c3,fontSize:scaleSize(24)}}>
                                    ￥{this.props.info.marketPrice}
                                </Text>
                                <Text style={{color:ETTColor.f2,fontSize:scaleSize(24)}}>  可节省</Text>
                                <Text style={{color:ETTColor.c3,fontSize:scaleSize(24)}}>
                                    ￥{this.props.info.packageDiscount}
                                </Text>
                                <Text style={{textDecorationLine:'line-through',color:ETTColor.f3,fontSize:scaleSize(24),marginLeft:scaleSize(20)}}>
                                     原价￥{this.props.info.amount}
                                </Text>
                            </View>


                            </ScrollView>

                        </View>


                    </Animated.View>
                </View>
            )
        }
    }


    // 显示动画
    in(){
        Animated.parallel([
            Animated.timing(
                this.state.opacity,
                {
                    easing:Easing.linear,
                    duration:500,
                    toValue:0.8,
                }
            ),
            Animated.timing(
                this.state.offset,
                {
                    easing:Easing.linear,
                    duration:500,
                    toValue:1,
                }
            )
        ]).start();
    }


    // 隐藏动画
    out(){
        Animated.parallel([
            Animated.timing(
                this.state.opacity,
                {
                    easing:Easing.linear,
                    duration:500,
                    toValue:0,
                }
            ),
            Animated.timing(
                this.state.offset,
                {
                    easing:Easing.linear,
                    duration:500,
                    toValue:0
                }
            )
        ]).start();
    }

    // 关闭
    close(){
        if (!this.state.hide){
            this.out()
        }
    }

}
