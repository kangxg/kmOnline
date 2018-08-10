import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';



import  ETTString from '../res/values/ETTString';
import  payResultStyle from '../res/styles/ETTPayResultStyle';


export default class ETTPayFailureView extends Component{
    constructor(props){
        super(props)
        console.log('我是ETTPayFailureView')
    }

    onPress(){
        let callBack=this.props.callBack;
        if (callBack){
            callBack();
        }
    }

    render(){
        return (
            <View style={payResultStyle.mainViewStyle}>
                <View style={payResultStyle.topCloseViewStyle}>
                    <TouchableOpacity
                        onPress={()=> this.onPress()}
                    >
                        <Image style={payResultStyle.topCloseImgStyle} source={require('../res/images/close.png')}/>
                    </TouchableOpacity>
                </View>
                <Image style={payResultStyle.payFailureImgStyle} source={require('../res/images/failure-2.png')}/>
                <View style={payResultStyle.failureBottomTitleViewStyle}>
                    <Text style={payResultStyle.payFailureTextStyle}>
                        {ETTString.pay_failure_result}
                    </Text>
                </View>
            </View>
        )
    }
}