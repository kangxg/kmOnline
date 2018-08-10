import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    StatusBar
} from 'react-native';
import ETTHeaderStyles from  '../res/styles/ETTHeaderStyles';
export class ETTLightStatus extends Component {
    render() {
        return (

                <StatusBar
                    animated={true} //指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden
                    hidden={false}  //是否隐藏状态栏。
                    networkActivityIndicatorVisible ={false}//仅作用于ios。是否显示正在使用网络。
                    showHideTransition={'fade'}//仅作用于ios。显示或隐藏状态栏时所使用的动画效果（’fade’, ‘slide’）。
                    backgroundColor={ETTHeaderStyles.headerStyle} //状态栏的背景色
                    translucent={false}//指定状态栏是否透明。设置为true时，应用会在状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。
                    barStyle={'light-content'} // enum('default', 'light-content', 'dark-content')
                >
                </StatusBar>


        );
    }
}


export  class ETTDarkStatus extends Component {
    render() {
        return (
            <StatusBar
                animated={true} //指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden
                hidden={false}  //是否隐藏状态栏。
                backgroundColor={'white'} //状态栏的背景色
                translucent={false}//指定状态栏是否透明。设置为true时，应用会在状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。
                barStyle={'dark-content'} // enum('default', 'light-content', 'dark-content')
                networkActivityIndicatorVisible ={false}//仅作用于ios。是否显示正在使用网络。
                showHideTransition={'fade'}
            >
            </StatusBar>

        );
    }
}

