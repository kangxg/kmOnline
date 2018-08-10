import React, { Component } from 'react';
import {
    Platform,
    View,
    Image,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';
import ETTHeaderStyles from  '../res/styles/ETTHeaderStyles';

import ETTLogStyles from '../res/styles/ETTLogStyles';
export class ETTEditView extends Component {
    _textInput:TextInput;
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            textvisible:true,
            keyboardType:'default',

        };
    }
    imageView()
    {

    }
    rightView()
    {
        return this.imageView()
    }
    placeholder()
    {
        return this.props.placeholder;
    }
    inputStyle()
    {
        return ETTLogStyles.log_textInput
    }
    imageCallBack()
    {

    }
    valueChange(text)
    {
        this.setState(
            {
                text:text,
            });
        let callback = this.props.changeHandle;
        if(callback)
        {
            callback(text)
        }
    }
    render() {
        return (

            <View style ={ETTLogStyles.log_input_top}>
                <TextInput    ref={inputView =>this._textInput = inputView}
                              style ={this.inputStyle()}
                              placeholder={this.placeholder() }
                              underlineColorAndroid='transparent'
                              secureTextEntry={this.state.textvisible}
                              value = {this.state.text}
                              keyboardType ={this.state.keyboardType}
                              maxLength    = {this.props.maxLength}
                              onChangeText={(text)=>this.valueChange(text)}>

                </TextInput>

                {this.rightView()}
            </View>

        );
    }
}



export class ETTEditPhoneView extends  ETTEditView {

    componentWillMount()
    {
        this.setState(
            {
                textvisible:false,
                keyboardType:'phone-pad'
            });
    }
    imageView()
    {
        return(

            <TouchableOpacity onPress={() => this.imageCallBack()} >
                <Image style={ETTLogStyles.log_input_phone_image}
                       source={require('../res/images/tab_c9_close.png')}/>
            </TouchableOpacity>
        );

    }

    imageCallBack()
    {
        if (this._textInput)
        {
            this.setState(
                {
                    text:'',
                });
        }

    }



}

export class ETTEditPhoneCodeView extends ETTEditPhoneView {

    imageView()
    {
        return   null
    }

}


export class ETTEditPwdView extends  ETTEditView {

    componentWillMount()
    {
        this.setState(
            {

                keyboardType:'default'
            });
    }
    imageView()
    {
        return(
                <TouchableOpacity  onPress={() => this.imageCallBack()}>
                        <Image style={ETTLogStyles.log_input_pwd_image}
                        source={this.state.textvisible ==true? require('../res/images/tab_c9_hide.png') : require('../res/images/tab_c9_visible.png')}/>
               </TouchableOpacity>
            );

    }

    imageCallBack()
    {
        let visible = !this.state.textvisible;
        this.setState(
            {
                textvisible:visible,
            });
    }

}

export class ETTEditOldPwdView extends  ETTEditView {

    imageView()
    {
        return    null
    }

}
export class ETTEditCodeView extends  ETTEditView {

    constructor(props) {
        super(props)
        this.state = {
            timerCount: this.props.timerCount || 60,
            timerTitle: this.props.timerTitle || '获取短信验证码',
            counting: false,
            selfEnable: true,
        };
    }
    imageView()
    {
        return (
            <TouchableOpacity  ref='button' onPress={() => this.imageCallBack()  }  >
                <Text ref='buttontext' style={this.state.counting?ETTLogStyles.log_vercode_text_counting:ETTLogStyles.log_vercode_text}> {this.state.timerTitle}</Text>
            </TouchableOpacity>
        );
    }

    _shouldStartCountting(shouldStart){
        if (this.state.counting) {return}
        if (shouldStart) {
            this._countDownAction()
            this.setState({counting: true,selfEnable:false})
        }else{
            this.setState({selfEnable:true})
        }
    }
    componentWillUnmount(){
        clearInterval(this.interval)
    }

    _countdownAction()
    {
        const codeTime = this.state.timerCount;
        const now = Date.now()
        const overTimeStamp = now + codeTime * 1000 + 100/*过期时间戳（毫秒） +100 毫秒容错*/
        this.interval = setInterval(() =>{
            /* 切换到后台不受影响*/
            const nowStamp = Date.now()
            if(nowStamp >= overTimeStamp){

                /* 倒计时结束*/
                this.interval&&clearInterval(this.interval);
                this.setState({
                    timerCount: codeTime,
                    timerTitle: this.props.timerTitle || '获取短信验证码',
                    counting: false,
                    selfEnable: true
                })
                if (this.props.timerEnd) {
                    this.props.timerEnd()
                };
            }else{
                const leftTime = parseInt((overTimeStamp - nowStamp)/1000, 10)
                this.setState({
                    timerCount:leftTime,
                    timerTitle: `重新获取(${leftTime}s)`,
                    counting:true,
                    selfEnable:false
                })
            }
        },1000)

    }

    imageCallBack()
    {
        if(this.state.counting)
        {
            return;
        }
        else
        {
            let callback = this.props.getCodeHandle;
            if(callback)
            {
                callback();
            }
        }
    }
    inputStyle()
    {
        return ETTLogStyles.log_code_textInput
    }

}




