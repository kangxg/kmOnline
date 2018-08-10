/**
 * Created by shaotingzhou on 2017/6/22.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Platform,
    Dimensions,
    RefreshControl,
    FlatList,
    ActivityIndicator,
    DeviceEventEmitter,
    ScrollView
} from 'react-native';

import ETTDevice from '../res/values/ETTDevice';

import ETTPerCenterHeaderView from "./ETTPerCenterHeaderView";
export default class ETTPerCenterListView extends Component{
    listData:Array ;
    // 构造
    constructor(props) {
        super(props);
        this.listData = this.props.data.perCenter_order_data
        this.state = {
            dataAry: this.listData,
            cell:0  //默认选中第一行
        };
    }
    _header = () => {
        return <ETTPerCenterHeaderView/>;
    }

    _footer = () => {
        return <Text >这是尾部</Text>;
    }
    render() {
        return(
            <FlatList
                ref='FlatList'
                ListHeaderComponent={this._header}
                ListFooterComponent={this._footer}
                style={{width:80}}
                data = {this.state.dataAry} //数据源
                renderItem = {(item) => this.renderRow(item)} //每一行render
                ItemSeparatorComponent = {()=>{return(<View style={{height:1,backgroundColor:'cyan'}}/>)}} //分隔线
                keyExtractor={this.keyExtractor}  //使用json中的title动态绑定key
            />
        );
    }
    //使用json中的title动态绑定key
    keyExtractor(item: Object, index: number) {
        return item.title
    }
    //每一行render
    renderRow =(item) =>{
        return(
            <TouchableOpacity onPress={()=>this.cellAction(item)}>
                <View style={{height:60,flexDirection:'row',alignItems:'center'}}>
                    <View style={{height:50,width:5,backgroundColor: item.index == this.state.cell ? 'red' : 'rgba(0,0,0,0)'}}/>
                    <Text style={{marginLeft:20}}>{item.item.title}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    //点击某行
    cellAction =(item)=>{
        // alert(item.index)
        if(item.index < this.state.dataAry.length - 1){
            this.setState({
                cell:item.index
            })
            DeviceEventEmitter.emit('left',item.index); //发监听
        }

    }

    componentWillUnmount(){
        // 移除监听
        this.listener.remove();
    }

    componentWillMount() {
        this.listener = DeviceEventEmitter.addListener('right',(e)=>{
            this.refs.FlatList.scrollToIndex({animated: true, index: e-1})
            this.setState({
                cell:e-1
            })
        });
    }
}