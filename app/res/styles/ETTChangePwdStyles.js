import React from 'react';
import {
    StyleSheet
} from 'react-native';
import ETTDevice from "../values/ETTDevice";
import ETTColor from '../../res/values/ETTColor';
import {scaleSize} from "../values/ETTInlineFuction";

var ETTChangePwdStyles = StyleSheet.create(
    {
        down_nav: {
            justifyContent: 'flex-end',
            marginTop:scaleSize(44),
            marginRight:scaleSize(75),
            flexDirection:'row',
            alignItems:'center',
        },

        down_nav_text: {
            alignSelf:'center',
            fontSize: scaleSize(24),
            color: ETTColor.f2,
            textAlign: 'center',
        },
        down_nav_image: {
            marginLeft:scaleSize(5),
        },
    });


module.exports =   ETTChangePwdStyles;