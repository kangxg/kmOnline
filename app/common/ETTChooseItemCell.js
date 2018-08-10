/*
   徐梅娜 规格选择页
 */
import React, { Component } from 'react';
import {
    View,
    TouchableHighlight,
    Text,
} from 'react-native';



import ETTChooseItemStyle from '../res/styles/ETTChooseItemStyle';
import ETTChooseItemView from './ETTChooseItemView';


export default class ETTChooseItemCell extends Component{


    myItemView:ETTChooseItemView
    constructor(props){
        super(props)
        console.log('我是ETTChooseItemCell')
        myData = [ETTChooseItemView]


    }

    _itemClick(isClick,cellId,i,itemView){
        var showText = isClick + cellId
        alert(showText)
    //    遍历这个数组中的其他值，其他为未选中状态
    //     if (this.myData.length > 0){
    //
    //         for (let [index,elem] of this.myData.entries()){
    //              if (index != i && i != undefined){
    //                console.log(elem)
    //                  elem.type.prototype.setUnSelectStatue()
    //              }
    //         }
    //
    //     }

        // if (this.myItemView != null){
        //    this.myItemView.setUnSelectStatue()
        // }
        //
        // this.myItemView = itemView

    }



    render(){

        var dataArr = [];
        for (var i=0;i<this.props.subject.length;i++){
            dataArr.push(

                <ETTChooseItemView info={{'keyValues':i,
                                          'titleName':this.props.subject[i],
                                          'cellId':this.props.cellId}}
                                   callBack={(isClick,cellId,i,itemView)=>this._itemClick(isClick,cellId,i,itemView)}
                                   key={i}/>
        )
        }

        this.myData = dataArr
        return(
            <View style={ETTChooseItemStyle.container}>
                <Text style={ETTChooseItemStyle.titleTextStyle}>{this.props.title}</Text>
                <View style={ETTChooseItemStyle.itemViewStyle}>
                    {dataArr}
                </View>


            </View>
        )
    }
}


