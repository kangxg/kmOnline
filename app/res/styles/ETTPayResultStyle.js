import React from 'react';
import {
    StyleSheet
} from 'react-native';

import  ETTDevice from '../values/ETTDevice';
import  ETTColor  from '../values/ETTColor';
import {scaleSize} from "../values/ETTInlineFuction";


const [left,top] = [0,0];


var ETTPayResultStyle = StyleSheet.create({

    // container:{
    //     backgroundColor:'red',//ETTColor.black_t60,
    //     opacity:0.6,
    //     flex:1,
    //     alignItems:'center',
    //     justifyContent:'center',
    //     width:ETTDevice.ScreenWidth,
    //     height:ETTDevice.ScreenHeight,
    //     position:"absolute",
    //     left:left,
    //     top:top,
    //
    // },


    container: {
        position:"absolute",
        width:ETTDevice.ScreenWidth,
        height:ETTDevice.ScreenHeight,
        left:left,
        top:top,
    },
    mask: {
        justifyContent:"center",
        backgroundColor:ETTColor.black_t60,//"#4ef52a",
        opacity:0.8,
        position:"absolute",
        width:ETTDevice.ScreenWidth,
        height:ETTDevice.ScreenHeight,
        left:left,
        top:top,
    },
    tip: {
        width:ETTDevice.ScreenWidth,
        height:ETTDevice.ScreenHeight,
        alignItems:"center",
        justifyContent:"center",
    },

    mainViewStyle:{
        borderRadius:scaleSize(20),
        backgroundColor:ETTColor.white,
        alignSelf:'center',
        width:scaleSize(600),
        height:scaleSize(630),
    },

    topCloseViewStyle:{
        marginTop:scaleSize(30),
        alignItems:'flex-end',
        justifyContent:'flex-end',
        width:scaleSize(580),
    },

    topCloseImgStyle:{
        width:scaleSize(30),
        height:scaleSize(30),
        // resizeMode:'stretch',
    },

    paySuccessImgStyle:{
        marginTop:scaleSize(10),
        width:scaleSize(163),
        height:scaleSize(209),
        alignSelf:'center',
    },

    payFailureImgStyle:{
        marginTop:scaleSize(20),
        height:scaleSize(210),
        width:scaleSize(210),
        alignSelf:'center',
    },

    bottomTitleViewStyle:{
        marginTop:scaleSize(45),
      alignItems:'center',
    },

    failureBottomTitleViewStyle:{
        marginTop:scaleSize(150),
        alignItems:'center',
        justifyContent:'center',
    },

    haveBuyTextStyle:{
      color:ETTColor.f1,
      fontSize:scaleSize(30),
    },

    courseNameTextStyle:{
        color:ETTColor.f1,
        fontSize:scaleSize(30),
        marginTop:scaleSize(20),
    },

    noticeTextStyle:{
        color:ETTColor.f3,
        fontSize:scaleSize(22),
        marginLeft:scaleSize(65),
        marginTop:scaleSize(45),
    },


    payFailureTextStyle:{
        color:ETTColor.f1,
        fontSize:scaleSize(30),
    },




})

module.exports = ETTPayResultStyle;

