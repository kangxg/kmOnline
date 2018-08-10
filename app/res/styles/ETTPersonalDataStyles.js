import React from 'react';
import {Platform, StyleSheet} from 'react-native';

import ETTDevice from "../values/ETTDevice";
import ETTColor from '../values/ETTColor';
import {scaleSize} from "../values/ETTInlineFuction";


var ETTPersonalDataStyles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: ETTColor.white,
        width:ETTDevice.ScreenWidth
    },
    header: {
        flexDirection:'row',
        marginTop:Platform.OS === "ios" ?scaleSize(39):0,
        height:scaleSize(88),
        justifyContent: 'flex-start',
        alignItems:'center',
        //marginBottom:scaleSize(88),
        backgroundColor:ETTColor.white,

    },
    title:{
        fontSize:scaleSize(36),
        marginLeft:scaleSize(36),
        color:ETTColor.f1,
        textAlign: 'center',
        width:ETTDevice.ScreenWidth-scaleSize(168),

    },
    base_row:{

        marginTop:0,
        justifyContent:'flex-end',
        flexDirection: 'row',
        alignItems:'center',
        width:ETTDevice.ScreenWidth,
        height:scaleSize(124),
        backgroundColor:ETTColor.white,
    },
    base_row_title:{

        fontSize:scaleSize(28),
        paddingLeft:scaleSize(36),
        textAlign: 'left',
        color:ETTColor.f1,
        width:ETTDevice.ScreenWidth/2,
    },
    base_row_right:{
        width:ETTDevice.ScreenWidth/2,
        backgroundColor: ETTColor.white,
        justifyContent:'flex-end',
        flexDirection: 'row',
        alignItems:'center',
        alignSelf:'auto'
    },
    base_row_image:{
        width:scaleSize(82),
        height:scaleSize(82),
        marginRight:scaleSize(36),
    },
    base_row_arrow_image:{
        width:scaleSize(12),
        height:scaleSize(19),
        marginRight:scaleSize(42),
    },
    row_line:{
        height:1,
        marginLeft:scaleSize(36),
        marginRight:scaleSize(30),
        backgroundColor:ETTColor.l1,
    },
    header_line:{
        height:1,
        marginLeft:0,
        marginRight:0,
        backgroundColor:ETTColor.l1,
    },
    row_textInput:{
        fontSize:scaleSize(28),
        width:ETTDevice.ScreenWidth/2-scaleSize(90),
        color:ETTColor.c9,
        marginRight:scaleSize(36),
        textAlign: 'right',
    },

});

module.exports = ETTPersonalDataStyles;