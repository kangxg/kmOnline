import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    Image
} from 'react-native';
import {StackNavigator} from 'react-navigation';

import  {ETTWitheHeaderStyles,ETTHeaderStyles} from '../styles/ETTHeaderStyles';
import {ETTGoBackView,ETTDarkGoBackView} from "../../common/ETTGoBackView";
import {DataManager} from "./ETTConfig";
import {ETTTokenStatus} from "./ETTEnum";
// import ETTGoBackButton from '../../common/ETTGoBackView';
// import ETTDarkGoBackButton from '../../common/ETTGoBackView';
// var StackDetailOptions =({navigation})=>{
//
//     console.log(navigation);
//     let {state,goBack} = navigation;
//
//     // 用来判断是否隐藏或显示header
//     const visible= state.params.isVisible;
//     let header;
//     if (visible === true){
//         header = null;
//     }
//     const headerStyle = ETTDetailHeaderStyles.headerStyle;
//     //{backgroundColor:'#4ECBFC'};
//     const headerTitle = state.params.title;
//     const headerTitleStyle = ETTDetailHeaderStyles.headerTitleStyle;
//     const headerBackTitle = false;
//     // const headerLeft = (
//     //     <Button
//     //         isCustom={true}
//     //         customView={
//     //             <Icon
//     //                 name='ios-arrow-back'
//     //                 size={30}
//     //                 color='white'
//     //                 style={{marginLeft:13}}
//     //             />
//     //         }
//     //         onPress={()=>{goBack()}}
//     //     />D
//     // );
//     return {headerStyle,headerTitle,headerTitleStyle,headerBackTitle,headerLeft,header}
// };
var StackHomeOptions =({navigation})=>{

    let {state} = navigation;
    console.log('Home navigation:'+navigation+state.params);
    const headerStyle = ETTWitheHeaderStyles.headerStyle;//ETTHeaderStyles.headerStyle;
    const headerTitle = '北京四中网校';
    const headerTitleStyle = ETTWitheHeaderStyles.headerTitleStyle;//ETTHeaderStyles.headerTitleStyle;
    const headerBackTitle = '返回';
    const headerBackTitleStyle =  ETTWitheHeaderStyles.headerTitleBackStyle;//ETTHeaderStyles.headerTitleBackStyle;
    const headerRight= (<Button onPress={() => {

        // if (DataManager._userModel._isLog && DataManager._tokenManager.checkTokenEffective() == ETTTokenStatus.tokenValid)
        // {
        //     navigation.navigate('MyScene',{
        //         title:'个人中心'
        //     })
        // }
        // else
        // {
        //     navigation.navigate('LogScene',{
        //         title:'登录'
        //     })
        // }
        navigation.navigate('MyScene',{
            title:'个人中心'
        })

    }
    } title={'详情'} />);
    const headerLeft =(<View/>);
    // const headerLeft = (
    //     <Button
    //         // isCustom={true}
    //         // customView={
    //         //     <Icon
    //         //         name='ios-arrow-back'
    //         //         size={30}
    //         //         color='white'
    //         //         style={{marginLeft:13}}
    //         //     />
    //         // }
    //         // onPress={()=>{goBack()}}
    //     />
    // );
    return {headerTitle,headerRight,headerTitleStyle,headerStyle,headerBackTitle,headerLeft,headerBackTitleStyle}
};

var StackDetailOptions =({navigation})=>{

    let {state,goBack} = navigation;
    console.log('navigation:'+navigation+state.params);


    // 用来判断是否隐藏或显示header
    const visible= state.params.isVisible;
    let header;
    if (visible === true){
        header = null;
    }
    const headerStyle = ETTHeaderStyles.headerStyle;
    //{backgroundColor:'#4ECBFC'};
    const headerTitle = state.params.title;
    const headerTitleStyle = ETTHeaderStyles.headerTitleStyle;

    const headerBackTitle = null;
    const headerRight = (<View/>);
    // const headerLeft = (
    //     <Button
    //         // isCustom={true}
    //         // customView={
    //         //     <Icon
    //         //         name='ios-arrow-back'
    //         //         size={30}
    //         //         color='white'
    //         //         style={{marginLeft:13}}
    //         //     />
    //         // }
    //         // onPress={()=>{goBack()}}
    //     />
    // );
    return {headerStyle,headerTitle,headerTitleStyle,headerBackTitle,header,headerRight}
};


var StackProductDetailOptions =({navigation})=>{

    let {state,goBack} = navigation;


    console.log('ProductDetail navigation:'+navigation+state.params);
    const headerStyle = [ETTWitheHeaderStyles.headerStyle,{display:'none'}];//ETTHeaderStyles.headerStyle;  ,{display:'none'}
    const headerTitle = '课程详情';
    const headerTitleStyle = ETTWitheHeaderStyles.headerTitleStyle;//ETTHeaderStyles.headerTitleStyle;
    const headerBackTitle = '';
    // const headerRight= (<Button onPress={() => navigation.navigate('MyScene',{
    //     title:'个人中心'
    // })} title={'详情'} />);
    // const headerLeft =(<Button
    //                    onPress={() => {goBack()}}
    //                    title={'返回'}
    //
    // />);
    // return {headerTitle,headerRight,headerTitleStyle,headerStyle,headerBackTitle,headerLeft}


    const headerLeft =(<ETTDarkGoBackView showImage={true} showText={''} onPress={() => { goBack()}}/>);

    const headerRight =(<ETTDarkGoBackView showImage={true} showText={''} onPress={() => { goBack()}}/>);



    const headerBackTitleStyle = ETTWitheHeaderStyles.headerTitleBackStyle;


    return {headerTitle,headerTitleStyle,headerStyle,headerBackTitle,headerBackTitleStyle,headerLeft,headerRight,header:null}
    // return null
};


var StackMySceneOptions =({navigation})=>{

    let {state,goBack} = navigation;
    // let callBack = state.params.callback
    console.log('Home navigation:'+navigation+state.params);

    const headerStyle = ETTHeaderStyles.headerStyle;
    const headerTitle = '个人中心';
    const headerTitleStyle = ETTHeaderStyles.headerTitleStyle;
    const headerBackTitle = null;
    const headerBackTitleStyle = ETTHeaderStyles.headerTitleBackStyle;
    const headerRight=(<View/>);
    const headerLeft =(<ETTDarkGoBackView showImage={true} showText={'返回'} onPress={() => {
        navigation.navigate('HomeScene',{
            title:'北京四中网校'
        })
        // goBack()
    }}/>);//goBack() navigation.popToTop()
    return {headerTitle,headerTitleStyle,headerStyle,headerBackTitle,headerRight,headerBackTitleStyle,headerLeft}
};


var StackOrderDetailOptions =({navigation})=>{

    let {state,goBack} = navigation;
    console.log('OrderDetail navigation:'+navigation+state.params);
    const headerStyle = ETTWitheHeaderStyles.headerStyle;//ETTHeaderStyles.headerStyle;
    const headerTitle = '订单结算';
    const headerTitleStyle = ETTWitheHeaderStyles.headerTitleStyle;//ETTHeaderStyles.headerTitleStyle;
    const headerBackTitle = null;
    const headerRight= (<View/>);
    const headerLeft =(<ETTDarkGoBackView showImage={true} showText={''} onPress={() => { goBack()}}/>);
    return {headerTitle,headerRight,headerTitleStyle,headerStyle,headerBackTitle,headerLeft}
};



var StackLogOptions =({navigation})=>{

    let {state} = navigation;
    header = null;
    const headerStyle = ETTWitheHeaderStyles.headerStyle;
    const headerTitle = '登录';
    const headerTitleStyle = ETTWitheHeaderStyles.headerTitleStyle;
    const headerBackTitle = '返回';
    const headerBackTitleStyle = ETTWitheHeaderStyles.headerTitleBackStyle;

    return {header,headerTitle,headerTitleStyle,headerStyle,headerBackTitle,headerBackTitleStyle}
};

var StackBindThirdOptions =({navigation})=>{

    let {state,goBack} = navigation;
    const headerStyle = ETTWitheHeaderStyles.headerStyle;
    const headerTitle = '账号绑定';
    const headerTitleStyle = ETTWitheHeaderStyles.headerTitleStyle;
    const headerBackTitle = '返回';
    const headerBackTitleStyle = ETTWitheHeaderStyles.headerTitleBackStyle;
    const headerLeft =(<ETTDarkGoBackView showImage={true} onPress={() => { goBack()}}/>);
    return {headerTitle,headerTitleStyle,headerStyle,headerBackTitle,headerBackTitleStyle,headerLeft}
};

var StackOrderListOptions =({navigation})=>{

    let {state,goBack} = navigation;
    const headerStyle = ETTWitheHeaderStyles.headerStyle;
    const headerTitle = '订单列表';
    const headerTitleStyle = ETTWitheHeaderStyles.headerTitleStyle;
    const headerBackTitle = '返回';
    const headerBackTitleStyle = ETTWitheHeaderStyles.headerTitleBackStyle;
    const headerLeft =(<ETTDarkGoBackView showImage={true} onPress={() => {
        navigation.navigate('MyScene',{
        title:'个人中心'
    }) }}/>);
    const headerRight = (<View/>);
    return {headerTitle,headerTitleStyle,headerStyle,headerBackTitle,headerBackTitleStyle,headerLeft,headerRight}
};

module.exports = {
    StackHomeOptions,
    StackDetailOptions,
    StackMySceneOptions,
    StackProductDetailOptions,
    StackLogOptions,
    StackOrderDetailOptions,
    StackBindThirdOptions,
    StackOrderListOptions
};


