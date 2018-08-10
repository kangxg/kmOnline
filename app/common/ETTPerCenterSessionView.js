/**
 * Created by kangxiaoguang on 2018/4/8.
 */
import React, {Component} from 'react';
import {FlatList, ListView, SectionList, Text, View} from 'react-native';
import ETTPerCenterFooterView from './ETTPerCenterFooterView';
import ETTPerCenterStyles from '../res/styles/ETTPerlCenterStyles';

import ETTPuRecordCell from './ETTPuRecordsCell';
import ETTOrderListRow from "./ETTOrderListRow";
import ETTDevice from "../res/values/ETTDevice";
import {scaleSize} from "../res/values/ETTInlineFuction";
import ETTColor from "../res/values/ETTColor";

export default class RightSectionList extends Component {
    // 构造
    listData: Array;

    constructor(props) {
        super(props);
        this.listData = this.props.data.data;
        this.state = {
            sectionData: this.listData
        };
        this.itemChange.bind(this)
    }

    //行
    renderItem = (item) => {
        return (

            <ETTOrderListRow key = {item.index} data={item} didSelected={this.props.didSelected} nav = {this.props.nav}/>
        )
    }
    //头
    sectionComp = (section) => {

        // return (
        //     <View style={ETTPerCenterStyles.sessionView}>
        //         <View style={ETTPerCenterStyles.sessionTop}>
        //             <Text style={ETTPerCenterStyles.sessionText}>{section.section.title}</Text>
        //         </View>
        //         <View style={ETTPerCenterStyles.itemLine}/>
        //     </View>
        // )

        return null

    }

    //头部视图
    _header = () => {
        // return <ETTPerCenterHeaderView iconCallBack       = {this.props.iconCallBack}
        //                                editInfoCallBack   = {this.props.editInfoCallBack}
        //                                bindWechatCallBack = {this.props.bindWechatCallBack}
        //                                bindQQCallBack     = {this.props.bindQQCallBack}
        //                                bindThirdCallback  = {this.props.bindThirdCallback}
        //                                serviceCallBack    = {this.props.bindQQCallBack}/>


        return null;
    }

    //底部视图
    _footer = () => {
        return <ETTPerCenterFooterView moreCallBack={this.props.moreCallBack}
                                       logoutCallBack={this.props.logoutCallBack}/>
    }
    _extraUniqueKey(item ,index){
        return "index"+index+item;
    }
    //ItemSeparatorComponent = {()=>{return(<View style={ETTPerCenterStyles.itemLine}/>)}}//分隔线
    //renderSectionHeader={(section)=>this.sectionComp(section)} //头
    //renderItem={(item)=>this.renderItem(item)} //行
    //sections={this.state.sectionData} //数据
    //onViewableItemsChanged = {(info)=>this.itemChange(info)}  //滑动时调用
    viewabilityConfig = {viewAreaCoveragePercentThreshold: 50};

    render() {
        let json = this.props.data.data;
        return (
            <FlatList
                ref='sectionList'
                data={json}
                keyExtractor={this._extraUniqueKey}
                ListHeaderComponent={this._header}
                style={ETTPerCenterStyles.list}
                renderSectionHeader={(section) => this.sectionComp(section)}
                renderItem={(item) => this.renderItem(item)}
                sections={this.state.sectionData}
            />

        );
    }

    emptyComponent = () => {
        return <View style={{
            height: ETTDevice.height,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Text style={{
                fontSize: 16
            }}>暂无数据</Text>
        </View>
    }

    componentDidMount() {
        //收到监听

    }

    componentWillUnmount() {
        // 移除监听
        //this.listener.remove();
    }

    itemChange = (info) => {
        // let title = info.viewableItems[0].item.title
        // var reg = new RegExp("^[0-9]*$");
        // if (reg.test(title)) {
        //     DeviceEventEmitter.emit('right',title); //发监听
        // }
    }


}