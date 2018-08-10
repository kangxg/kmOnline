import React from 'react';
import {
    StyleSheet
} from 'react-native';

import ETTDevice from "../values/ETTDevice";
import ETTColor from  '../values/ETTColor';
import {scaleSize,adaptationText} from "../values/ETTInlineFuction";

var ETTAlertStyles = StyleSheet.create(
    {
        container: {
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: 'rgba(1, 1, 1, 0.3)'
        },
        base_contentContainer: {
            justifyContent: 'space-between',
            backgroundColor:ETTColor.white,
            alignItems: 'center',
            borderColor: ETTColor.l1,
            borderWidth: 1,
            height: scaleSize(351),
            width: scaleSize(516),
            borderRadius: 5,
        },
        base_promptContainer: {

            width: scaleSize(516),
            alignItems: 'center',
            justifyContent: 'center',
            marginTop:scaleSize(50),
            marginBottom:scaleSize(15),
        },
        base_titletext:{
            fontSize:scaleSize(30),
            color:ETTColor.f1,

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
        base_line: {
            height:scaleSize(90) ,
            width: 1,
            backgroundColor: ETTColor.l1
        },
        center: {
            justifyContent: 'center',
            alignItems: 'center'
        },
        base_button_text:{
           fontSize:scaleSize(30),
           color:ETTColor.f1,
        },
        base_button_cancel:{

        },
        base_button_enter:{

        },
        alert_outside: {
            flex: 1,
            alignItems: 'center',
            paddingTop: 140
        },
        alert_bind_bindname:{
            fontSize:scaleSize(24),
            color:ETTColor.f2,
        },
        alert_bind_nickname:{
          marginLeft:scaleSize(8)
        },
        alert_bind_content:{
            flexDirection: 'row',
             marginTop:scaleSize(86)
        }
    });

module.exports = ETTAlertStyles;