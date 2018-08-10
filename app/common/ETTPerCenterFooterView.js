/**
 * Created by kangxiaoguang on 2018/4/10  个人中心尾部视图.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    Button,
    TouchableOpacity,
} from 'react-native';
import ETTDevice from '../res/values/ETTDevice';
import ETTPerCenterStyles from '../res/styles/ETTPerlCenterStyles';

export default class ETTPerCenterFooterView extends Component {
    moreCallBack()
    {
        let callback =  this.props.moreCallBack;
        if (callback) {
            callback();
        }
    }
    logoutCallBack()
    {
        let callback =  this.props.logoutCallBack;
        if (callback) {
            callback();
        }
    }

    render(){
        return(
            <View style ={ETTPerCenterStyles.footer}>

              <View style ={ETTPerCenterStyles.footer_more}>
                  <TouchableOpacity onPress={()=>this.moreCallBack()}>
                      <Image
                          source={require('../res/images/order_more.png')}>
                      </Image>
                  </TouchableOpacity>
              </View>
              {/*<View style ={ETTPerCenterStyles.footer_more}>*/}
                  {/*<TouchableOpacity onPress={()=>this.logoutCallBack()}>*/}
                      {/*<Text style ={ETTPerCenterStyles.cellheader}>*/}
                          {/*退出登录*/}
                      {/*</Text>*/}
                  {/*</TouchableOpacity>*/}

              {/*</View>*/}

            </View>
        );
    }
}