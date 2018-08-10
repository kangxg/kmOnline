
import React, { Component } from 'react';
import {
    Platform,
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';

import {ETTHeaderStyles,ETTWitheHeaderStyles} from '../res/styles/ETTHeaderStyles';
export  class ETTGoBackView extends Component{
    constructor(props) {
        super(props);

    }
    showBackImage()
    {

        return  this.props.showImage? <Image style={ETTHeaderStyles.headerBackImageStyle} source={require('../res/images/nav_tab_cwhite.png')} />:null
    }
    showBackText()
    {
        return  this.props.showText?<Text style={ETTHeaderStyles.headerBackTextStyle} >{this.props.showText}</Text>:null
    }
    callback()
    {
        let callback = this.props.onPress;
        if (callback)
        {
            callback();
        }
    }
    render(){
        return (
            <TouchableOpacity onPress={()=>this.callback()}>
                <View style={ETTHeaderStyles.headerBackStyle}>
                    {this.showBackImage()}
                    {this.showBackText()}
                </View>
            </TouchableOpacity>

        )
    }
}

export  class ETTDarkGoBackView extends ETTGoBackView{
    showBackImage()
    {

        return  this.props.showImage? <Image style={ETTWitheHeaderStyles.headerBackImageStyle} source={require('../res/images/km_back.png')} />:null
    }
    showBackText()
    {
        return  this.props.showText?<Text style={ETTWitheHeaderStyles.headerBackTextStyle} >{this.props.showText}</Text>:null
    }
}

