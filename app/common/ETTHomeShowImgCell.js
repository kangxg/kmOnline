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
    Dimensions,
    ImageBackground
} from 'react-native';



import  ETTDevice from '../res/values/ETTDevice';

export default class ETTHomeShowImgCell extends Component{
    constructor(props){
        super(props);
    }


    render(){
        return (
            <View style={{flex:1,marginLeft:10}}>
                <ImageBackground source={require('../res/images/home_page_header_cover.jpg')} style={{width:ETTDevice.ScreenWidth/2 - 20,height:150}}>
                    <View style={{height:30,marginTop:150-20,width:ETTDevice.ScreenWidth/2 - 20,backgroundColor:"black",opacity:0.8,flexDirection:"row",alignItems:'center'}}>
                        <Text style={{marginLeft:20,color:'white'}}>
                            ￥1200
                        </Text>
                        <Text style={{marginLeft:20,color:'grey'}}>
                            ￥1500
                        </Text>

                    </View>
                </ImageBackground>
                <View style={{alignItems:'center',justifyContent:'center',marginTop:15,width:ETTDevice.ScreenWidth/2 - 20}}>
                    <Text style={{color:'white'}}>奔驰酷蒙一年学习VIP</Text>
                </View>
            </View>
        )
    }



}