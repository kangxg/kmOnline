/*
   徐梅娜 规格选择页
 */
import React, { Component } from 'react';
import {
    View,
    Platform,
    TouchableHighlight,
    TouchableOpacity,
    Animated,
    Easing,
    Dimensions,
    Text,
    Image,
    FlatList,
    ListView,
    ScrollView,
    Button
} from 'react-native';

import courseChooseStyle from '../res/styles/ETTCourseChooseStyle';
import {scaleSize} from "../res/values/ETTInlineFuction";
import  ETTChooseItemCell from './ETTChooseItemCell';
import ETTDevice from "../res/values/ETTDevice";
import ETTChooseItemStyle from "../res/styles/ETTChooseItemStyle";
import ETTCustomButton from "./ETTCustomButton";
import ETTColor from "../res/values/ETTColor";
import 'core-js/es6/symbol'
import 'core-js/fn/symbol/iterator'
import * as StatusBarManager from "react-native/Libraries/Components/StatusBar/StatusBar";

const {width, height} = Dimensions.get('window');


export default class ETTCourseChooseView extends Component{
    effectArr = [] // 当前有效的属性组合
    attrArr = []// 属性
    selectDic = {} // 选中属性的存储字典
    selectArr = [] // 选中属性的存储数组


    constructor(props){
        super(props)

        this.state={
            offset:new Animated.Value(0),
            opacity:new Animated.Value(0),
            hide:true,
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
            }),
        };

    }


    _callBcak(arr,item) {

            let callBack = this.props.showName;
            if (arr.length<2 || arr[0] == undefined)
            {
                arr = [];
                item = {}
            }
            if (callBack) {
                callBack(arr, item,false);
            }
    }

    _changePayViewPrice(info){
        let callback = this.props.changePrice
        if(callback){
            callback(info)
        }
    }

    _keyExtractor = (item,index) => index;

    // 点击每个属性列表的属性值需要
    customButtonItemClick(info,index,selected){

        let vName = info.vName

        if(selected){
            this.selectArr[index] = vName ? vName:''
        }else{
            this.selectArr.splice(this.selectArr.indexOf(vName),1)  // 删除选择
        }


        let count = this.props.info.properties.length

        let selectKeyCount = this.selectArr.length


        // 获取点击的哪个item的名字 然后去循环遍历另外一个属性的其他值是否可以显示
           let arr = []
        if(selected) {// 如果是选中状态的
            for (let [i,item] of this.props.info.goodsList.entries()){
                let skuArray = item.propertyName.split(" ")
                if (skuArray.includes(vName)) {
                    skuArray.splice(skuArray.indexOf(vName), 1)
                    skuArray.map((value) => {
                        arr.push(value)
                    })
                }
            }
        }else{// 如果是取消选中的
            for(let [i,item] of this.props.info.properties.entries()) {
                if (item.isSale = 1) {
                    if (i !== index) {
                        for(let [subIndex,subItem] of item.valueList.entries()) {
                            arr.push(subItem.vName)
                        }
                    }
                }
            }
        }

        // 达到满选,判断是哪个商品sku
        if (selectKeyCount === count){
            for (let [i,item] of this.props.info.goodsList.entries()){
                let skuArray = item.propertyName.split(" ")
                let str1 = skuArray.toString()
                let str2 = this.selectArr.toString()
                if(str1 === str2){
                    this.selectDic = item
                    this._changePayViewPrice(item)
                }
            }

        }

       if ((this.selectArr.length<2))
       {

           let item = {'goodsId':'','marketPrice':'','marketPrice':''}
           this._changePayViewPrice(item)
       }
           // 筛选哪些不可以点击
        let enableArr=[]
        for(let [i,item] of this.props.info.properties.entries()){
            if(item.isSale = 1) {
                if(i !== index){   // 非当前分类

                    for(let [subIndex,subItem] of item.valueList.entries()) {
                        if(arr.includes(subItem.vName)){
                            let aa = 'enable_'+ item.pid + ':' + subItem.vid;
                            enableArr.push(aa)
                        }
                    }
                    this.refs[`myRef_${i}`]._reloadDisEnable(enableArr);
                }
            }
       }





        }
    onSaveChooseState(index, state)
    {

      if (this.selectArr.length<2)
      {


          let   newState = {...state};
          let   defaultPrefix = 'select_'
          let   enablePrefix = 'enable_'

          for(key in state)
          {
              let subType = key.substr(0,enablePrefix.length)
              if(subType == enablePrefix){
                  newState[key] = false;
              }
              console.log(key);
          }

      }

        let onsave =  this.props.onSave;
        if (onsave)
        {
             onsave(index,state);
        }
    }

    render(){

            if(!this.state.hide){
                return (<View/>)
            }else{

                if(this.effectArr.length != 0){
                    this.effectArr = []
                }
                if(this.attrArr.length != 0){
                    this.attrArr = []
                }

                for(let [index,item] of this.props.info.properties.entries()){
                    if(item.isSale = 1){
                        let attrValueArr = []// 每个属性下的属性值列表
                        let refStr = 'myRef_' + index

                        attrValueArr.push(

                            <ETTCustomButton
                                             ref={refStr}
                                             info={item}
                                             index={index}
                                             onSave={(index, state) =>this.onSaveChooseState(index, state)}
                                             savedState={this.props.savedState?this.props.savedState[index]:undefined}
                                             callback={(info,index,statue)=>this.customButtonItemClick(info,index,statue)}/>


                        )

                        this.attrArr.push(<View style={{flexDirection:'column',marginTop:scaleSize(30)}} key={index}>
                            <Text style={{marginLeft:scaleSize(24),marginTop:scaleSize(22),color:ETTColor.f3}}>{item.pName}:</Text>

                            {attrValueArr}

                        </View>)
                    }

                }


                return(
                    <View style={courseChooseStyle.container}>

                            <Animated.View style={courseChooseStyle.mask}/>

                            <Animated.View style={[courseChooseStyle.tip,{transform:[{
                                    translateY:this.state.offset.interpolate({
                                        inputRange:[0,1],
                                        //outputRange:[height,scaleSize(414)]
                                        //outputRange:[height,scaleSize(530)]
                                        outputRange:[height,height-scaleSize(700)-scaleSize(88) -(Platform.OS === "ios" ? 1 : StatusBarManager.currentHeight) -1 ],
                                    })
                                }]}]}>
                                {/*北京四中网校精品课程的课程名字*/}
                                <View style={courseChooseStyle.courseContain}>
                                    <View style={courseChooseStyle.courseTopViewStyle}>
                                        <Text style={courseChooseStyle.courseTitleStyle}>
                                            {this.props.info.name}
                                        </Text>
                                        <TouchableOpacity onPress={()=>{
                                            this._callBcak(this.selectArr,this.selectDic)
                                        }}>
                                            <Image style={courseChooseStyle.courseTopCloseStyle} source={require('../res/images/close.png')}/>
                                        </TouchableOpacity>

                                    </View>
                                    <ScrollView style={{width:ETTDevice.ScreenWidth}}>
                                        {this.attrArr}
                                    </ScrollView>

                                </View>


                            </Animated.View>





                    </View>

                )
            }


    }


    componentWillMount(){
        this.setState(
            {
            hidden:false,
            },
            this.in
           );
    }

    componentDidMount() {
        console.log('ETTCourseChooseView已经被加载')
        this.selectDic = this.props.current;
        this.selectArr = this.props.current.propertyName.split(' ')
    }

    //组件将被卸载
    componentWillUnmount(){
        console.log('ETTCourseChooseView将要被卸载了')
    }


    //显示动画
    in() {
        Animated.parallel([
            Animated.timing(
                this.state.opacity,
                {
                    easing: Easing.linear,
                    duration: 500,
                    toValue: 0.8,
                }
            ),
            Animated.timing(
                this.state.offset,
                {
                    easing: Easing.linear,
                    duration: 500,
                    toValue: 1,
                }
            )
        ]).start();
    }

    //隐藏动画
    out(){
        Animated.parallel([
            Animated.timing(
                this.state.opacity,
                {
                    easing: Easing.linear,// 缓动函数
                    duration: 500,// 动画时间
                    toValue: 0,// 目标值
                }
            ),
            Animated.timing(
                this.state.offset,
                {
                    easing: Easing.linear,
                    duration: 500,
                    toValue: 0,
                }
            )
        ]).start();

        setTimeout(
            () => this.setState({hide: true}),
            500
        );
    }
}