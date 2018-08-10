import React from 'react';
import {Platform, StyleSheet} from 'react-native';

import ETTDevice from "../values/ETTDevice";
import ETTColor from '../../res/values/ETTColor';
import {scaleSize} from "../values/ETTInlineFuction";


var ETTLogStyles = StyleSheet.create(
    {
        log_Mian: {
            flex: 1,
            backgroundColor: ETTColor.white,
            width:ETTDevice.ScreenWidth,
            height:ETTDevice.ScreenHeight
        },

        log_body:{
            flex: 2,
            justifyContent: 'space-between',
            backgroundColor: ETTColor.white,

        },


        log_body_top:{

            //height:300,

        },
        log_close_btn:{
            marginLeft:scaleSize(36),
            marginTop:Platform.OS === "ios" ? scaleSize(80):scaleSize(30),
            width:scaleSize(44),
            height:scaleSize(34),
        },
        log_close:{
            width:scaleSize(24),
            height:scaleSize(24),
        },
        log_title:{
           fontSize:scaleSize(40),
           color:ETTColor.f1,
            textAlign: 'center',
            marginTop:scaleSize(20),
            marginBottom:scaleSize(46)
        },
        log_pushscene_header:{
            flexDirection:'row',
            marginTop:Platform.OS === 'ios'?scaleSize(80):scaleSize(30),
            justifyContent: 'flex-start',
            alignItems:'center',
            marginBottom:scaleSize(46)

        },
        log_bind_header: {
            flexDirection:'row',
            marginTop:scaleSize(80),
            justifyContent: 'flex-start',
            alignItems:'center',

        },
        log_bind_amount_prompt:{
            fontSize:scaleSize(20),
            color:ETTColor.f2,
            textAlign: 'center',
            marginTop:scaleSize(70),
            //marginBottom:scaleSize(26)
        },
        log_back:{
            marginLeft:scaleSize(36),
        },
        log_code_title:{
            fontSize:scaleSize(40),
            color:ETTColor.f1,
            textAlign: 'center',
            width:ETTDevice.ScreenWidth-scaleSize(118),

        },
        log_body_bottom:{

             marginBottom:0,

        },
        log_input_top:{
            justifyContent: 'space-between',
            //marginTop:scaleSize(39),
            marginLeft:scaleSize(75),
            marginRight:scaleSize(75),
            flexDirection:'row',
            alignItems:'center',
            //backgroundColor:ETTColor.l1


        },
        log_input_Bottom:{

            justifyContent: 'space-between',
            marginTop:scaleSize(76),
            marginLeft:scaleSize(75),
            marginRight:scaleSize(75),
            flexDirection:'row',
            alignItems:'center',

        },
        log_textInput:{
            fontSize:scaleSize(26),
            width:ETTDevice.ScreenWidth-scaleSize(200),
            height:scaleSize(80),
            color:ETTColor.f1,
        },
        log_code_textInput:{
            fontSize:scaleSize(26),
            height:scaleSize(80),
            width:(ETTDevice.ScreenWidth-scaleSize(150))/2,
            color:ETTColor.f1,
        },
        log_input_phone_image:{
            width:scaleSize(20),
            height:scaleSize(20),
        },
        log_input_pwd_image:{
            width:scaleSize(28),
            height:scaleSize(19),
        },
        log_line:{
            marginLeft:scaleSize(75),
            marginRight:scaleSize(75),
            marginTop:scaleSize(15),
            marginBottom:scaleSize(15),
            height:1,
            backgroundColor:ETTColor.l1,
        },

        log_btn:{

            marginLeft:scaleSize(73),
            marginRight:scaleSize(73),
            marginTop:scaleSize(74),
            height:scaleSize(85),
            backgroundColor:ETTColor.black_t60,
            justifyContent: 'center',
            borderRadius:scaleSize(8)

        },
        log_btn_text:{

            textAlign: 'center',
            color: ETTColor.white,
            fontSize:scaleSize(26),

        },
        log_body_top_bottom:{

            marginLeft:scaleSize(75),
            marginRight:scaleSize(75),
            marginTop:scaleSize(38),
            justifyContent: 'flex-end',
            flexDirection:'row',
            alignItems:'center',


        },
        log_code_btn:{
            justifyContent: 'center',
            marginRight:scaleSize(38),
        },
        log_code_btn_text:{
            textAlign: 'center',
            fontSize:scaleSize(24),
            color:ETTColor.f2,
        },
        log_forget_btn:{
            justifyContent: 'center',

        },
        log_forget_btn_text:{
            textAlign: 'center',
            fontSize:scaleSize(24),
            color:ETTColor.f2,
        },

        log_registered_btn:{
            justifyContent: 'center',
            marginLeft:scaleSize(340),
            marginRight:scaleSize(340),
            // marginTop:scaleSize(400),

        },
        log_registered_btn_text:{
            textAlign: 'center',
            fontSize:scaleSize(28),
            color:ETTColor.f1,
        },
        log_other_text:{
            marginLeft:scaleSize(28),
            marginRight:scaleSize(28),
            marginTop:scaleSize(50),
            fontSize:scaleSize(28),
            textAlign: 'center',
            color:ETTColor.f1,
        },
        log_otherlog:{
            justifyContent: 'center',
            flexDirection:'row',
            alignItems:'center',
            marginTop:(30),
            marginBottom:scaleSize(52),
        },
        log_qq_log:{
           marginLeft:scaleSize(40)
        },
        log_wechat_log:{

        },

        log_vercode_text:{
            color:ETTColor.f4,
            fontSize:scaleSize(26)
        },
        log_vercode_text_counting:{
            color:'gray',
            fontSize:scaleSize(26)
        },
        log_btn_bind:{
            marginLeft:scaleSize(73),
            marginRight:scaleSize(73),
            marginTop:scaleSize(185),
            height:scaleSize(85),
            backgroundColor:ETTColor.black_t60,
            justifyContent: 'center',
            borderRadius:scaleSize(8)
        },
        log_bind_newreg:{
            marginLeft:ETTDevice.ScreenWidth/2 -scaleSize(70),
            width:scaleSize(140),
            marginTop:scaleSize(40),
            backgroundColor:'red'
        },
        log_bind_newreg_btn:{
            marginLeft:ETTDevice.ScreenWidth/2 -scaleSize(70),
            width:scaleSize(140),
            marginTop:scaleSize(40),
            // marginRight:scaleSize((ETTDevice.ScreenWidth-140)/2),

        },
        log_bind_newreg_text:{

            color:ETTColor.f1,
            textAlign: 'center',
            fontSize:scaleSize(24)

        },

        log_forgetpwd_header: {
            flexDirection:'row',
            marginTop:Platform.OS === "ios" ? scaleSize(80):scaleSize(30),
            justifyContent: 'flex-start',
            alignItems:'center',
            marginBottom:scaleSize(88),

        },

        log_forgetpwd_next_btn: {
            marginLeft:scaleSize(73),
            marginRight:scaleSize(73),
            marginTop:scaleSize(184),
            height:scaleSize(85),
            backgroundColor:ETTColor.black_t60,
            justifyContent: 'center',
            borderRadius:scaleSize(8)

        },
        log_toast:{
            backgroundColor:ETTColor.black_t60,
        }

    });

module.exports = ETTLogStyles;