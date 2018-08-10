
/**
 * Created by kangxg on 18/7/6.
 */

import React,{
    NetInfo
} from 'react-native';
var Platform = require('Platform')
import ETTNetworkUtil from "./ETTNetworkUtil";

var ETTNetWorkTool = {};
/***
 * 检查网络链接状态
 * @param callback
 */
ETTNetWorkTool.checkNetworkState = function(callback) {
    NetInfo.isConnected.fetch().then((isConnected) => {
            callback(isConnected);
        }
    );

    // NetInfo.fetch().done((info) => {
    //     if (callback)
    //     {
    //         callback(info);
    //     }
    // })

    NetInfo.isConnected.addEventListener('change', (network_state) => {
        this.network_state = network_state
    });
}



/***
 * 移除网络状态变化监听
 * @param tag
 * @param handler
 */
ETTNetWorkTool.removeEventListener = function(tag,handler) {
    NetInfo.isConnected.removeEventListener(tag, handler);
}

/***
 * 添加网络状态变化监听
 * @param tag
 * @param handler
 */
ETTNetWorkTool.addEventListener = function(netstateHandler,netChangeHandler){

    NetInfo.getConnectionInfo().done((net_state) => {
        if (netstateHandler) {
            netstateHandler(net_state)
        }
        NetInfo.addEventListener('connectionChange',
            (net_state) => {
                if (netstateHandler) {
                    netstateHandler(net_state)
                }

                if (netChangeHandler) {
                    netChangeHandler(net_state)
                }
            })

    })

}

ETTNetWorkTool.isNetworkConnected = function(network_state) {

    if (!network_state)
        return false

    let ns = network_state.toUpperCase()
    if (Platform.OS === 'ios') {
        if (ns == 'WIFI' ||
            ns == 'CELL')
            return true
    }else if (Platform.OS == 'android') {
        let no_network = {
            'NONE': 1,
            'UNKNOWN': 1,
            'BLUETOOTH': 1,
        }
        if (no_network[ns])
            return false
        else
            return true
    }
    return false

}
/**
 * 设备处于联网状态且通过wifi链接，或者是一个iOS的模拟器。
 * @param network_state {string} 网络状态
 * @returns {boolean}
 */

ETTNetWorkTool.isNetworkWifi = function(network_state) {
    if (!network_state)
        return false

    let ns = network_state.toUpperCase()
    return ns == 'WIFI'
}

/**
 * 设备是通过Edge、3G、WiMax或是LTE网络联网的。
 Android下
 + MOBILE - 移动网络数据连接
 + MOBILE_DUN - 拨号移动网络数据连接
 + MOBILE_HIPRI - 高优先级移动网络数据连接
 + MOBILE_MMS - 彩信移动网络数据连接
 + MOBILE_SUPL - 安全用户面定位（SUPL）数据连接

 * @param network_state {string} 网络状态
 * @returns {boolean}
  */
ETTNetWorkTool.isNetworkCell = function(network_state) {
    if (!network_state)
    {
        return false
    }
    let ns = network_state.toUpperCase()
    if (Platform.OS === 'ios') {
        return ns == 'CELL'
    } else if (Platform.OS == 'android') {
        return ns.contains('MOBILE')
    }

    return false


}

export default ETTNetWorkTool;

