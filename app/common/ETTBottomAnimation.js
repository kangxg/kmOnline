import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableHighlight,
    Animated,
    Easing,
    Dimensions, Platform,
} from 'react-native';

import  ETTDevice from '../res/values/ETTDevice';
import {scaleSize} from "../res/values/ETTInlineFuction";
import * as StatusBarManager from "react-native/Libraries/Components/StatusBar/StatusBar";

// const [aWidth, aHeight] = [ETTDevice.ScreenWidth, 214];
const [aWidth, aHeight] = [ETTDevice.ScreenWidth, scaleSize(388)];
const [middleLeft, middleTop] = [(ETTDevice.ScreenWidth - aWidth) / 2, (ETTDevice.ScreenHeight - aHeight) / 2];


const animationStyles = StyleSheet.create({
    container: {
        position:"absolute",
        width:ETTDevice.ScreenWidth,
        height:ETTDevice.ScreenHeight,
        left:0,
        top:0,
    },
    mask: {
        justifyContent:"center",
        backgroundColor:"#383838",
        opacity:0.8,
        position:"absolute",
        width:ETTDevice.ScreenWidth,
        height:ETTDevice.ScreenHeight,
        left:0,
        top:0,
    },
    tip: {
        width:aWidth,
        height:aHeight,
        left:middleLeft,
        backgroundColor:"#fff",
        alignItems:"center",
        justifyContent:"space-between",
    },
    tipTitleView: {
        height:scaleSize(96),//55,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    tipTitleText:{
        color:"#999999",
        fontSize:14,
    },
    tipContentView: {
        width:aWidth,
        borderTopWidth:0.5,
        borderColor:"#f0f0f0",
        height:scaleSize(96),//45,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    tipText:{
        color:"#333333",
        fontSize:17,
        textAlign:"center",
    },
    button: {
        height: scaleSize(96),//45,
        backgroundColor: '#fff',
        borderTopWidth:0.5,
        borderColor: '#f0f0f0',
        //borderWidth: 1,
        //borderRadius: 4,
        alignSelf: 'stretch',
        justifyContent: 'center',
        //marginLeft: 10,
        //marginRight: 10,
    },
    buttonText: {
        fontSize:17,
        color:"#999999",
        textAlign:"center",
    },

});


export default class AnimationBase extends Component{



    constructor(props){
        super(props);
        this.showView = this.showView.bind(this)
        this.hiddenView = this.hiddenView.bind(this)
        console.log('我是AnimationBase')
        this.state = {
            offset:new Animated.Value(0),
            opacity:new Animated.Value(0),
            title:"",
            choose1:"",
            choose2:"",
            hide:true,
        };
    }

    commentWillMount(){

    }



    render(){
        if(this.state.hide){
            return(<View />)
        }else{
            let h = ETTDevice.ScreenHeight-scaleSize(428)-44 -(Platform.OS === "ios" ? 0 : StatusBarManager.currentHeight);
            return(
                <View style={animationStyles.container}>
                    <Animated.View style={animationStyles.mask}>

                    </Animated.View>

                    <Animated.View style={[animationStyles.tip,{transform:[{
                        translateY:this.state.offset.interpolate({
                            inputRange:[0,1],
                            outputRange:[ETTDevice.ScreenHeight,ETTDevice.ScreenHeight-scaleSize(388)-scaleSize(88) -(Platform.OS === "ios" ? scaleSize(40) : StatusBarManager.currentHeight)],
                        }),
                        }]
                    }]}>
                        <View style={animationStyles.tipTitleView}>
                            <Text style={animationStyles.tipTitleText}>{this.state.title}</Text>

                        </View>
                        <TouchableHighlight style={animationStyles.tipContentView} underlayColor='#f0f0f0' onPress={this.choose.bind(this,this.state.choose1)}>
                            <Text style={animationStyles.tipText}>{this.state.choose1}</Text>
                        </TouchableHighlight>

                        <TouchableHighlight style={animationStyles.tipContentView} underlayColor='#f0f0f0' onPress={this.choose.bind(this,this.state.choose2)}>
                            <Text style={animationStyles.tipText}>{this.state.choose2}</Text>

                        </TouchableHighlight>

                        <TouchableHighlight style={animationStyles.tipContentView} underlayColor='#f0f0f0' onPress={this.iknow.bind(this)}>
                            <Text style={animationStyles.buttonText}>取消</Text>

                        </TouchableHighlight>

                    </Animated.View>

                </View>
            )
        }
    }

    // 显示动画
    in(){
        Animated.parallel([
            Animated.timing(
                this.state.opacity,
                {
                    easing:Easing.linear,
                    duration:500,
                    toValue:0.8,
                }
            ),
            Animated.timing(
                this.state.offset,
                {
                    easing:Easing.linear,
                    duration:500,
                    toValue:1,
                }
            )
        ]).start();
    }

    // 隐藏动画
    out(){
        Animated.parallel([
            Animated.timing(
                this.state.opacity,
                {
                    easing:Easing.linear,
                    duration:500,
                    toValue:0,
                }
            ),
            Animated.timing(
                this.state.offset,
                {
                    easing:Easing.linear,
                    duration:500,
                    toValue:0,
                }
            )
        ]).start();

        setTimeout(
            () => this.setState({hide:true}),
            500
        );
    }

    // 取消
    iknow(event){
        if(!this.state.hide){
            this.out();
        }
    }

    // 选择
    choose(msg){
        if(!this.state.hide){
            this.out();
        }

        let callback = this.props.callback
        if(callback != null){
           callback(msg)
        }
    }

    hiddenView(){
        if(!this.state.hide){
            this.out();
        }
    }


    showView(title: string, choose1:string,choose2:string ,obj:Object) {

        if(this.state.hide){
            this.setState({title: title, choose1: choose1, choose2: choose2, hide: false}, this.in);
        }
    }
}
