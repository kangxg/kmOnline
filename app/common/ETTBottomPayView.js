import React, { Component } from 'react'
import {
    Platform,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native'
import ETTProductDeatilStyle from "../res/styles/ETTProductDeatilStyle";

export default class ETTBottomPayView extends Component{
    constructor(props){
        super(props)
        this.state={

        };
    }

    changePrice(){

    }

    jumpToPayView(){
        let callback = this.props.callback
        if (callback)
        {
            callback()
        }

    }


    render(){
       return(
           <View style={ETTProductDeatilStyle.payForItemViewStyle}>
               <View style={ETTProductDeatilStyle.payLineStyle}/>
               <View style={ETTProductDeatilStyle.payForItemSubViewStyle}>
                   <Text style={ETTProductDeatilStyle.payForItemPriceStyle}>
                       价格:￥{this.props.price}
                   </Text>
                   <TouchableOpacity onPress={()=>{
                       {this.jumpToPayView()}
                   }}>
                       <View style={ETTProductDeatilStyle.payForItemImmediateBuyViewStyle}>
                           <Text style={ETTProductDeatilStyle.payForItemImmediateBuyTextStyle}>
                               {this.props.title}
                           </Text>
                       </View>
                   </TouchableOpacity>
               </View>

           </View>
       )
    }
}