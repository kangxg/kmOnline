
import React, {Component, PropTypes}from 'react';
import {
    TouchableOpacity,
    TouchableHighlight,
    StyleSheet,
    View,
    Text,
    PixelRatio
} from 'react-native';
import {scaleSize} from "../res/values/ETTInlineFuction";
import ETTColor from "../res/values/ETTColor";
import ETTDevice from "../res/values/ETTDevice";

const selectPrefix = 'select_'
const enablePrefix = 'enable_'

export default class ETTCustomButton extends Component {

    // 存放state属性的arr
    propsArr=[]
    // buttonArr=[]
    constructor(props) {
        super(props);

        this.state = {

        }

        console.log('ETTCustomButton')
    }
    // 联动让不存在的置灰
    _reloadDisEnable(info){
        let newState = {...this.state};
        for(let [index,item] of this.propsArr.entries()){

            if(!info.includes(item)){
                let type = info[0]
                let subType = item.substr(0,enablePrefix.length)
                if(subType == enablePrefix){
                    newState[item] ? newState[item] = !newState[item] : {}
                    this.setState(newState)
                }
            }else{
                newState[item] ? {}:newState[item] = !newState[item]
                this.setState(newState)
            }

        }

    }


    // 根据数据源设置有几个按钮和状态值
    _setButtonNumber(){

        let newState = {...this.state};
        let row = this.props.info;
        for (let [index, item] of row.valueList.entries()) {
            let keyS = selectPrefix + row.pid + ':' + item.vid;
            let keyE = enablePrefix + row.pid + ':' + item.vid;
            newState[keyS] = false
            newState[keyE] = true
            this.propsArr.push(keyS)
            this.propsArr.push(keyE)
        }

        let saved = this.props.savedState;
        if (saved) {
            this.setState(saved)
        } else {
            this.setState(newState)
        }
        // if (saved) {
        //     let array = this.props.savedState;
        //     for(let key in array) {
        //         let subType = key.substr(0,selectPrefix.length);
        //         let vid = Number(key.substr(key.lastIndexOf(':')+1))
        //         if (subType === selectPrefix) {
        //             this._updateBtnSelectedState(this.getVItem(vid))
        //         }
        //     }
        // }
    }

    componentWillMount(){
        this._setButtonNumber()
    }

    componentWillUnmount(){
        let onSave = this.props.onSave;
        if (onSave) {
            onSave(this.props.index, this.state)
        }
    }

    // 更新"全部/未处理/已处理"按钮的状态
    _updateBtnSelectedState(item) {
        let currClickKey = selectPrefix + this.props.info.pid + ':' + item.vid;
        let array = this.propsArr;
        if (array === null || array === 'undefined') {
            return
        }

        let newState = {...this.state};

        for (let key of array) {
            if (currClickKey === key) { // toggle
                newState[key] = !newState[key];
            } else {
                // 对于非当前点击的，取消选择
                 let subType = key.substr(0,selectPrefix.length)
                if(subType === selectPrefix){
                    newState[key] ? newState[key] = false : {};
                }
            }
        }
        this.setState(newState);

        //回调
        let callback = this.props.callback
        if (callback)
        {
            callback(item,this.props.index,newState[currClickKey]);
        }
    }

    // 返回设置的button
    _getButton(style, selectedSate, stateType,enableState,enableType,item) {
        let selectedViewStyle = selectedSate ? {backgroundColor: ETTColor.c6,borderWidth:0,} : {}
        let enableViewStyle = enableState ? selectedViewStyle:{backgroundColor:ETTColor.c2}

        let selectedTextStyle = selectedSate ? {color: ETTColor.white} : {}
        let enableTextStyle = enableState ? selectedTextStyle:{color:ETTColor.c5}


        return(

            <View style={[style, enableViewStyle]} key={item.vid}>

                <Text
                    style={[styles.itemTextUnSelectStyle, enableTextStyle]}
                    onPress={ enableState?() => {this._updateBtnSelectedState(item)}:null}>
                    {item.vName}
                </Text>
            </View>

        );
    }

    render() {

        // if (this.buttonArr.length != 0) {
        //     this.buttonArr.removeAll()
        // }
        let buttonArr = []

        let row = this.props.info;
        for (let [index, item] of row.valueList.entries()) {
            let keyS = selectPrefix + row.pid + ':' + item.vid;
            let keyE = enablePrefix + row.pid + ':' + item.vid;
            let el =  this.state[keyE];
            let bt ;
            if (el == true)
            {
                 bt = this._getButton(styles.itemUnSelectStyle, this.state[keyS], keyS, this.state[keyE], keyE, item)
            }
            else
            {
                bt = this._getButton(styles.itemDisableStyle, this.state[keyS], keyS, this.state[keyE], keyE, item)
            }
            buttonArr.push(

                bt

            )
        }


        return(
            <View style={styles.itemViewStyle}>
                {buttonArr}
            </View>
        );
    }

    // getVItem(vid) {
    //     let retVal = {};
    //     for (let item of this.props.info.valueList) {
    //         if (item.vid === vid) {
    //             return item;
    //         }
    //     }
    //     return undefined;
    // }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

    button: {
        height: 30,
        textAlign: 'center',
        textAlignVertical: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
    buttondivideline: {
        width: 1,
        height: 30,
        backgroundColor: '#32a7f5',
        flexDirection: 'column',
    },

    itemUnSelectStyle:{
        marginLeft:scaleSize(12),
        alignItems:'center',
        justifyContent:'center',
        borderWidth:scaleSize(1),
        borderColor:ETTColor.c7,
        height:scaleSize(60),
        backgroundColor:ETTColor.white,
        marginTop:scaleSize(24),
        marginBottom:scaleSize(24),

    },

    itemDisableStyle:{
        marginLeft:scaleSize(12),
        alignItems:'center',
        justifyContent:'center',
        // borderWidth:scaleSize(1),
        // borderColor:ETTColor.c7,
        height:scaleSize(60),
        backgroundColor:ETTColor.white,
        marginTop:scaleSize(24),
        marginBottom:scaleSize(24),
    },

    itemTextUnSelectStyle:{
        alignSelf:'center',
        fontSize:scaleSize(24),
        color:ETTColor.f2,
        paddingLeft:scaleSize(70),
        paddingRight:scaleSize(70),
    },

    itemViewStyle:{
        flexDirection:'row',
        alignSelf:'flex-start',
        marginLeft:scaleSize(45),
        marginRight:scaleSize(30),
        marginTop:scaleSize(0),
        alignItems:'center',
        // justifyContent:'space-between',
        flexWrap:'wrap',//是否换行
        width:ETTDevice.ScreenWidth - scaleSize(40)*2,

    },


});




