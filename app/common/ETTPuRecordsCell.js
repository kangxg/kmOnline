import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Navigator,
    ScrollView,
    NativeModules,
    TextInput,
    ListView,
    Image,
    RefreshControl,
    TouchableOpacity,

    Dimensions
} from 'react-native';

/*
   康晓光
   2018。4。10
   个人中心购买记录cell
 */

import  ETTDevice from '../res/values/ETTDevice';

import ETTPerCenterStyles from '../res/styles/ETTPerlCenterStyles';

export default class ETTPuRecordsCell extends Component{
    constructor(props){
        super(props)
        this.state = {
            cellItem:this.props.data
        };
    }
    orderType(type)
    {
        switch (type)
        {
            case 1:
                return <Text style={ETTPerCenterStyles.cellOrderType}>已取消</Text>
                break;
            case 2:
                return <Text style={ETTPerCenterStyles.cellOrderType}>已完成</Text>
                break;
            case 3:
                return <Text style={ETTPerCenterStyles.order_WillPay}>继续支付</Text>
                break;
            default:
                return <Text style={ETTPerCenterStyles.cellOrderType}>{this.state.cellItem.orderType}</Text>
        }
    }
    onPressCell()
    {
        let callback = this.props.didSelected;
        if (callback)
        {
            callback(this.state.cellItem);
        }
    }
    render(){

        return(


           <TouchableOpacity onPress={()=>this.onPressCell()}>
               <View style={ETTPerCenterStyles.cellContainer}>

                   <Text style={ETTPerCenterStyles.cellheader}>
                       {this.state.cellItem.name}
                   </Text>
                   <View style={ETTPerCenterStyles.cellBody}>
                       <View style={ETTPerCenterStyles.cellBodyTop}>
                           <View style={ETTPerCenterStyles.cellBodyLeft}>
                               <Text style={ETTPerCenterStyles.cellContent}>{this.state.cellItem.content}</Text>
                               <Text style={ETTPerCenterStyles.cellTime}>{this.state.cellItem.time}</Text>
                           </View>
                           <View style={ETTPerCenterStyles.cellBodyRight}>
                               <Text style={ETTPerCenterStyles.cellAmount}>总金额:{this.state.cellItem.amount}</Text>
                               {this.orderType(this.state.cellItem.orderType)}
                           </View>
                       </View>
                       <View style={ETTPerCenterStyles.cellLine}/>

                   </View>

               </View>
           </TouchableOpacity>


        )
    }
}