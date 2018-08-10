import React from 'react';
import {
    StyleSheet
} from 'react-native';

import {leftStartPoint,componentWidth} from "../values/ETTDevice";
import {scaleSize} from "../values/ETTInlineFuction";
import ETTColor from '../values/ETTColor';
var ETTHeaderStyles = StyleSheet.create(
    {
        headerStyle: {
            backgroundColor: '#1C1D21'
        },

        headerTitleStyle: {
            flex:1,
            alignSelf:'center',
            fontSize: scaleSize(36),
            color: ETTColor.white,
            textAlign: 'center',
            fontWeight: 'normal',
        },
        headerTitleBackStyle: {

            fontSize: scaleSize(28),
            color: ETTColor.white,
            marginLeft:scaleSize(15),
        },
        headerBackStyle:{
            // flex:1,
            // justifyContent:'space-around',
            // flexDirection: 'row',
            // alignItems:'center',
            // alignSelf:'auto',
            flexDirection:"row",
            alignItems:"center",



        },
        headerBackImageStyle:{
            height:scaleSize(34),
            width:scaleSize(21),
            marginLeft:scaleSize(15)
        },
        headerBackTextStyle:{
            fontSize: scaleSize(28),
            color: ETTColor.white,
            marginLeft:scaleSize(15),
        },
        bigTextPrompt: {
            width: 300,
            backgroundColor: 'gray',
            color: 'white',
            textAlign: 'center',
            fontSize: 20
        },
    });

// module.exports = ETTHeaderStyles;


var ETTWitheHeaderStyles = StyleSheet.create(
    {
        headerStyle: {
            backgroundColor: ETTColor.white,
            elevation:0,
            height:scaleSize(88),
            shadowOpacity:0,
            borderBottomWidth: 0,
        },

        headerTitleStyle: {
            flex:1,
            alignSelf:'center',
            fontWeight: 'normal',
            fontSize: scaleSize(36),
            color: ETTColor.f1,
            textAlign: 'center',
        },
        headerBackImageStyle:{
            height:scaleSize(34),
            width:scaleSize(21),
            marginLeft:scaleSize(30)
        },
        headerBackTextStyle:{
            fontSize: scaleSize(28),
            color: ETTColor.f1,
            marginLeft:scaleSize(15),
        },
        bigTextPrompt: {
            width: 300,
            backgroundColor: 'gray',
            color: 'white',
            textAlign: 'center',
            fontSize: 20
        },
    });


module.exports =  {ETTHeaderStyles,ETTWitheHeaderStyles};