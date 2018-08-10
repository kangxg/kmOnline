import React from 'react';
import {
    StyleSheet
} from 'react-native';

import  ETTDevice from '../values/ETTDevice';
import  ETTColor  from '../values/ETTColor';
import {scaleSize} from "../values/ETTInlineFuction";

var ETTModalLogStyles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: ETTColor.c2,
        width:ETTDevice.ScreenWidth
    },
})

module.exports = ETTModalLogStyles;