import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import ETTPerCenterStyles from '../res/styles/ETTPerlCenterStyles';
import ETTColor from "../res/values/ETTColor";
import {scaleSize} from "../res/values/ETTInlineFuction";

/*
   康晓光
   2018。4。10
   个人中心购买记录cell
 */

export default class ETTOrderListRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cellItem: this.props.data
        };
    }

    getPayState(item) {
        let status = item.status;
        let statusName = item.statusName;
        switch (status) {
            case 11:
                return <Text style={ETTPerCenterStyles.cellOrderType}>{statusName}</Text>
                break;
            case 20:
                return <Text style={ETTPerCenterStyles.cellOrderType}>{statusName}</Text>
                break;
            case 10:
                return <Text style={ETTPerCenterStyles.order_WillPay}>{statusName}</Text>
                break;
            case 13:
                return <Text style={ETTPerCenterStyles.order_WillPay}>{statusName}</Text>
                break;
            default:
                return <Text style={ETTPerCenterStyles.cellOrderType}>{statusName}</Text>
        }
    }

    onPressCell() {
        let callback = this.props.didSelected;
        if (callback) {
            callback(this.state.cellItem,this.props.nav);
        }
    }

    render() {
        let item = this.state.cellItem.item;
        return (
            <TouchableOpacity activeOpacity={1.0} onPress={() => this.onPressCell()}>
                <View style={ETTPerCenterStyles.cellContainer}>

                    <View style={styles.linearCenter}>
                        <Text style={styles.textBlack}>订单号：</Text>
                        <Text style={styles.textGray}>{item.orderId}</Text>
                        <Text style={[styles.textGray, styles.marginLeft20]}>{item.orderTime}</Text>
                        <View style={styles.viewRight}>
                            {this.getPayState(item)}
                        </View>
                    </View>

                    {this.spuList(item.goodses)}
                    <View style={styles.linearCenterMarginTop}>
                        <Text style={styles.textGrayBig}>总价</Text>
                        <View style={styles.viewRightRow}>
                            <Text style={[styles.textGray_ac, styles.midline]}>（原价：{item.amount}）</Text>
                            <Text style={[styles.textGray_ac, styles.marginLeft20]}>{item.marketMoney}</Text>
                        </View>
                    </View>
                    {this.discountList(item.activitites)}
                    <View style={styles.linearCenterMarginTop}>
                        <Text style={styles.textBlack}>应付金额</Text>
                        <View style={styles.viewRight}>
                            <Text style={styles.textPrice}>￥{item.paymentMoney}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    spuList(goodses) {

        function spuTitle(g) {
            let type = g.type;
            if (type === 2) {
                return <View style={styles.linearCenterMarginTop}>
                    {showTag(type)}
                    <Text style={styles.textBlackBig}>{g.goodsName}</Text>
                </View>
            } else {
                return null;
            }
        }

        function skuLists(units) {
            if (units && units.length) {
                return <View style={styles.linearCol}>
                    {units.map((u,i) => <View style={styles.linearCenterMarginTop} key ={i}><Text
                        style={styles.textBlack}>{u.skuName}</Text><Text
                        style={[styles.textGray_pronmame, styles.marginLeft40]}>{u.propertyName}</Text></View>)}
                </View>
            } else {
                return null;
            }
        }

        function showTag(type) {
            if (type === 2) {
                return <View style={styles.tag}>
                    <Text style={styles.textWhite}>套餐</Text>
                </View>
            } else {
                return null;
            }
        }

        if (goodses && goodses.length) {
            return (
                <View style={styles.linearCol}>
                    {
                        goodses.map(function (g,i) {
                            return <View key = {i}>
                                {spuTitle(g)}
                                {skuLists(g.units)}
                            </View>
                        })
                    }
                </View>
            );
        } else {
            return null;
        }
    }

    discountList(activities) {
        if (activities && activities.length) {
            return <View style={styles.linearCol}>
                {activities.map(ac=><View style={styles.linearCenterMarginTop}>
                    <Text style={styles.textGrayBig}>优惠</Text>
                    <View style={styles.viewRightRow}>
                        <Text style={styles.textGray_ac}>{ac.activityName}</Text>
                        <Text style={[styles.textGray_ac, styles.marginLeft20]}>{ac.discount}</Text>
                    </View>
                </View>)}
            </View>
        } else {
            return null;
        }
    }
}

const styles = StyleSheet.create({

    order_num_text:{
        fontSize: scaleSize(26),
        color: ETTColor.f1,
    },
    textBlack: {
        fontSize: scaleSize(26),
        color: ETTColor.f1,
    },
    textBlackBig: {
        fontSize: scaleSize(28),
        color: ETTColor.f1,
    },
    textGray: {
        fontSize: scaleSize(20),
        color: ETTColor.f3
    },
    textGray_ac:{
        fontSize: scaleSize(24),
        color: ETTColor.f3
    },
    textGray_pronmame:{
        fontSize: scaleSize(26),
        color: ETTColor.f3
    },
    textGrayBig: {
        fontSize: scaleSize(26),
        color: ETTColor.f3
    },
    textPrice: {
        color: ETTColor.f5,
        fontSize: scaleSize(30)
    },
    textPending: {
        color: '#f2291d',
        fontSize: scaleSize(24)
    },
    textWhite: {
        color: ETTColor.white,
        fontSize: scaleSize(20),
        textAlign: 'center',
    },
    marginLeft20: {
        marginLeft: scaleSize(20)
    },
    marginLeft40: {
        marginLeft: scaleSize(40)
    },
    midline: {
        textDecorationLine: 'line-through'
    },
    linearCol: {
        flexDirection: 'column',
    },
    linearCenter: {
        flexDirection: 'row',
        alignItems: "center",
    },
    linearCenterMarginTop: {
        flexDirection: 'row',
        alignItems: "center",
        marginTop: scaleSize(20),
    },
    viewRight: {
        flex: 2,
        alignItems: 'flex-end'
    },
    viewRightRow: {
        flex: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    tag: {
        width: scaleSize(70),
        justifyContent: 'center',
        height: scaleSize(31),
        backgroundColor: ETTColor.c6,
        borderRadius: scaleSize(5),
        alignItems: 'center',
        marginRight: scaleSize(20),
        justifyContent: 'center',
    }
});