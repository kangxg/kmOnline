
/*
   徐梅娜 每个规格展示风格
 */
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableHighlight,
    Animated,
    Easing,
    Dimensions,
    Text,
    Image,
    FlatList,
    ListView,
    Button
} from 'react-native';



import ETTChooseItemStyle from '../res/styles/ETTChooseItemStyle';

export default class ETTChooseItemView extends Component{
    constructor(props){
        super(props)
        this.setUnSelectStatue = this.setUnSelectStatue.bind(self)
        console.log('我是ETTChooseItemView')
        this.state = {
            isClick:false
        }
    }

    _itemClick(){
        this.setState({
            isClick:!this.state.isClick
        })

        this.setOtherCallBack()

    }




    setUnSelectStatue(){
        this.setState({
            isClick:false
        })
    }

    _setSubViews(){
        var myKeyValues =  this.props.info.keyValues
        var myCellId    =  this.props.info.cellId

        var key =  myCellId+'_'+myKeyValues

        console.log(key)



        if (this.state.isClick){
            return <View key={key} style={ETTChooseItemStyle.itemSelectStyle}>
                <Text style={ETTChooseItemStyle.itemTextSelectStyle}>
                    {this.props.info.titleName}
                </Text>
            </View>
        }

      return <View key={key} style={ETTChooseItemStyle.itemUnSelectStyle}>
          <Text style={ETTChooseItemStyle.itemTextUnSelectStyle}>
              {this.props.info.titleName}
          </Text>
      </View>

    }

    setOtherCallBack(){
        let callback = this.props.callBack
        if (callback)
        {
            callback(!this.state.isClick,this.props.info.cellId,this.props.info.keyValues,this.__proto__);
        }
    }

    render(){
        return(
            <TouchableHighlight underlayColor={'transparent'} onPress={()=>this._itemClick()}>
                {this._setSubViews()}
            </TouchableHighlight>
        )
    }
}