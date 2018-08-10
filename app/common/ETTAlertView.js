/**
 * Created by 康晓光 on 2017/5/18.  自定义弹出框视图
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Animated,
    Platform,
    TextInput,
    Image,
} from 'react-native';

import AlertStyles from '../res/styles/ETTAlertStyles';
/*
  自定义弹出框视图 基类
 */
export  class ETTAlertView extends Component {
    constructor(props) {
        super(props);
        this.show = this.show.bind(this);
        this._close = this._close.bind(this);
        this.state = {
            isShow: false,
            opacityAnimationValue: new Animated.Value(0),
            scaleAnimationValue: new Animated.Value(0),
            info:null
        }
    }

    // 打开对话框
    show(info) {
        this.setState({
            isShow: true,
            info:info

        });
        //Animated.parallel == 同时执行多个动画
        Animated.parallel([
            //Animated.timing == 推动一个值按照一个过渡曲线而随时间变化
            Animated.timing(this.state.opacityAnimationValue, {
                toValue: 1,
                duration: 200 + 100
            }),
            //Animated.spring == 产生一个基于Rebound和Origami实现的Spring动画。它会在toValue值更新的同时跟踪当前的速度状态，以确保动画连贯,比timing动画连贯流畅
            Animated.spring(this.state.scaleAnimationValue, {
                toValue: 1,
                duration: 200,
                friction: 5
            })
        ]).start();
    }

    // 关闭对话框
    _close() {
        this.setState({isShow: false});
        this.state.opacityAnimationValue.setValue(0);
        this.state.scaleAnimationValue.setValue(0);
    }
    //最外层 视图样式  子类 可根据需要重写
    outsideLayerStyles()
    {
        return AlertStyles.alert_outside
    }
    //头部 title content 容器 视图样式  子类 可根据需要重写
    promptContainerStyles()
    {
        return AlertStyles.base_promptContainer
    }
    //title 视图样式  子类 可根据需要重写
    titleStyles()
    {
        return AlertStyles.base_titletext
    }
    //title 标题 视图  子类 可根据需要重写
    titleView()
    {
        let  title = this.state.info.name +'绑定';
        if(title)
        {
            return <Text style={AlertStyles.base_titletext}>{title}</Text>
        }
        return null
    }
    //content 说明 视图样式  子类 可根据需要重写
    contentView()
    {
        return   null
    }
    //去定按钮回调
    enterBackcall()
    {
        this._close();
        let callback = this.props.ensureCallback;
        if(callback)
        {
            callback(this.state.info);
        }
    }
    buttomView()
    {
        return(
            <View style={AlertStyles.base_buttonContainer}>
                <TouchableOpacity
                    activeOpacity={0.75}
                    style={[AlertStyles.center, {flex: 4.5}]}
                    onPress={this._close}
                >
                    <Text style={AlertStyles.base_button_text}>{this.props.cancel}</Text>
                </TouchableOpacity>
                <View style={[AlertStyles.base_line]}/>
                <TouchableOpacity
                    activeOpacity={0.75}
                    style={[AlertStyles.center, {flex: 4.5}]}
                    onPress={() => this.enterBackcall()}
                >
                    <Text style={AlertStyles.base_button_text}>{this.props.enter}</Text>
                </TouchableOpacity>
            </View>

        );
    }
    render() {
        if (!this.state.isShow) return null;
        return (
            // 最外层是一个半透明的黑色蒙版背景,点击的时候对话框也会消失
            <Animated.View style={[AlertStyles.container, {opacity: this.state.opacityAnimationValue}]}>
                <TouchableOpacity
                                activeOpacity={1}
                                style={this.outsideLayerStyles()}
                                onPress={this._close}>
                    <Animated.View
                                style={[AlertStyles.base_contentContainer, {transform: [{scale: this.state.scaleAnimationValue}]}]}
                    >
                        <TouchableOpacity
                            activeOpacity={1}
                            style={this.promptContainerStyles()}
                        >
                            {this.titleView()}
                            {this.contentView()}
                        </TouchableOpacity>
                        {this.buttomView()}
                    </Animated.View>
                </TouchableOpacity>
            </Animated.View>
        )
    }
}

export  class ETTBindAmountAlertView extends ETTAlertView {
    constructor(props) {
        super(props);
    }

    contentView()
    {
        return (
            <View style={AlertStyles.alert_bind_content}>
                <View style={AlertStyles.center}>
                    <Text style={AlertStyles.alert_bind_bindname}>
                      {this.state.info.name+': '}
                    </Text>
                </View>

                <View style={AlertStyles.center}>
                    <Text style={[AlertStyles.alert_bind_bindname,AlertStyles.alert_bind_nickname]}>
                        {this.state.info.amount}
                    </Text>
                </View>

        </View>);
    }

}

export  class ETTInputAlertView extends ETTAlertView {
    constructor(props) {
        super(props);
    }

    contentView()
    {
        return     <View style={{flexDirection: 'row', margin: 15}}>
            <View style={[AlertStyles.center, {width: 230}]}>
                <TextInput
                    style={{fontSize: 16, color: '#999',width:150,padding:0}}
                    value={this.state.inputText}
                    autoFocus={true}
                    underlineColorAndroid="transparent"
                    onChangeText={text => this.setState({inputText:text})}
                />
            </View>
            <TouchableOpacity
                onPress={() => this.setState({inputText: ''})}
                style={[AlertStyles.center, {width: 20}]}>
                <Image
                    source={require('../res/images/tab_c9_close.png')}
                    style={{width: 18, height: 18}}
                />
            </TouchableOpacity>
        </View>
    }

}

