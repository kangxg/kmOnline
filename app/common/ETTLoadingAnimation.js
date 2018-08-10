import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    Platform,
    TextInput,
    Image,
    ActivityIndicator
} from 'react-native';

import LoadingStyles from '../res/styles/ETTLoadingAnimationStyles';

/*
  自定义弹出框视图 基类
 */
export default class ETTLoadingAnimation extends Component {
    constructor(props) {
        super(props);
        this._show = this._show.bind(this);
        this._hiden = this._hiden.bind(this);
        this.state = {
            isShow: false,
        }
    }

    // 打开对话框
    _show(info) {
        this.setState({
            isShow: true,
        });
    }
    _hiden()
    {
        this.setState({
            isShow: false,
        });
    }

    render() {
        if (!this.state.isShow) return null;
        return (
            <View style={LoadingStyles.container}>
                  <View style={LoadingStyles.base_contentContainer}>
                      <ActivityIndicator size="large" style={LoadingStyles.base_activity}/>
                  </View>

            </View>
        )
    }
}

