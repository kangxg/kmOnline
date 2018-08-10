import React from 'react';
import {
    StyleSheet
} from 'react-native';

import ETTDevice from "../values/ETTDevice";
import ETTColor from  '../values/ETTColor';
import {scaleSize,adaptationText} from "../values/ETTInlineFuction";

var ETTLoadingAnimationStyles = StyleSheet.create(
    {
        container: {
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
        },
        base_contentContainer: {
            justifyContent: 'center',

            alignItems: 'center',

            // borderWidth: 1,
            // height: scaleSize(351),
            // width: scaleSize(516),

        },

        base_titletext:{
            fontSize:scaleSize(30),
            color:ETTColor.f1,

        },
        base_activity:{
            marginTop:(ETTDevice.ScreenHeight-80)/2,
            width:100,
            height:80,
            backgroundColor:ETTColor.black_t60,
            borderColor: ETTColor.l1,
            borderRadius: 5,
            opacity:0.8

        },
        base_buttonContainer: {
            height: scaleSize(90),
            width: scaleSize(516),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTopWidth: 1,
            borderColor: ETTColor.l1
        },


    });

module.exports = ETTLoadingAnimationStyles;