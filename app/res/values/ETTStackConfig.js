import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import HomeScene from '../../scene/ETTHomeScene';
import {ETTLogScene}  from '../../scene/ETTLogScene';
import MyScene  from '../../scene/ETTMyScene';
import DetailScene  from '../../scene/ETTDetailScene';
import ProductDeatilScene from '../../scene/ETTProductDeatilScene';

import OrderDetailScene from '../../scene/ETTOrderDetailScene';


import VerificationCodeScene from '../../scene/ETTVerCodeScene';
import ThirdLoginBindScene   from '../../scene/ETTThirdLoginBindScene';
import ForgetPwdScene        from '../../scene/ETTForgetPwdScene';
import RegisteredScene       from '../../scene/ETTRegisteredScene';
import ChangePwdScene        from '../../scene/ETTChangePwdScene';
import BindThirdAmountScene        from '../../scene/ETTBindThirdAmountScene';
import WelecomScene          from '../../scene/ETTWelcomeGuideScene';
import PersonalDataScene     from '../../scene/ETTPersonalDataEditorScene';
import OrderListScene        from '../../scene/ETTOrderListScene';
import UserAgreementScene    from '../../scene/ETTUserAgreementScene';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';



 import {
    StackHomeOptions,
    StackDetailOptions,
    StackMySceneOptions,
    StackProductDetailOptions,
    StackLogOptions,
    StackOrderDetailOptions,
    StackBindThirdOptions, StackOrderListOptions
} from './ETTStackOptions';


import  {ETTDetailHeaderStyles} from '../styles/ETTHeaderStyles';
import ETTPersonalDataEditorScene from "../../scene/ETTPersonalDataEditorScene";

const NavHome  = StackNavigator(

    {
        HomeScene:{
            screen:HomeScene,
            // navigationOptions: ({navigation}) => ({
            //     title: 'Home',
            //
            //     headerRight: (<Button onPress={() => navigation.navigate('MyScene')} title={'详情'} />),
            // })
            navigationOptions: ({navigation}) => StackHomeOptions({navigation})
        },

        DetailScene: {
            screen:DetailScene,
            navigationOptions: ({navigation}) => StackDetailOptions({navigation})
        },

        MyScene:{
            screen:MyScene,
            navigationOptions: ({navigation}) => StackLogOptions({navigation})
        },
        PersonalDataScene:{
            screen:PersonalDataScene,
            navigationOptions: ({navigation}) => StackLogOptions({navigation})
        },
        ProductDeatilScene:{
            screen:ProductDeatilScene,
            navigationOptions:({navigation}) => StackProductDetailOptions({navigation})

        },


        OrderDetailScene:{
            screen:OrderDetailScene,
            navigationOptions:({navigation}) => StackOrderDetailOptions({navigation})

        },

        ThirdLoginBindScene:{
            screen:ThirdLoginBindScene,
            navigationOptions: ({navigation}) => StackLogOptions({navigation})
        },

        ChangePwdScene:{
            screen:ChangePwdScene,
            navigationOptions: ({navigation}) => StackLogOptions({navigation})
        },
        BindThirdAmountScene:{
            screen:BindThirdAmountScene,
            //navigationOptions: ({navigation}) => StackBindThirdOptions({navigation})
            navigationOptions: ({navigation}) => StackLogOptions({navigation})
        },
        LogScene:{
            screen: ETTLogScene,
            navigationOptions: ({navigation}) => StackLogOptions({navigation})
        },
        VerCodeScene:{
            screen: VerificationCodeScene,
            navigationOptions: ({navigation}) => StackLogOptions({navigation})
        },
        ForgetPwdScene:{
            screen: ForgetPwdScene,
            navigationOptions: ({navigation}) => StackLogOptions({navigation})
        },
        RegisteredScene:{
            screen:  RegisteredScene,
            navigationOptions: ({navigation}) => StackLogOptions({navigation})
        },
        UserAgreementScene:{
            screen:  UserAgreementScene,
            navigationOptions: ({navigation}) => StackLogOptions({navigation})
        },
        OrderListScene:{
            screen:  OrderListScene,
            navigationOptions: ({navigation}) => StackLogOptions({navigation})
            //navigationOptions: ({navigation}) => StackOrderListOptions({navigation})
        },

    },
    {

        headerMode: 'float',
        transitionConfig:()=>({
            screenInterpolator:CardStackStyleInterpolator.forHorizontal,

        })
    }
)
//float screen

const NavLog  = StackNavigator(

    {
        LogScene:{
            screen: ETTLogScene,
            navigationOptions: ({navigation}) => StackLogOptions({navigation})
        },
        VerCodeScene:{
            screen: VerificationCodeScene,
            navigationOptions: ({navigation}) => StackLogOptions({navigation})
        },
        ForgetPwdScene:{
            screen: ForgetPwdScene,
            navigationOptions: ({navigation}) => StackLogOptions({navigation})
        },
        RegisteredScene:{
            screen:  RegisteredScene,
            navigationOptions: ({navigation}) => StackLogOptions({navigation})
        },

    }
)


const NavWelcome  = StackNavigator(

    {
        WelcomeScene:{
            screen: WelecomScene,
            navigationOptions: ({navigation}) => StackLogOptions({navigation})
        },

    }
)

module.exports = {NavHome,NavLog,NavWelcome};