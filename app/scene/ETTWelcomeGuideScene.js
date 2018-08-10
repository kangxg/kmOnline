/*
   康晓光 2018-6-6  首次登录 欢迎引导页面
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Toast, {DURATION} from 'react-native-easy-toast'

import  LogStyles from '../res/styles/ETTLogStyles';
import  ETTDevice from '../res/values/ETTDevice';
import  {
    DataManager,
}  from '../res/values/ETTConfig';
import  {ETTDarkStatus} from '../common/ETTStatusBar';
import  ETTString  from '../res/values/ETTString';
import {ETTHeaderStyles} from "../res/styles/ETTHeaderStyles";
import {scaleSize} from "../res/values/ETTInlineFuction";


export default class  ETTWelcomeGuideScene extends   Component
{
    data:[] =  [require('../res/images/welcome_page_1.jpg'),require('../res/images/welcome_page_2.jpg')];

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    keyboardDismissMode='on-drag'
                    keyboardShouldPersistTaps='never'
                    showsVerticalScrollIndicator={true}
                    scrollEnabled={true}
                    pagingEnabled={true}
                    horizontal={true}
                    onContentSizeChange={(contentWidth, contentHeight)=>{
                        var msg = 'onContentSizeChange:'+contentWidth+','+contentHeight;
                        console.log(msg);

                    }}
                   >
                    {
                        this.data.map((item, index) => {

                          return  this.showWelcomeImage(item,index);
                        })
                    }
                </ScrollView>
            </View>
        );
    }

    showWelcomeImage(item,index)
    {
        console.log('showimage');
        //var color = index * 23 + 10;
        if (index == (this.data.length -1))
        {
            return   <View  key={index} style={styles.viewItem}>
                <Image  style={[styles.viewItem]} source={item} >

                </Image>
                <TouchableOpacity style = {styles.ViewForTextStyle} onPress={()=>this.comeinApp()}>
                    <View >
                        <Text   style={[styles.text]}>进入应用</Text>
                    </View>

                </TouchableOpacity>
                </View>

            //<Text  key={index} style={[styles.text,styles.viewItem,{backgroundColor:'#3B3C3E'}]}>{item}</Text>
        }
        else
        {
            return  <Image key={index} style={[styles.viewItem,{backgroundColor:'#3B3C3E'}]} source={item} />
        }

    }

    comeinApp()
    {
      DataManager.welcomeGuideComple();
    }
}


const styles = StyleSheet.create({
    container: {
        // flex:1,
        justifyContent: 'center',
        alignItems:'center',
    },
    viewItem:{

        alignItems:'center',
        height: ETTDevice.ScreenHeight,
        width:ETTDevice.ScreenWidth,
    },
    ViewForTextStyle:{
        height:50,
        width:200,
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor:'blue',
        //marginTop:20,
        bottom:130,
    },
    text: {
        //alignItems:'center',
        fontSize:30,
        color: 'red',
    }
})