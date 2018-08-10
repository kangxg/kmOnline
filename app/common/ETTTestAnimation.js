import React, { Component } from 'react';
import {
    View,
    TouchableHighlight,
    Animated,
    Easing,
    Dimensions,
} from 'react-native';

import ETTPaySuccessView from './ETTPaySuccessView';
import ETTPayFailureView from './ETTPayFailureView';
import payResultStyle from '../res/styles/ETTPayResultStyle';
import {scaleSize} from "../res/values/ETTInlineFuction";

const {width, height} = Dimensions.get('window');
const navigatorH = 64;
const [aWidth, aHeight] = [300, 214];
const [left, top] = [0, 0];
const [middleLeft, middleTop] = [(width - aWidth) / 2, (height - aHeight) / 2 - navigatorH];


export default class ETTTestAnimation extends Component {
    parent ={};

    constructor(props) {
        super(props);
        console.log('我是ETTTestAnimation')
        this.state = {
            offset: new Animated.Value(0),// 偏移量
            opacity: new Animated.Value(0),// 透明度
            hide: false,
        };

    }

    // 弹出支付或成功视图的关闭按钮点击事件
    _callBcak(){
        this.out()
        let callBack=this.props.callBack;
        if (callBack){
            callBack();
        }
    }

    render() {
        if(this.state.hide){
            return (<View />)
        } else {
            return (
                <View style={payResultStyle.container} >


                        <Animated.View style={ payResultStyle.mask } >
                            {/*<TouchableHighlight onPress={()=>this._callBcak()}>*/}
                            {/*<View>*/}

                            {/*</View>*/}
                            {/*</TouchableHighlight>*/}

                        </Animated.View>




                    <Animated.View style={[payResultStyle.tip , {transform: [{
                        // interpolate差值函数 接收一个输入区间，映射到另一个输出区间
                            // interpolate还支持到字符串的映射，从而可以实现颜色以及带有单位的值的动画变换。例如你可以像下面这样实现一个旋转动画：
                            translateY: this.state.offset.interpolate({
                                inputRange: [0, 1],
                                outputRange: [height, scaleSize(-100)]
                            }),
                        }]
                    }]}>

                        <ETTPaySuccessView callBack={()=>this._callBcak()}/>
                        {/*<ETTPayFailureView callBack={()=>this._callBcak()}/>*/}
                    </Animated.View>
                </View>
            );
        }
    }

    componentDidMount() {
        this.show("haha")
        console.log('ETTTestAnimation加载完成')
    }

    //组件将被卸载
    componentWillUnmount(){
        console.log('ETTTestAnimation将要被卸载了')
    }



    //显示动画
    in() {
        Animated.parallel([
            Animated.timing(
                this.state.opacity,
                {
                    easing: Easing.linear,
                    duration: 500,
                    toValue: 0.8,
                }
            ),
            Animated.timing(
                this.state.offset,
                {
                    easing: Easing.linear,
                    duration: 500,
                    toValue: 1,
                }
            )
        ]).start();
    }

    //隐藏动画
    out(){
        Animated.parallel([
            Animated.timing(
                this.state.opacity,
                {
                    easing: Easing.linear,// 缓动函数
                    duration: 500,// 动画时间
                    toValue: 0,// 目标值
                }
            ),
            Animated.timing(
                this.state.offset,
                {
                    easing: Easing.linear,
                    duration: 500,
                    toValue: 0,
                }
            )
        ]).start();

        setTimeout(
            () => this.setState({hide: true}),
            500
        );
    }

    //取消
    iknow(event) {
        if(!this.state.hide){
            this.out();
        }
    }

    //选择
    choose(msg) {
        //console.log(msg);
        if(!this.state.hide){
            this.out();
            // this.parent.setState({sex:msg});
        }
    }

    // show(title: string, choose1:string,choose2:string ,obj:Object) {
    //     this.parent = obj;
    //     if(this.state.hide){
    //         this.setState({title: title, choose1: choose1, choose2: choose2, hide: false}, this.in);
    //     }
    // }


    show(title: string) {
        // this.parent = obj;
        // if(this.state.hide){
            this.setState({hide: false}, this.in);
        // }
    }
}