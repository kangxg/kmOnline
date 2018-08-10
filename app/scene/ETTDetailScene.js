import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { StackNavigator } from 'react-navigation'
import  rootStyles from '../res/styles/ETTMainStyles';
import  ETTDevice from '../res/values/ETTDevice';
import  {DataManager}  from '../res/values/ETTConfig';
export default class App extends Component<props>
{
    // static navigationOptions = ({ navigation }) => ({
    //     //${navigation.state.params.user} 是一个动态的参数，参数名为user
    //     title: `${navigation.state.params.title}`,
    // });
    componentDidMount() {

        const {navigate,goBack,state} = this.props.navigation;
        console.log("componentDidMount");
        // let goBack = this.props.navigation.params.callback;
        if(goBack)
        {
            goBack("callback");
        }
    }
    render() {
        return(
            <View style={rootStyles.container}>
                <Text style={rootStyles.textPromptStyle}>
                    detail文件:

                </Text>
                <Text style={rootStyles.bigTextPrompt}
                      onPress={() => this.userConfirmed()}
                >
                    退出登录
                </Text>
            </View>
        );

    }
    userConfirmed()
    {
        // let   model = new ETTUserModel();
        // model.setName("Root.js");
        // DataManager.setUseModel(model);

        // const {navigate,goBack,state} = this.props.navigation;
        //
        // // let goBack = this.props.navigation.params.callback;
        // state.params.callback('回调参数');
        DataManager._userModel._isLog = false;
    }
    goBack()
    {


    }
}