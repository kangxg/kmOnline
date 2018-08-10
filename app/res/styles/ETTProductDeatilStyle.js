import React from 'react';
import {
    StyleSheet
} from 'react-native';

import  ETTDevice from '../values/ETTDevice';
import  ETTColor  from '../values/ETTColor';
import {scaleSize} from "../values/ETTInlineFuction";

var ETTProductDeatilStyle = StyleSheet.create({

    contain:{
        width:ETTDevice.ScreenWidth,
        height:ETTDevice.ScreenHeight,
        backgroundColor:'#F5F5F5',
        flex:1,
    },

    scrollViewStyle:{
        width:ETTDevice.ScreenWidth,
        // height:ETTDevice.ScreenHeight - scaleSize(90)*2 - scaleSize(30),
        height:ETTDevice.ScreenHeight - scaleSize(90),
        flex:1,
        position: 'absolute',

    },

    topViewStyle:{
        width:ETTDevice.ScreenWidth,
        height:scaleSize(434),
        flexDirection:'column',
        // backgroundColor:'red',
    },

    topShowImageStyle:{
      width:ETTDevice.ScreenWidth,
      height:344,
        resizeMode:'stretch',

    },

    productDeatilViewStyle:{
        width:ETTDevice.ScreenWidth,
        backgroundColor:'white',
    },

    productPriceStyle:{
        marginLeft:scaleSize(30),
        color:ETTColor.c3,
        fontSize:scaleSize(32),
        width:ETTDevice.ScreenWidth - scaleSize(20),
        textAlign:'left',
        marginTop:scaleSize(30),
        marginBottom:scaleSize(24),
    },

    productNameStyle:{
        marginLeft:scaleSize(30),
        fontSize:scaleSize(32),
        color:ETTColor.f1,
        marginTop:scaleSize(24),
        // fontFamily:'微软雅黑',
        width:ETTDevice.ScreenWidth - scaleSize(40),

    },

    productDescribeTopStyle:{
        marginLeft:scaleSize(30),
        marginTop:scaleSize(32),
        fontSize:scaleSize(24),
        color:ETTColor.f2,
        width:ETTDevice.ScreenWidth - scaleSize(40),
        letterSpacing:1,//字符间距
        // lineHeight:10,// 行间距
    },


    choiceItemViewStyle:{
        marginTop:scaleSize(18),
        width:ETTDevice.ScreenWidth,
        backgroundColor:'white',
        flex:1
        // flexDirection:'row',
        // flexWrap:'wrap',//一行排不下换行

    },

    choiceItemSaleViewStyle:{
        width:scaleSize(70),
        height:scaleSize(34),
        borderRadius:scaleSize(15),
        backgroundColor:ETTColor.c4,
        alignItems:'center',
        justifyContent:'center',
        marginLeft:scaleSize(30),
        marginTop:scaleSize(24),
    },

    choiceItemSaleTextStyle:{
        color:ETTColor.c3,
        fontSize:scaleSize(16),
        // fontFamily:'微软雅黑',
    },

    choiceItemSaleDescribeStyle:{
        marginLeft:scaleSize(50),
        textAlign:'left',
        marginTop:scaleSize(30),
        fontSize:scaleSize(24),
        color:ETTColor.c3,
        marginRight:scaleSize(20),
        width:ETTDevice.ScreenWidth - scaleSize(40) - scaleSize(70)*2,
        // fontFamily:'微软雅黑',
    },

    choiceItemBottomViewStyle:{
        justifyContent:'space-between',
        flexDirection:'row',
    },

    choiceItemHaveChoiceStyle:{
        marginLeft:scaleSize(30),
        fontSize:scaleSize(30),
        color:ETTColor.f3,
        // fontFamily:'微软雅黑',
        marginBottom:scaleSize(30),
        marginTop:scaleSize(30),
    },

    choiceItemSubjectStyle:{
        marginLeft:scaleSize(40),
        fontSize:scaleSize(24),
        color:ETTColor.f1,
        // fontFamily:'微软雅黑',
        marginBottom:scaleSize(30),
        marginTop:scaleSize(33),
    },

    choiceItemImageStyle:{
        width:scaleSize(12),
        height:scaleSize(19),
        marginBottom:scaleSize(30),
        marginRight:scaleSize(30),
        marginTop:scaleSize(30),
    },

    describeItemTextStyle:{
        margin:scaleSize(30),
        backgroundColor:'yellow',
        height:ETTDevice.ScreenHeight,
    },

    payLineStyle:{
        width:ETTDevice.ScreenWidth,
        height:1,
        backgroundColor:ETTColor.l1,
    },

    payForItemViewStyle:{
        height:scaleSize(90),
        width:ETTDevice.ScreenWidth,
        flexDirection:'column',
        backgroundColor:'white',
        position: 'absolute',
        left:0,
        bottom:0,

    },

    payForItemSubViewStyle:{
        height:scaleSize(90),
        width:ETTDevice.ScreenWidth,
        flexDirection:'row',
        backgroundColor:'white',
        justifyContent:'space-between',
        alignItems:'center',
    },

    payForItemPriceStyle:{
        marginLeft:scaleSize(30),
        color:ETTColor.black_t60,
        fontSize:scaleSize(30),
        textAlign:'left',
    },

    payForItemImmediateBuyViewStyle:{
        backgroundColor:ETTColor.black_t60,
        width:scaleSize(222),
        height:scaleSize(90),
        alignItems:'center',
        justifyContent:'center',

    },

    payForItemImmediateBuyLineStyle:{
      width:ETTDevice.ScreenWidth,
      height:1,
      backgroundColor:ETTColor.f3,
        marginTop:scaleSize(1),
    },

    payForItemImmediateBuyTextStyle:{
        color:ETTColor.white,
        fontSize:scaleSize(35),
        textAlign:'center',
    },
    

})

module.exports = ETTProductDeatilStyle;