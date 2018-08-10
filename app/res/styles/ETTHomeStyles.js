import React from 'react';
import {
    StyleSheet
} from 'react-native';

import  ETTDevice from '../values/ETTDevice';
import {scaleSize} from "../values/ETTInlineFuction";

var ETTHomeStyles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        height:ETTDevice.ScreenHeight,
        width:ETTDevice.ScreenWidth,
    },
    navRight:{
        width:30,
        height:30,
    },
    headerTitleStyles: {
        color: 'white',
        fontSize: 20,
        alignSelf: 'center'
    },
    topViewStyle:{
        width:ETTDevice.ScreenWidth,
        height:40,
        backgroundColor:'#78fe6f',
        flexDirection:'row',
    },
    topTextStyle:{
        backgroundColor:'red',
        marginLeft:15,
        marginTop:10,
        justifyContent:'center',
        width:ETTDevice.ScreenWidth - 80,
        height:20,
        fontSize:16,
        color:'white',
    },
    topImageStyle:{
        marginLeft:25,
        marginTop:10,
        width:20,
        height:20,
    },
    bannerViewStyle:{
        flexDirection:'column',
        width:ETTDevice.ScreenWidth,
        height:scaleSize(434),//210,
    },
    // Image组件必须在样式中声明图片的款和高。如果没有声明，则图片将不会被呈现在界面上。
    bannerImgStyle:{
        resizeMode:'stretch',
        width:ETTDevice.ScreenWidth,
        height:scaleSize(434),//434,//200
    },
    bannerDotStyle:{
        backgroundColor: 'rgba(0,0,0,.2)',
        width: 9,
        height: 9,
        borderRadius: 4,
        marginLeft: 10,
        marginRight: 9,
        marginTop: 9,
        marginBottom: 9,
    },

    bannerActiveDotStyle:{
        backgroundColor: '#007aff',
        width: 9,
        height: 9,
        borderRadius: 4,
        marginLeft: 10,
        marginRight: 9,
        marginTop: 9,
        marginBottom: 9,
    },
    sectionFooterViewStyle:{
        height:60,
        width:ETTDevice.ScreenWidth,
        backgroundColor:'#202021',
        alignItems:'center',
        justifyContent:'center',
    },
    sectionFooterTextStyle:{
        color: 'white',
        fontSize: 15,
        borderRadius:2,
        borderColor:'white',
        borderWidth:1,
        // width:60,
        textAlign:'center',
        textAlignVertical:'center',
        paddingHorizontal:20,
        paddingVertical:5,
    },
})

module.exports = ETTHomeStyles;