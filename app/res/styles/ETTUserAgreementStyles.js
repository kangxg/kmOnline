import React from 'react';
import {
    Platform,
    StyleSheet
} from 'react-native';

import ETTDevice from "../values/ETTDevice";
import ETTColor from '../../res/values/ETTColor';
import {scaleSize} from "../values/ETTInlineFuction";
var ETTUserAgreementStyles = StyleSheet.create(
    {
        main_user_header: {
            flexDirection:'row',
            marginTop:Platform.OS === "ios" ? scaleSize(39):0,
            height:scaleSize(88),
            justifyContent: 'flex-start',
            alignItems:'center',
            backgroundColor:ETTColor.white,
        },
        header: {
            flexDirection:'row',
            marginTop:scaleSize(39),
            height:scaleSize(88),
            justifyContent: 'flex-start',
            alignItems:'center',
            //marginBottom:scaleSize(88),
            backgroundColor:ETTColor.white,

        },
        main_user_scrollView:{
            width:ETTDevice.ScreenWidth,
            // height:ETTDevice.ScreenHeight - scaleSize(90)*2 - scaleSize(30),
            height:ETTDevice.ScreenHeight - scaleSize(134),
            flex:1,
            //position: 'absolute',

        },
        main_user_arg:{
           padding:scaleSize(24),
           // backgroundColor:ETTColor.black_t60,

        },

        main_user_arg_p:{
            marginTop:scaleSize(12),
            fontSize:scaleSize(28),
            lineHeight:scaleSize(45),

        },

        main_user_arg_h1:{
            marginTop:scaleSize(24),
            marginBottom:12,

        },

        main_user_arg_more_line:{
           paddingLeft:scaleSize(24),

        },

        main_user_arg_h3:{
            marginTop:scaleSize(24),
            fontSize:scaleSize(32),

            marginBottom:scaleSize(12),
            fontWeight:'800',
        },
    }
);

module.exports = ETTUserAgreementStyles;