import React, {PureComponent} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import ETTExpandableList from "./ETTExpandableList";
import ETTDevice from "../res/values/ETTDevice";
import {scaleSize} from "../res/values/ETTInlineFuction";

function formatNum(s) {
    let ss = parseInt(s)
    return (ss >> 0) < 10 ? "0"+ss:ss
}


export default class ETTSubjectTimeList extends PureComponent{
    constructor(props){
        super(props)
        this._renderGroupListItem = this._renderGroupListItem.bind(this);
        this._renderGroupHeader = this._renderGroupHeader.bind(this);
    }

    _listItemClick(){
       alert('试听')
    }


    // 组内的item
    _renderGroupListItem({item, groupId, rowId}) {

        const {headImg, nickName, onlineType, signature} = item;

        return (


                <View style={styles.listItemContainer}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.numStyle}>{formatNum(rowId+1)}.</Text>
                        <Text style={styles.headerTitle}>nickName</Text>
                        <TouchableOpacity onPress={()=>this._listItemClick()}>
                        <View style={styles.listenView}>
                            <Text style={styles.tryListenText}>试听</Text>
                        </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.videoType}>直播</Text>
                        <View style={styles.intervalLine}></View>
                        <Text style={styles.videoTime}>06.17 10:00-12:00</Text>
                    </View>

                </View>


        );
    }

    // 组内的头视图
    _renderGroupHeader({item, groupId, status, toggleStatus}) {

        const {title, online, total} = item;
        const arrowImage = status ? require('../res/images/xingzhuang2.png') : require('../res/images/xingzhuang1.png');
        return (
            <TouchableOpacity onPress={() => toggleStatus()}>
                <View style={styles.groupHeader}>
                    <Text style={styles.groupTitleText}>直线与相交线</Text>
                    <Image style={styles.groupTitleArrow} source={arrowImage}/>
                    {/*<View style={styles.lineStyle}/>*/}
                </View>
            </TouchableOpacity>
        );
    }

    render() {

        const {data = []} = this.props

        return (
            <View style={{flex: 1}}>
                <ETTExpandableList
                    style={{width:ETTDevice.ScreenWidth}}
                    data={data}
                    initialOpenGroups={[0]}// 默认第一个是打开状态
                    implementedBy={'ListView'}
                    renderGroupHeader={this._renderGroupHeader}
                    renderGroupListItem={this._renderGroupListItem}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    groupHeader: {
        backgroundColor:'white',
        flex: 1,
        marginLeft:scaleSize(30),
        marginRight:scaleSize(30),
        // paddingHorizontal: scaleSize(30),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ECECEC'
    },
    groupTitle: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    groupTitleArrow: {
        width: scaleSize(19),
        height: scaleSize(12),
        marginTop:scaleSize(25),
        marginRight: scaleSize(67),
        marginBottom:scaleSize(40)
    },
    groupTitleText: {
        color: '#333333',
        fontSize: scaleSize(32),
        fontWeight: 'normal',
        marginLeft:0,
        marginTop:scaleSize(30),
        marginBottom:scaleSize(30),
        width:ETTDevice.ScreenWidth - scaleSize(30)*3
    },
    listItemContainer: {
        marginLeft:scaleSize(30),
        marginRight:scaleSize(30),
        backgroundColor:'white',
        flexDirection: 'column',
        borderBottomWidth: 1,
        borderBottomColor: '#ECECEC'
    },

    numStyle:{
        marginLeft:0,
        marginTop:scaleSize(51),
        width:scaleSize(40),
        height:scaleSize(50),
        color:'#999999',
        fontSize:scaleSize(26),
    },

    headerTitle:{
        marginLeft:scaleSize(40),
        marginTop:scaleSize(45),
        marginRight:scaleSize(329),
        color:'#333333',
        fontSize:scaleSize(32),
    },

    listenView:{
        marginTop:scaleSize(45),
        borderRadius:4,
        borderColor:'#00ADEF',
        borderWidth:1,
        marginRight:0,
        height:scaleSize(50)
    },

    tryListenText:{
        paddingHorizontal:scaleSize(20),
        paddingVertical:scaleSize(9),
        color:'#00ADEF',
        fontSize:scaleSize(24),
    },

    videoType:{
        marginTop:scaleSize(21),
        marginLeft:scaleSize(76),
        color:'#999999',
        fontSize:scaleSize(26),
        marginBottom:scaleSize(46)
    },

    intervalLine:{
      marginTop:scaleSize(23),
        marginLeft:scaleSize(23),
        backgroundColor:'#ECECEC',
        height:scaleSize(22),
        width:1,

    },

    videoTime:{
        marginTop:scaleSize(21),
        marginLeft:scaleSize(24),
        color:'#999999',
        fontSize:scaleSize(26),
    },

    lineStyle:{

        marginLeft:scaleSize(30),
        width:ETTDevice.ScreenWidth - scaleSize(30)*2,
        backgroundColor:'#ECECEC',
        marginTop:scaleSize(51),
    },


});