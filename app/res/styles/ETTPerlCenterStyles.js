import React from 'react';
import {Platform, StyleSheet} from 'react-native';

import ETTDevice from "../values/ETTDevice";
import ETTColor from '../values/ETTColor';
import {px2dp, scaleSize} from "../values/ETTInlineFuction";

var ETTPerlCenterStyles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: ETTColor.white,
            //
            width:ETTDevice.ScreenWidth
        },
        content:{
            backgroundColor: ETTColor.c2,
        },
        welcome: {
            fontSize: 20,
            textAlign: 'center',
            margin: 10,
        },
        header:{
            flex:1,
            backgroundColor: ETTColor.c2,
            width:ETTDevice.ScreenWidth,
            //marginBottom:scaleSize(24)
            // height:355,
        },
        headerTop:{
            backgroundColor: ETTColor.white,
            width:ETTDevice.ScreenWidth,
            // height:220,
        },
        headerTop_top: {

            marginTop:0,

            alignItems:'center',
            height:scaleSize(60),
            width:scaleSize(11),
            backgroundColor:ETTColor.f5,

        },
        headerTop_top_back: {
            marginTop:scaleSize(34),
            marginLeft:scaleSize(36),
            marginBottom:scaleSize(9),


        },
        top:{
            backgroundColor: ETTColor.white,
            width:ETTDevice.ScreenWidth,
            //height:scaleSize(438),
        },
        top_header:{
            marginTop:0,
            width:ETTDevice.ScreenWidth,
            // alignItems:'center',
            height:scaleSize(119),
            //width:scaleSize(11),

        },
        top_header_back:{
            marginTop:Platform.OS === "ios" ? scaleSize(48):scaleSize(30),
            height:scaleSize(71),
            width:scaleSize(76),
            marginLeft:0,
        },
        top_header_back_image:{
            marginTop:scaleSize(20),
            marginLeft:scaleSize(30),
            height:scaleSize(34),
            width:scaleSize(21),
            marginBottom:scaleSize(17),
        },

        user_icon_btn:{
            marginTop:0,
            marginLeft:(ETTDevice.ScreenWidth -scaleSize(164)) * 0.5,
            width:scaleSize(164),
            height:scaleSize(164),
        },

        user_nickname:{
            fontSize: scaleSize(30),
            textAlign: 'center',
            // height:scaleSize(29),
            marginTop:scaleSize(36),
            marginLeft:scaleSize(10),
            marginRight:scaleSize(10),
            color:ETTColor.f1,
            //backgroundColor:ETTColor.f5,
        },
        user_amount:{

            justifyContent: 'flex-start',
            flexDirection:'row',
            alignItems:'center',
            marginTop:0,
            marginBottom:scaleSize(55),
            //backgroundColor:ETTColor.f5
            // fontSize: scaleSize(30),
            // textAlign: 'center',
            // // height:scaleSize(29),
            // marginTop:scaleSize(36),
            // marginLeft:scaleSize(10),
            // marginRight:scaleSize(10),
            // color:ETTColor.f1,
            //backgroundColor:ETTColor.f5,
        },
        user_amount_text:{
            fontSize: scaleSize(30),
            textAlign: 'right',
            // height:scaleSize(29),
            marginTop:scaleSize(24),
            //marginLeft:scaleSize(10),
            width:ETTDevice.ScreenWidth/2 + scaleSize(164)/2 -scaleSize(32),
            marginRight:scaleSize(32),
            color:ETTColor.f1,
            //backgroundColor:ETTColor.f5,
        },
        user_amount_ecit:{
            marginTop:scaleSize(0),
            height:scaleSize(50),
            width:scaleSize(54),
           // backgroundColor:ETTColor.f5,
        },
        user_amount_ecit_image:{
            marginTop:scaleSize(24),
            height:scaleSize(20),
            width:scaleSize(24),
            marginBottom:scaleSize(17),
        },
        footer:{
            flex:2,
            backgroundColor: ETTColor.c2,
            width:ETTDevice.ScreenWidth,
            justifyContent:'flex-end',

        },
        footer_more:{
            height:scaleSize(76),
            backgroundColor: ETTColor.white,
            justifyContent:'center',
            alignItems:'center',
            marginBottom:scaleSize(24),
        },

        footer_Logout:{
            height:scaleSize(76),
            backgroundColor: ETTColor.white,
            marginLeft:scaleSize(36),
            marginRight:scaleSize(36),
            justifyContent:'center',
            alignItems:'center',
            marginBottom:scaleSize(241),
            borderRadius:scaleSize(4)

        },
        footer_Logout_text:{
            fontSize:scaleSize(26),
            color:ETTColor.f5
        },
        icon_btn:{
            marginTop:scaleSize(60),
            marginLeft:(ETTDevice.ScreenWidth -scaleSize(147)) * 0.5,
            width:scaleSize(147),
            height:scaleSize(147),
        },

        info_edit_btn:{
            marginTop:scaleSize(41),
            marginBottom:scaleSize(50),
            marginLeft:(ETTDevice.ScreenWidth -scaleSize(177)) * 0.5,
            width:scaleSize(177),
            height:scaleSize(56),
        },
        nickname:{
            fontSize: scaleSize(22),
            textAlign: 'center',
            marginTop: scaleSize(20),
            marginLeft:scaleSize(10),
            marginRight:scaleSize(10),
            color:ETTColor.f2,
        },
        userNum:{
            fontSize: scaleSize(22),
            textAlign: 'center',
            marginTop: scaleSize(20),
            marginLeft:scaleSize(10),
            marginRight:scaleSize(10),
            color:ETTColor.f3,
        },
        baseRow:{
            width:ETTDevice.ScreenWidth,
            backgroundColor: ETTColor.white,
            marginTop:0,
            height:scaleSize(96),
            justifyContent:'flex-end',
            flexDirection: 'row',
            alignItems:'center',
        },
        row_line:{
            height:1,
            marginLeft:scaleSize(30),
            marginRight:scaleSize(30),
            backgroundColor:ETTColor.l1,
        },
        logout:{

        },
        sessionView:{
            width:ETTDevice.ScreenWidth,
            backgroundColor: ETTColor.white,
            height:scaleSize(76),
            flexDirection: 'column',
            justifyContent:'flex-start',

        },
        sessionTop:{
            width:ETTDevice.ScreenWidth,
            height:scaleSize(76),
            justifyContent:'center',
            alignItems:'center',
        },
        sessionText:{
            fontSize:scaleSize(24),
            paddingLeft:scaleSize(30),
            textAlign: 'left',
            color:ETTColor.f1,
            width:ETTDevice.ScreenWidth,
        },
        baseRowRight:{
            width:ETTDevice.ScreenWidth/2,
            backgroundColor: ETTColor.white,
            justifyContent:'flex-end',
            flexDirection: 'row',
            alignItems:'center',
            alignSelf:'auto'
        },
        baseRowImage:{
            width:scaleSize(38),
            height:scaleSize(38),
            marginRight:scaleSize(28),
        },
        baseRowTitle:{

            fontSize:scaleSize(26),
            paddingLeft:scaleSize(30),
            textAlign: 'left',
            color:ETTColor.f1,
            width:ETTDevice.ScreenWidth/2,
        },
        row_only_title:{
            height:scaleSize(96),
            width:ETTDevice.ScreenWidth,
            backgroundColor:ETTColor.white,
            flexDirection: 'row',
            alignItems:'center',
        },
        baseRowContent:{
            alignSelf:'auto',
            fontSize:scaleSize(24),
            paddingRight:15,
            textAlign: 'right',
            color:ETTColor.f3,
            width:ETTDevice.ScreenWidth/2,
        },
        list: {
            width: ETTDevice.ScreenWidth,
            backgroundColor: ETTColor.c2,
        },
        listItem:{
            width:ETTDevice.ScreenWidth,

        },
        itemLine:{
          marginBottom:1,
            marginLeft:scaleSize(30),
            marginRight:scaleSize(30),
            height:1,backgroundColor:ETTColor.l1,
            width:ETTDevice.ScreenWidth-scaleSize(60),
        },
        myInfo:{
            backgroundColor: '#FFFFFF',
            width:ETTDevice.ScreenWidth,
        },
        cellContainer:{
            backgroundColor:ETTColor.white,
            paddingRight:scaleSize(30),
            paddingLeft:scaleSize(30),
            paddingTop:scaleSize(30),
            paddingBottom:scaleSize(30),
            marginTop:scaleSize(14),

            width:ETTDevice.ScreenWidth,
        },
        cell_name:{

        },
        cell_amount:{

        },
        cellBody:{
            flex:1,
            justifyContent:'space-between',

        },
        cellBodyTop:{
            flex:1,
            justifyContent:'space-between',
            flexDirection: 'row',
            alignItems:'center',
        },
        cellLine:{

            height:1,backgroundColor:ETTColor.l1,

        },
        cellBodyLeft:{
            marginTop:scaleSize(20),
        },
        cellBodyRight:{
            flexDirection: 'row',
        },
        cellContent:{
            fontSize:scaleSize(18),
            color:ETTColor.f3,
        },
        cellTime:{
            fontSize:scaleSize(16),
            marginTop:5,
            marginBottom:scaleSize(15),
            color:ETTColor.f3
        },
        cellAmount:{
            fontSize:scaleSize(20),
            marginRight:scaleSize(30),
            color:ETTColor.f3,
        },
        cellOrderType:{
            fontSize:scaleSize(26),
            color:ETTColor.f3
        },
        order_Complete:{
            fontSize:scaleSize(26),
            color:ETTColor.f3
        },
        order_WillPay:{
            fontSize:scaleSize(26),
            color:ETTColor.c13,
        },
        order_Cancel:{
            fontSize:scaleSize(26),
            color:ETTColor.f3
        },

        instructions: {
            textAlign: 'center',
            color: '#333333',
            marginBottom: 5,
        },
    });

module.exports = ETTPerlCenterStyles;