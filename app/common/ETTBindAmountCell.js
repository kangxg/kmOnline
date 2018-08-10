import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    ScrollView,
    NativeModules,
    TextInput,
    ListView,
    Image,
    RefreshControl,
    TouchableOpacity,

} from 'react-native';

/*
   康晓光
   2018。4。17
   绑定第三方账号 cell
 */

import  ETTDevice from '../res/values/ETTDevice';

import ETTPerCenterStyles from '../res/styles/ETTPerlCenterStyles';
import  BindThirdAmountStyles from '../res/styles/ETTBindThirdAmountStyles';

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
    //<View style={ETTPerCenterStyles.cellLine}/>
    render(){

        return(


            <TouchableOpacity onPress={()=>this.onPressCell()}>
                <View style={BindThirdAmountStyles.cellContainer}>
                    <View style={BindThirdAmountStyles.cellBody_top}>
                        <Text style={BindThirdAmountStyles.cellBody_top_left}>
                            {this.state.cellItem.name}
                        </Text>
                        <View style={BindThirdAmountStyles.cellBody_top_right}>
                            <Text style={BindThirdAmountStyles.cellheader}>
                                {this.state.cellItem.amount}
                            </Text>
                            <Image style={BindThirdAmountStyles.cellBody_top_right_image}
                                   source={require('../res/images/tab_c5.png')}/>
                        </View>
                    </View>


                </View>
            </TouchableOpacity>


        )
    }
}