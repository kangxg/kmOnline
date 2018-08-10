import React from 'react';
import {
    StyleSheet
} from 'react-native';

import {leftStartPoint,componentWidth} from "../values/ETTDevice";
import ETTColor from '../../res/values/ETTColor';
var ETTMainStyles = StyleSheet.create(
    {
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: ETTColor.c2
        },

        textPromptStyle: {
            fontSize: 20,
            backgroundColor: 'yellow',
            textAlign: 'justify',
            color: 'red'
        },
        bigTextPrompt: {
            width: 300,
            backgroundColor: 'gray',
            color: 'white',
            textAlign: 'center',
            fontSize: 20
        },
    });

module.exports = ETTMainStyles;