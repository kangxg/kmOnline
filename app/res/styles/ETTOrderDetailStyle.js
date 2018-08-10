import React from 'react';
import {StyleSheet} from 'react-native';

import ETTDevice from '../values/ETTDevice';
import ETTColor from '../values/ETTColor';
import {scaleSize} from "../values/ETTInlineFuction";

var ETTOrderDeatilStyle = StyleSheet.create({



    contain:{
        backgroundColor:ETTColor.c2,
        width:ETTDevice.ScreenWidth,
        // height:ETTDevice.ScreenHeight - scaleSize(90),
        flex:1,
    },

    scrollContain:{
            flex:1,
            width:ETTDevice.ScreenWidth,
            height:ETTDevice.ScreenHeight - scaleSize(90)*2 - scaleSize(30),
    },

    userTopViewStyle:{
        backgroundColor:ETTColor.white,

    },

    userNameTitleStyle:{
        color:ETTColor.f1,
        marginLeft:scaleSize(30),
        fontSize:scaleSize(26),
        marginTop:scaleSize(30),
        textAlign:'left',
    },

    userNameStyle:{
        color:ETTColor.f3,
        fontSize:scaleSize(24),
        marginTop:scaleSize(24),
        textAlign:'left',
        marginBottom:scaleSize(30),
        marginLeft:scaleSize(30),
    },

    orderInfoView:{
      width:ETTDevice.ScreenWidth,
        flexDirection:'row',
        height:scaleSize(80),
    },

    orderSerialNumber:{
      width:scaleSize(360),
      marginLeft:scaleSize(30),
      marginTop:scaleSize(24),
        marginBottom:scaleSize(24),
      color:ETTColor.f3,
      fontSize:scaleSize(24),
      textAlign:'left',
        height:scaleSize(30),
    },

    orderTime:{
      marginLeft:scaleSize(34),
        color:ETTColor.f3,
        fontSize:scaleSize(24),
        textAlign:'left',
        marginTop:scaleSize(24),
        marginBottom:scaleSize(24),
        width:scaleSize(300),
        height:scaleSize(30),
    },

    orderLine:{
        height:1,
        marginLeft:scaleSize(30),
        width:ETTDevice.ScreenWidth - scaleSize(30),
        backgroundColor:ETTColor.f3,
    },

    orderName:{
        marginLeft:scaleSize(30),
        marginTop:scaleSize(24),
        color:ETTColor.f1,
        fontSize:scaleSize(24),
        textAlign:'left',
        width:ETTDevice.ScreenWidth - scaleSize(30)
    },

    middleProductViewStyle:{
        marginTop:scaleSize(15),
        backgroundColor:ETTColor.white,
        flexDirection:'column',
    },

    middleLeftImageStyle:{
        marginLeft:scaleSize(30),
        marginTop:scaleSize(25),
        marginBottom:scaleSize(36),
        width:scaleSize(186),
        height:scaleSize(168),
        resizeMode:'stretch',
        borderRadius:4,
    },

    middleRightViewStyle:{
        flexDirection:'column',
        marginLeft:scaleSize(30),
        marginTop:scaleSize(25),
        width:ETTDevice.ScreenWidth - scaleSize(290) - scaleSize(30)*3,
        marginBottom:scaleSize(30),
    },

    middleProductNameStyle:{
        color:ETTColor.f1,
        fontSize:scaleSize(28),
        textAlign:'left',
    },

    middleProductDesStyle:{
        color:ETTColor.f3,
        fontSize:scaleSize(26),
        marginTop:scaleSize(22),
        textAlign:'left',
    },

    middleProductPriceStyle:{
        color:ETTColor.f2,
        fontSize:scaleSize(26),
        marginTop:scaleSize(30),
        textAlign:'left',
    },

    bottomViewStyle:{
        marginTop:scaleSize(15),
        marginBottom:scaleSize(100),
        backgroundColor:ETTColor.white,
    },

    bottomFirstItemViewStyle:{
        flexDirection:'column',
    },

    bottomItemViewStyle:{
        justifyContent:'space-between',
        flexDirection:'row',
    },

    bottomLeftTitleStyle:{
        marginTop:scaleSize(24),
        marginLeft:scaleSize(30),
        textAlign:'left',
        fontSize:scaleSize(26),
        color:ETTColor.f2,
        marginBottom:scaleSize(30),
    },


    youhuiLeftTitleStyle:{
        marginTop:scaleSize(26),
        marginLeft:scaleSize(30),
        textAlign:'left',
        fontSize:scaleSize(24),
        color:ETTColor.c3,
        marginBottom:scaleSize(30),
    },

    youhuiLeftStyle:{
        marginTop:scaleSize(24),
        marginLeft:scaleSize(30),
        textAlign:'left',
        fontSize:scaleSize(26),
        color:ETTColor.f2,
        width:scaleSize(65),

    },


    bottomRightTitleStyle:{
        marginTop:scaleSize(24),
        marginRight:scaleSize(30),
        textAlign:'center',
        fontSize:scaleSize(26),
        color:ETTColor.f2,
        marginBottom:scaleSize(30),
    },



    marketMoneyStyle:{
        marginRight:scaleSize(30),
        marginTop:scaleSize(24),
        marginBottom:scaleSize(30),
        textDecorationLine:'line-through',
        color:ETTColor.f3,
        textAlign:'center',
        fontSize:scaleSize(24),

    },

    lineStyle:{
        height:1,
        backgroundColor:ETTColor.l1,
        marginLeft:scaleSize(30),
    },

    payForItemViewStyle:{
        height:scaleSize(90),
        width:ETTDevice.ScreenWidth,
        flexDirection:'row',
        backgroundColor:'white',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:0,
    },

})

module.exports = ETTOrderDeatilStyle;