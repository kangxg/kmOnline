
import React from 'react';
import {
    StyleSheet
} from 'react-native';

import  ETTDevice from '../values/ETTDevice';
import  ETTColor  from '../values/ETTColor';
import {scaleSize} from "../values/ETTInlineFuction";


const ETTChooseItemStyle = StyleSheet.create({
    container:{
        marginTop:scaleSize(52),
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        left:scaleSize(38),
        width:ETTDevice.ScreenWidth - scaleSize(40)*2,
    },

    titleTextStyle:{
        fontSize:scaleSize(24),
        color:ETTColor.f2,
        textAlign:'left',
        alignSelf:'flex-start',

    },

    itemViewStyle:{
        flexDirection:'row',
        alignSelf:'flex-start',
        // marginLeft:scaleSize(40),
        marginRight:scaleSize(48),
        marginTop:scaleSize(20),
        alignItems:'center',
        // justifyContent:'space-between',
        flexWrap:'wrap',//是否换行
        width:ETTDevice.ScreenWidth - scaleSize(40)*2,

    },

    itemUnSelectStyle:{
        marginLeft:scaleSize(10),
        alignItems:'center',
        justifyContent:'center',
        borderWidth:scaleSize(1),
        borderColor:ETTColor.c7,
        height:scaleSize(60),
        backgroundColor:ETTColor.white,
        marginTop:scaleSize(10),

    },

    itemSelectStyle:{
        marginLeft:scaleSize(10),
        alignItems:'center',
        justifyContent:'center',
        borderWidth:scaleSize(1),
        height:scaleSize(60),
        borderColor:ETTColor.white,
        backgroundColor:ETTColor.c6,
        marginTop:scaleSize(10),
    },

    itemTextUnSelectStyle:{
        alignSelf:'center',
        fontSize:scaleSize(24),
        color:ETTColor.f2,
        paddingLeft:scaleSize(50),
        paddingRight:scaleSize(50),
    },

    itemTextSelectStyle:{
        alignSelf:'center',
        fontSize:scaleSize(24),
        color:ETTColor.white,
        paddingLeft:scaleSize(50),
        paddingRight:scaleSize(50),
    },



})

module.exports = ETTChooseItemStyle