import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';



import  payResultStyle from '../res/styles/ETTPayResultStyle';
import  ETTString from '../res/values/ETTString';

export default class ETTPaySuccessView extends Component{
    constructor(props){
        super(props)
        console.log('我是ETTPaySuccessView')
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
                            onPress={() => this.onPress()}
                        >
                            <Image style={payResultStyle.topCloseImgStyle} source={require('../res/images/close.png')}/>
                        </TouchableOpacity>
                    </View>
                    <Image style={payResultStyle.paySuccessImgStyle} source={require('../res/images/group-3.png')}/>
                    <View style={payResultStyle.bottomTitleViewStyle}>
                        <Text style={payResultStyle.haveBuyTextStyle}>
                            {ETTString.pay_success_resultPrompt}
                        </Text>
                        <Text style={payResultStyle.courseNameTextStyle}>
                            沁园春雪课程
                        </Text>
                        <Text style={payResultStyle.noticeTextStyle}>
                            {ETTString.pay_success_resultTitle}
                        </Text>
                    </View>
                </View>
        )
    }
}