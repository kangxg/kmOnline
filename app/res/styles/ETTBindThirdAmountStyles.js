import React from 'react';
import {
    StyleSheet
} from 'react-native';

import ETTDevice from "../values/ETTDevice";
import ETTColor from  '../values/ETTColor';
import {scaleSize,adaptationText} from "../values/ETTInlineFuction";

var ETTBindThirdAmountStyles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: ETTColor.c2,
        },
        body:{
            flex:2,
            backgroundColor: ETTColor.c2,
            justifyContent:'space-between',
        },
        body_top:{

        },
        body_bottom:{
            marginBottom:0,

        },
        sessionView:{
            width:ETTDevice.ScreenWidth,
            backgroundColor: ETTColor.c2,
            height:scaleSize(24),

        },

        list: {
            width: ETTDevice.ScreenWidth,
            backgroundColor: ETTColor.c2,
        },
        listItem:{
            width:ETTDevice.ScreenWidth,

        },

        cellContainer:{
            backgroundColor:ETTColor.white,
            paddingRight:scaleSize(30),
            paddingTop:scaleSize(30),

            width:ETTDevice.ScreenWidth,
        },
        cellBody_top:{
            flex:1,
            justifyContent:'space-between',
            flexDirection: 'row',
            alignItems:'center',
            marginBottom:scaleSize(30),

        },
        cellBody_top_left:{

            marginLeft:scaleSize(30),
            fontSize:scaleSize(28),
            color:ETTColor.f1,
        },
        cellBody_top_right:{
          marginRight:scaleSize(7),
            justifyContent:'space-between',
            flexDirection: 'row',
            alignItems:'center',

        },
        cellBody_top_right_text:{
           fontSize:scaleSize(24),
           color:ETTColor.f4,

        },
        cellBody_top_right_image:{

               marginLeft:scaleSize(20)
        },
        cellLine:{

            height:1,
            backgroundColor:ETTColor.l1,

        },
        logout_btn: {
            marginLeft:scaleSize(73),
            marginRight:scaleSize(73),
            marginBottom:scaleSize(333),
            height:scaleSize(85),
            backgroundColor:ETTColor.black_t60,
            justifyContent: 'center',
            borderRadius:scaleSize(8)

        },
        logout_btn_text:{

            textAlign: 'center',
            color: ETTColor.white,
            fontSize:scaleSize(26),

        },
        modalView:{
            width:100,
            height:100,
            backgroundColor:'red'
        }

    });

module.exports = ETTBindThirdAmountStyles;