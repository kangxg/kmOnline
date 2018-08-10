import React from 'react';
import {Platform, StyleSheet} from 'react-native';

import ETTDevice from "../values/ETTDevice";
import ETTColor from '../../res/values/ETTColor';
import {scaleSize} from "../values/ETTInlineFuction";


var ETTRegisteredStyle = StyleSheet.create(
    {
        reg_Mian: {
            flex: 1,
            backgroundColor: ETTColor.white,
            width:ETTDevice.ScreenWidth,
            height:ETTDevice.ScreenHeight
        },

        reg_body:{
            flex: 2,
            justifyContent: 'space-between',
            backgroundColor: ETTColor.white,

        },


        reg_body_top:{

            //height:300,

        },

        reg_close_btn:{
            marginLeft:scaleSize(36),
            marginTop:Platform.OS === "ios" ? scaleSize(59):scaleSize(30),
            width:scaleSize(44),
            height:scaleSize(49),
        },
        reg_close_image:{

            width:scaleSize(21),
            height:scaleSize(34),
        },
        reg_title:{
            fontSize:scaleSize(40),
            color:ETTColor.f1,
            textAlign: 'center',
            marginTop:scaleSize(10),
            marginBottom:scaleSize(39)
        },

        reg_back:{
            marginLeft:scaleSize(36),
            // width:scaleSize(24),
            // height:scaleSize(24),
        },
        reg_code_title:{
            fontSize:scaleSize(40),
            color:ETTColor.f1,
            textAlign: 'center',
            width:ETTDevice.ScreenWidth-scaleSize(118),
            // marginTop:scaleSize(20),
            // marginBottom:scaleSize(26)
        },
        reg_body_bottom:{
            // backgroundColor:ETTColor.f5,
            // height:300,
            marginBottom:0,
        },
        reg_input_top:{
            justifyContent: 'space-between',
            marginTop:scaleSize(50),
            marginLeft:scaleSize(75),
            marginRight:scaleSize(75),
            flexDirection:'row',
            alignItems:'center',


        },
        reg_input_Bottom:{

            justifyContent: 'space-between',
            marginTop:scaleSize(76),
            marginLeft:scaleSize(75),
            marginRight:scaleSize(75),
            flexDirection:'row',
            alignItems:'center',

        },
        reg_textInput:{
            fontSize:scaleSize(26),
            width:ETTDevice.ScreenWidth-scaleSize(200),
            color:ETTColor.f1,
        },
        reg_code_textInput:{
            fontSize:scaleSize(26),
            width:(ETTDevice.ScreenWidth-scaleSize(150))/2,
            color:ETTColor.f1,
        },
        reg_input_phone_image:{
            width:scaleSize(20),
            height:scaleSize(20),
        },
        reg_input_pwd_image:{
            width:scaleSize(28),
            height:scaleSize(19),
        },
        reg_line:{
            marginLeft:scaleSize(75),
            marginRight:scaleSize(75),
            marginTop:scaleSize(15),
            marginBottom:scaleSize(15),
            height:1,
            backgroundColor:ETTColor.l1,
        },

        reg_btn:{

            marginLeft:scaleSize(73),
            marginRight:scaleSize(73),
            marginTop:scaleSize(54),
            height:scaleSize(85),
            backgroundColor:ETTColor.black_t60,
            justifyContent: 'center',
            borderRadius:scaleSize(8)

        },
        reg_btn_text:{

            textAlign: 'center',
            color: ETTColor.white,
            fontSize:scaleSize(26),

        },
        reg_body_top_bottom:{

            marginLeft:scaleSize(75),
            marginRight:scaleSize(75),
            marginTop:scaleSize(34),
            justifyContent: 'flex-end',
            flexDirection:'row',
            alignItems:'center',


        },
        reg_code_btn:{
            justifyContent: 'center',
            marginRight:scaleSize(38),
        },
        reg_code_btn_text:{
            textAlign: 'center',
            fontSize:scaleSize(24),
            color:ETTColor.f2,
        },

        reg_registered_btn_text:{
            textAlign: 'center',
            fontSize:scaleSize(28),

        },
        reg_other_text:{
            marginLeft:scaleSize(28),
            marginRight:scaleSize(28),
            marginTop:scaleSize(50),
            fontSize:scaleSize(28),
            textAlign: 'center',
            color:ETTColor.f1,
        },
        reg_readagreed:{
            justifyContent: 'flex-start',
            flexDirection:'row',
            alignItems:'center',
            marginTop:scaleSize(30),
            marginLeft:scaleSize(75),
            marginRight:scaleSize(75),
        },
        reg_readagreed_checkbox:{
            width:scaleSize(24),
            height:scaleSize(24),

        },
        reg_readagreed_title:{
            color:ETTColor.f2,
            fontSize:scaleSize(20),
            marginLeft:scaleSize(10)
        },
        reg_readagreed_btn:{


        },
        reg_readagreed_btn_text:{
            color:ETTColor.f4,
            fontSize:scaleSize(20),
            marginLeft:scaleSize(10)
        },
        reg_bottom:{
            justifyContent: 'center',
            flexDirection:'row',
            alignItems:'center',
            marginBottom:scaleSize(45)

        },
        reg_bottom_left:{
            color:ETTColor.f1,
            fontSize:scaleSize(24),


        },
        reg_bottom_right:{
            color:ETTColor.f2,
            fontSize:scaleSize(24),
            marginLeft:scaleSize(5)
        },
        reg_otherlog:{
            justifyContent: 'center',
            flexDirection:'row',
            alignItems:'center',
            marginTop:(30),
            marginBottom:scaleSize(82),
        },

        reg_vercode_text:{
            color:ETTColor.f4,
            fontSize:scaleSize(26)
        },
        reg_toast:{
            backgroundColor:ETTColor.black_t60,
        }

    });

module.exports = ETTRegisteredStyle;