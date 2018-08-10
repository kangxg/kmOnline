import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    StyleSheet,
    StatusBar
} from 'react-native';
import {scaleSize} from "../res/values/ETTInlineFuction";
import ETTDevice from "../res/values/ETTDevice";

export default class ETTPayFinishView extends Component {
    constructor(props){
        super(props)
        StatusBar.setBarStyle('dark-content')// black  light-content
        var type = this.props.type ? this.props.type : 1
        this.state={
            visible:true,
            type:type,// 1成功 2失败
        }
    }

    // 购买成功页面
    _showSuccessView(){

    }

    // 购买失败页面
    _showFailView(){

    }

    // 点击返回订单页
    _backOrderPage(){
        let callback = this.props.callback
        if(callback){
            callback()
        }
    }


    render(){
        const arrowImage = this.state.type === 1 ? require('../res/images/right.png') : require('../res/images/Group 5.png');
        const titleNotic = this.state.type === 1? "您已成功购买"+this.props.courseName+"课程!":"支付失败!"
        const titleDesc = this.state.type === 1? "请在电脑上登录酷蒙在线学习\n" +
            "网址：www.ke.etiantian.com\n" +
            "北京四中网校祝您学有所成！":"请在个人中心重新支付!"
       return(
           <View style={styles.container}>
               <TouchableOpacity onPress={()=>{this._backOrderPage()}}>
                   <View style={{marginTop:scaleSize(66),marginLeft:scaleSize(25)}}>
                       <Image source={require('../res/images/back.png')} style={styles.leftArraw}/>
                   </View>

               </TouchableOpacity>
               <View style={styles.bottomView}>
                    <Image source={arrowImage} style={styles.imgStyle}/>
                   <Text style={styles.titleNotic}>{titleNotic}</Text>
                   <Text style={styles.titleDescri}>{titleDesc}</Text>
                   <TouchableOpacity onPress={()=>{this._backOrderPage()}}>
                       <View style={styles.backView}>
                           <Text style={styles.backText}>返回订单页</Text>
                       </View>
                   </TouchableOpacity>

               </View>
           </View>
              )

    }
}

const styles = StyleSheet.create({


    contents:{
        backgroundColor:'white',
        flex:1,
        flexDirection:'column',
        position:'absolute',
        left:0,
        top:0,
        width:ETTDevice.ScreenWidth,
        height:ETTDevice.ScreenHeight,
    },

    bottomView:{
      alignItems:'center',
      flexDirection:'column',
    },

    leftArraw:{
        // marginTop:scaleSize(),
        // marginLeft:scaleSize(66),
        width:scaleSize(21),
        height:scaleSize(34),
    },

    imgStyle:{
        width:scaleSize(150),
        height:scaleSize(155),
        alignSelf:'center',
        marginTop:scaleSize(293),
    },

    titleNotic:{
        marginTop:scaleSize(86),
        flexWrap:'wrap',
        textAlign:'center',
        color:'#333333',
        fontSize:scaleSize(32),
        marginLeft:scaleSize(150),
        marginRight:scaleSize(150),
    },

    titleDescri:{
        marginTop:scaleSize(40),
        marginLeft:scaleSize(150),
        marginRight:scaleSize(150),
        flexWrap:'wrap',
        textAlign:'center',
        color:'#999999',
        fontSize:scaleSize(28),
    },


    backView:{
        width:scaleSize(472),
        height:scaleSize(88),
        // marginLeft:scaleSize(139),
        marginTop:scaleSize(194),
        borderColor:'#00ADEF',
        borderWidth:scaleSize(2),
        alignItems:'center',
        justifyContent:'center',
    },

    backText:{
        color:'#00ADEF',
        fontSize:scaleSize(32),
    }






});