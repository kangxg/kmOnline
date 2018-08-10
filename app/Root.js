/**
 * 康晓光
 * 2018-3-29
 * 入口文件
 * @flow
 */

import React, {Component} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {observer} from 'mobx-react';
import ETTDevice from './res/values/ETTDevice';
import {DataManager} from './res/values/ETTConfig';
// import HomeScene from './scene/ETTHomeScene';
import {NavHome, NavWelcome} from '../app/res/values/ETTStackConfig';
import {ETTAppLoadState} from '../app/res/values/ETTEnum'
import * as wechat from "react-native-wechat";
import ETTURLConfig from "./res/values/ETTURLConfig";

//{DataManager._userModel.name},
// import DetailScene  from './scene/ETTDetailScene';

wechat.registerApp(ETTURLConfig.wxAppid);
@observer
export default class Root extends Component{
    render() {
        console.log("root");

        if (DataManager._appInfo._isLoadState != ETTAppLoadState.loadOver)
        {
            return this.showImage();
        }
        if (DataManager._appInfo._isFirstOpen == 'YES' )
        {
            return <NavWelcome/>
        }
        return  <NavHome/>
        // if(DataManager._userModel._isLog == false)
        // {
        //     return <NavLog/>
        // }
        // else {
        //
        //     return  <NavHome/>
        // }

        // return this.showImage();

        // return(
        //     <ParallaxSwiperView
        //         windowHeight={44}
        //         backgroundColor = 'red'
        //         header={<View><Text style={{color:'#000',height:64}}>这里是头部</Text></View>}
        //     >
        //         <Text style={{height:100,backgroundColor:'green'}}>sfdfrf</Text>
        //         <Text style={{height:100,backgroundColor:'green'}}>jhgf</Text>
        //         <Text style={{height:100,backgroundColor:'green'}}>sfdfrf</Text>
        //         <Text style={{height:100,backgroundColor:'green'}}>jhgf</Text>
        //         <Text style={{height:100,backgroundColor:'green'}}>sfdfrf</Text>
        //         <Text style={{height:100,backgroundColor:'green'}}>jhgf</Text>
        //         <Text style={{height:100,backgroundColor:'green'}}>sfdfrf</Text>
        //         <Text style={{height:100,backgroundColor:'green'}}>jhgf</Text>
        //         <Text style={{height:100,backgroundColor:'green'}}>sfdfrf</Text>
        //         <Text style={{height:100,backgroundColor:'green'}}>jhgf</Text>
        //         <Text style={{height:100,backgroundColor:'green'}}>sfdfrf</Text>
        //         <Text style={{height:100,backgroundColor:'green'}}>jhgf</Text><Text>sfdfrf</Text>
        //         <Text style={{height:100,backgroundColor:'green'}}>jhgf</Text>
        //         <Text style={{height:100,backgroundColor:'green'}}>sfdfrf</Text>
        //         <Text style={{height:100,backgroundColor:'green'}}>jhgf</Text>
        //
        //     </ParallaxSwiperView>
        // )



    }

   showImage()
   {
       return (
           <View style = {styles.container}>
               <Image  style = {styles.viewItem}  source={require('./res/images/750X1334.png')} ></Image>
           </View>
       );
   }

}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
    },
    viewItem:{

        alignItems:'center',
        height: ETTDevice.ScreenHeight,
        width:ETTDevice.ScreenWidth,
    },
})
/*

<View style={rootStyles.container}>
    <Text style={rootStyles.textPromptStyle}>
        入口文件:{ETTDevice.ScreenWidth}

    </Text>
    <Text style={rootStyles.bigTextPrompt}
          onPress={() => this.userConfirmed()}
    >
        确 定
    </Text>
</View>
*/