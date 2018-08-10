import React from 'react';
import {
    StyleSheet
} from 'react-native';

import  ETTDevice from '../values/ETTDevice';
import  ETTColor  from '../values/ETTColor';
import {scaleSize} from "../values/ETTInlineFuction";

var ETTCourseChooseStyle = StyleSheet.create({



    container: {
        position:"absolute",
        width:ETTDevice.ScreenWidth,
        height:ETTDevice.ScreenHeight - scaleSize(90)-scaleSize(88),
        left:0,
        top:0,
    },

    mask: {
        justifyContent:"center",
        backgroundColor:ETTColor.black_t60,
        opacity:0.8,
        position:"absolute",
        width:ETTDevice.ScreenWidth,
        height:ETTDevice.ScreenHeight - scaleSize(90)-scaleSize(88),
        left:0,
        top:0,
    },
    tip: {
        width:ETTDevice.ScreenWidth,
        //height:ETTDevice.ScreenHeight,
        alignItems:"center",
        justifyContent:"center",
        // opacity:0.5,
        backgroundColor:'white',
        borderTopLeftRadius: scaleSize(20),
        borderTopRightRadius: scaleSize(20),
    },

    courseView:{
        width:ETTDevice.ScreenWidth,
        height:ETTDevice.ScreenHeight - scaleSize(90)-scaleSize(88),
        backgroundColor:ETTColor.c5,
        opacity:0.5
    },

    courseContain:{
        height:scaleSize(700),
        backgroundColor:ETTColor.white,
        borderTopLeftRadius:scaleSize(20),
        borderTopRightRadius:scaleSize(20),
    },

    mealCourseContain:{
        height:scaleSize(698),
        backgroundColor:ETTColor.white,
        borderTopLeftRadius:scaleSize(20),
        borderTopRightRadius:scaleSize(20),
    },

    courseTopViewStyle:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginTop:scaleSize(35),
        width:ETTDevice.ScreenWidth,


    },

    courseTitleStyle:{
        marginLeft:scaleSize(24),
        fontSize:scaleSize(28),
        // fontFamily:'微软雅黑',
        color:ETTColor.f1,
        textAlign:'left',
        width:ETTDevice.ScreenWidth - scaleSize(48)*3,
    },

    courseTopCloseStyle:{
        marginRight:scaleSize(30),
        width:scaleSize(48),
        height:scaleSize(48),
        resizeMode:'center'

    }

})

module.exports = ETTCourseChooseStyle