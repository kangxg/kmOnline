/**
 * Created by kangxiaoguang on 2018/4/8.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Button,
    DeviceEventEmitter,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import ETTDevice from '../res/values/ETTDevice';
import ETTPerCenterStyles from '../res/styles/ETTPerlCenterStyles';
import LogStyles from "../res/styles/ETTLogStyles";
export default class ETTPerCenterHeaderView extends Component {
    iconCallBack()
    {
        let callback =  this.props.iconCallBack;
        if (callback) {
            callback();
        }
    }
    editCallBack()
    {
        let callback =  this.props.editInfoCallBack;
        if (callback) {
            callback();
        }
    }
    bindThirdCallBack()
    {
        let callback =  this.props.bindThirdCallback;
        if (callback) {
            callback();
        }
    }
    serviceCallBack()
    {

        let callback =  this.props.serviceCallBack;
        if (callback) {
            callback('400-661-6666');
        }
    }
    render() {
      return (
          <View style={ETTPerCenterStyles.header}>

              <View style={ETTPerCenterStyles.headerTop}>

                  <View style={LogStyles.log_forgetpwd_header}>
                      <TouchableOpacity onPress ={()=>this.goback()}>
                          <Image style={LogStyles.log_back}
                                 source={require('../res/images/km_back.png')}/>
                      </TouchableOpacity >

                  </View>

                  <TouchableOpacity style={ETTPerCenterStyles.icon_btn} onPress={()=>this.iconCallBack()}>
                      <Image
                          source={require('../res/images/myinfo_icon_bg.png')}>

                      </Image>
                  </TouchableOpacity>

                  <Text style={ETTPerCenterStyles.nickname}>昵称昵称昵称</Text>
                  <Text style={ETTPerCenterStyles.userNum}>20180409</Text>
                  <TouchableOpacity   style={ETTPerCenterStyles.info_edit_btn} onPress={()=>this.editCallBack()}>
                      <Image

                          source={require('../res/images/myinfo_edit.png')}>

                      </Image>
                  </TouchableOpacity>

              </View>
              <TouchableOpacity onPress={()=>this.bindThirdCallBack()}>
                  <View style={ETTPerCenterStyles.baseRow}>

                      <Text style={ETTPerCenterStyles.baseRowTitle}>关联账号</Text>
                      <View style={ETTPerCenterStyles.baseRowRight}>
                          <Image
                              style={ETTPerCenterStyles.baseRowImage}
                              source={require('../res/images/myinfo_qq.png')}>
                          </Image>

                          <Image
                              style={ETTPerCenterStyles.baseRowImage}
                              source={require('../res/images/myinfo_wechat.png')}>
                          </Image>

                      </View>


                  </View>
              </TouchableOpacity>
              <View style={ETTPerCenterStyles.baseRow}>
                  <Text style={ETTPerCenterStyles.baseRowTitle}>联系客服</Text>
                  <TouchableOpacity onPress={()=>this.serviceCallBack()}>
                      <Text style={ETTPerCenterStyles.baseRowContent}>400-661-6666</Text>
                  </TouchableOpacity>

              </View>

          </View>
      );

    }
}