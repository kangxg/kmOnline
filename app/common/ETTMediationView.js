import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    TouchableOpacity,

} from 'react-native';
import ETTPerCenterStyles from "../res/styles/ETTPerlCenterStyles";

export default class ETTMediationView extends Component {
    componentDidMount(){
        handle  = this.props.loadDidMountHandle;
        if (handle)
        {
            handle();
        }

    }
    render() {
        return (
            <View  >
            </View>
        );
    }
}