import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Navigator,
    ScrollView,
    NativeModules,
    TextInput,
    ListView,
    Image,
    RefreshControl,
    Dimensions
} from 'react-native';



import  ETTDevice from '../res/values/ETTDevice';
import {scaleSize} from "../res/values/ETTInlineFuction";


export default class ETTHomeSimpleCell extends Component{

    // title:string = ''// 标题
    // introduc:string = ''// 简介
    // price:string = ''// 价格
    // isShowPrice // 是否显示价格
    // itemId //课程ID
    // mainPicture:string = ''// 图片地址

    constructor(props){
        super(props)
        console.log("我是ETTHomeSimpleCell")
    }


    showPrice(){
        return this.props.isShowPrice === true ? <Text style={{color:'#ff453a',fontSize:14,marginTop:scaleSize(10),width:ETTDevice.ScreenWidth-scaleSize(220)}}>{this.props.price}</Text> : null
    }

    render(){

        return(
        <View style={{marginLeft:scaleSize(15),flexDirection:'row',backgroundColor:"#fff",marginTop:scaleSize(10),paddingBottom:scaleSize(10),overflow:'hidden'}}>
            <Image style={{width:scaleSize(200),height:scaleSize(150),marginTop:scaleSize(20),borderRadius:4}} source= {this.props.mainPicture ? {uri:this.props.mainPicture}:require('../res/images/avatar.png')}/>
            <View style={{marginLeft:scaleSize(10),marginTop:scaleSize(10)}}>
                <Text style={{marginTop:scaleSize(10), color:'#000',fontSize:16,width:ETTDevice.ScreenWidth-scaleSize(220)}}>{this.props.title}</Text>
                <Text style={{color:'#000',fontSize:14,marginTop:scaleSize(10),width:ETTDevice.ScreenWidth-scaleSize(230)}}>{this.props.introduc}</Text>
                {this.showPrice()}

            </View>
        </View>
        )
    }
}


// let str:String = ""
// if(this.props.isShowPrice){
//     str = "￥1020"
// }else {
//     str = ""
// }
{/*<View style={{marginLeft:15,flexDirection:'row',backgroundColor:"#202021",marginTop:10,paddingBottom:10}}>*/}
{/*<Image style={{width:150,height:100}} source= {this.mainPicture ? {uri:this.mainPicture}:require('../res/images/avatar.png')}/>*/}
{/*<View style={{marginLeft:10}}>*/}
{/*<Text style={{marginTop:10, color:'white',fontSize:16,width:ETTDevice.ScreenWidth-180}}>{this.props.cellData.title}</Text>*/}
{/*<Text style={{color:'white',fontSize:14,marginTop:10}}>{this.props.cellData.userName}</Text>*/}
{/*<Text style={{color:'white',fontSize:14,marginTop:10}}>{str}</Text>*/}

{/*</View>*/}
{/*</View>*/}