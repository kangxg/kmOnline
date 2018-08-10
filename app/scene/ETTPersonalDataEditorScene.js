import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Modal,
    Alert,
    Image,
    TextInput,
    TouchableOpacity,
    Button
} from 'react-native';
import Toast, {DURATION}  from 'react-native-easy-toast'
import  {DataManager}     from "../res/values/ETTConfig";
import  {ETTDarkStatus}   from '../common/ETTStatusBar';
import  PersonalStyles    from '../res/styles/ETTPersonalDataStyles';
import  LogStyles         from "../res/styles/ETTLogStyles";
import ETTPerCenterStyles from "../res/styles/ETTPerlCenterStyles";
import  LoadingAnimation  from '../common/ETTLoadingAnimation';

import  Network           from '../utils/ETTNetworkUtil';
import  NetworkUrl        from '../res/values/ETTURLConfig';
import  NetResponseHelper from '../utils/ETTNetResponseHelper';
import  RequestModel      from "../mobx/ETTRequestModel";
import {ETTUserLogType} from "../res/values/ETTEnum";

export default class  ETTPersonalDataEditorScene  extends   Component {
    constructor(props) {
        super(props);
        this.state = {
            user_nickname:DataManager._userModel._userName ,
            textvisible:false,
            keyboardType:'default',

        };
    }
    render() {
      return (
          <View  style={PersonalStyles.container}>

              <ETTDarkStatus/>
              <View style={PersonalStyles.header}>
                  <TouchableOpacity onPress ={()=>this.goback()} >
                      <Image style={ETTPerCenterStyles.top_header_back_image}
                             source={require('../res/images/km_back.png')}/>
                  </TouchableOpacity >

                  <Text style={PersonalStyles.title}>
                      个人资料
                  </Text>
              </View>
              <View  style={PersonalStyles.header_line}/>
              <View style = {PersonalStyles.base_row}>
                  <Text style={PersonalStyles.base_row_title}>头像</Text>
                  <View style={PersonalStyles.base_row_right} >
                      <Image
                          style={PersonalStyles.base_row_image}
                          source={require('../res/images/myinfo_icon_bg.png')}>
                      </Image>

                      <Image
                          style={PersonalStyles.base_row_arrow_image}
                          source={require('../res/images/right_arrow.png')}>
                      </Image>

                  </View>
              </View>
              <View  style={PersonalStyles.row_line}/>

              <View style = {PersonalStyles.base_row}>
                  <Text style={PersonalStyles.base_row_title}>昵称</Text>
                  <View style={PersonalStyles.base_row_right}>
                      <TextInput
                                    style ={PersonalStyles.row_textInput}
                                    placeholder={this.placeholder() }
                                    underlineColorAndroid='transparent'
                                    secureTextEntry={this.state.textvisible}
                                    value = {this.state.user_nickname}
                                    keyboardType ={this.state.keyboardType}
                                    maxLength    = {16}
                                    onBlur = {()=>this.nickEditEnd()}
                                    onChangeText={(text)=>this.valueChange(text)}>

                      </TextInput>

                      <Image
                          style={PersonalStyles.base_row_arrow_image}
                          source={require('../res/images/right_arrow.png')}>
                      </Image>

                  </View>
              </View>
              <View  style={PersonalStyles.row_line}/>

              <View style = {PersonalStyles.base_row}>
                  <Text style={PersonalStyles.base_row_title}>修改密码</Text>
                  <TouchableOpacity style={PersonalStyles.base_row_right} onPress={()=>this.gotoChangePwdScene()}>
                      <Image
                          style={PersonalStyles.base_row_arrow_image}
                          source={require('../res/images/right_arrow.png')}>
                      </Image>

                  </TouchableOpacity>
              </View>
              <View  style={PersonalStyles.row_line}/>
              <Toast
                  ref='toast'
                  style={LogStyles.reg_toast}
                  opacity={0.8}
                  position='top'
                  positionValue={200}
              />
              <LoadingAnimation ref='loading'/>
          </View>
      );
    }
    nickEditEnd()
    {
        console.log('编辑昵称结束');
        if (this.state.user_nickname.length<1 || this.state.user_nickname == DataManager._userModel._userName)
        {
            return;
        }
        this.refs.loading._show(null);
        let requetModel = new RequestModel();
        requetModel._path =  NetworkUrl.SERVICE_NAME_ACCOUNT +NetworkUrl.edit_nickname;
        requetModel._method = 'PUT',
        requetModel._bodyData =  'nickname='+this.state.user_nickname;
        //formData;
        requetModel._getInfo = requetModel.getTokenRequesetData();

        Network.requestWithToken(requetModel,(json) => {
            //处理 请求结果
            //处理 请求结果
            console.log(json);
            let reslut = NetResponseHelper.responseJsonForResult(json)
            this.refs.loading._hiden();
            if (reslut.code ==1)
            {

                DataManager.editUserNickNameSuccessful(this.state.user_nickname);
                //this.closeHandle();
            }
            this.refs.toast.show(reslut.msg);

        });
    }
    placeholder()
    {
        return '未设置';
    }

    valueChange(text)
    {
        this.setState(
            {
                user_nickname:text,
            });

    }
    //返回
    goback()
    {
        this.props.navigation.pop();
    }

    gotoChangePwdScene()
    {
        this.props.navigation.navigate('ChangePwdScene');
    }

}