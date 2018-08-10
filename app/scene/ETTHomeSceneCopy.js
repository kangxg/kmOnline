import React, { Component,PureComponent } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    FlatList,
    TouchableOpacity,
    TextInput,
    SectionList,
    Image

} from 'react-native';
import {StackNavigator,} from 'react-navigation'
import  rootStyles from '../res/styles/ETTMainStyles';
import  ETTDevice from '../res/values/ETTDevice';
import  {DataManager}  from '../res/values/ETTConfig';
import  {ETTLightStatus} from '../common/ETTStatusBar';
import  Swiper from 'react-native-swiper';
import  homeStyle from '../res/styles/ETTHomeStyles';
import  ETTHomeSimpleCell from '../common/ETTHomeSimpleCell';
import  ETTHomeShowImgCell from '../common/ETTHomeShowImgCell';
import  ETTHomeData from '../common/myHome';
import  ETTProductDeailScene from './ETTProductDeatilScene';
import  {scaleSize} from "../res/values/ETTInlineFuction";
import  ETTColor  from '../res/values/ETTColor';
import NetworkUrl from "../res/values/ETTURLConfig";
import RequestModel from "../mobx/ETTRequestModel";
import Network from "../utils/ETTNetworkUtil";
import NetResponseHelper from "../utils/ETTNetResponseHelper";


export default class  ETTHomeSceneCopy extends   Component
{

    // sectionList
    constructor(props) {
        super(props);
        this.state = {
            sourceData:ETTHomeData,
        }
        console.log("我在这里呢")
        console.log(this.state.sourceData)
    }


    componentDidMount(){
        // 网络请求
        this.homeDetailRequest()

    }


    // 自定义分割线
    _renderItemSeparatorComponent = ({highlighted}) => (
        <View style={{height:15,backgroundColor:'black'}}></View>
    );


    _keyExtractor = (item,index) => index;


    // Footer布局
    _renderSectionFooter(){

        return <View style={homeStyle.sectionFooterViewStyle}>
            <TouchableOpacity
                onPress={()=>{
                    alert("我是更多")
                }}>
                <Text style={homeStyle.sectionFooterTextStyle}>更多</Text>
            </TouchableOpacity>
        </View>

    }
    // Header布局
    _renderHeader = () => (


        <View style={homeStyle.bannerViewStyle}>
            <ETTLightStatus/>
            <Swiper
                style={{height:200,backgroundColor:"black"}} //样式  如果这里设置了宽度，显示的图片会有问题，这里不能设置swiper的宽度
                height={200}                   //组件高度
                loop={true}                    //如果设置为false，那么滑动到最后一张时，再次滑动将不会滑到第一张图片。
                autoplay={true}                //自动轮播
                autoplayTimeout={4}            //每隔4秒切换
                horizontal={true}              //水平方向，为false可设置为竖直方向
                paginationStyle={{bottom: 10}} //小圆点的位置：距离底部10px
                // showsButtons={false}           //为false时不显示控制按钮
                // showsPagination={false}       //为false不显示下方圆点
                dot={<View style={           //未选中的圆点样式
                    homeStyle.bannerDotStyle
                }/>}
                activeDot={<View style={   //选中的圆点样式
                    homeStyle.bannerActiveDotStyle
                }/>}

            >
                <Image source={require('../res/images/home_page_header_icon.png')} style={homeStyle.bannerImgStyle}/>
                <Image source={require('../res/images/home_page_header_cover.jpg')} style={homeStyle.bannerImgStyle}/>
                <Image source={require('../res/images/avatar.png')} style={homeStyle.bannerImgStyle}/>
            </Swiper>
        </View>
    );

    _renderItem = (info) => {
        var txt = '  ' + info.item.title;
        // var encourageTxt = info.section.encourage;
        var encourageTxt = info.item.encourage;
        var moreTxt = info.item.more;
        // console.log("index    "+info.section.data.count)
        console.log("moreTxt    "+moreTxt)
        if (encourageTxt && encourageTxt.length > 0 && moreTxt && moreTxt == 1){

            return <View style={{flex:1}}>
                <Text style={{color:'white',fontSize:14,marginLeft:15,width:ETTDevice.ScreenWidth - 30}}>{encourageTxt}</Text>
                <View style={{height:15,backgroundColor:'#202021'}}></View>
                <ETTHomeSimpleCell cellData={info.item} isShowPrice={false}/>

                {this._renderSectionFooter()}
            </View>
        }else if (encourageTxt && encourageTxt.length > 0){

            return <View style={{flex:1}}>
                <Text style={{color:'white',fontSize:14,marginLeft:15,width:ETTDevice.ScreenWidth - 30}}>{encourageTxt}</Text>
                <View style={{height:15,backgroundColor:'#202021'}}></View>
                <ETTHomeSimpleCell cellData={info.item} isShowPrice={false}/>
            </View>

        }else if (moreTxt && moreTxt == 1){
            return <View style={{flex:1}}>
                <ETTHomeSimpleCell cellData={info.item} isShowPrice={false}/>
                {this._renderSectionFooter()}
            </View>
        }
        else

            return <ETTHomeSimpleCell cellData={info.item} isShowPrice={false}/>

    }


    // 跳转到商品详情页
    jumpToProductDeatil(){
        this.props.navigation.navigate('ProductDeatilScene',{
            title:'酷蒙在线',
            isVisible:false,
            callback:(data)=>{
                console.log("callback"+data);
            }
        });
    }

    // 是否有描述性文字
    _showWordsView(words: string,cellID:number){
        if (words && words.length > 0 && cellID === "1"){
            return <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Text style={{marginLeft:10,fontSize:15,color:ETTColor.white,width:ETTDevice.ScreenWidth - 20}}>
                    {words}
                </Text>
            </View>
        }
        return null
    }

    // 每个item的最后一个单元的更过按钮
    _showMoreView(info){
        if (info.item.more){
            return(
                <View style={homeStyle.sectionFooterViewStyle}>
                    <TouchableOpacity
                        onPress={()=>{
                            alert("我是更多")
                        }}>
                        <Text style={homeStyle.sectionFooterTextStyle}>更多</Text>
                    </TouchableOpacity>
                </View>
            )
        }

        return null


    }

    // item的展示风格1，2，3
    _renderItemStyleOne = (info) => {

        if (info.item.more){
            return <View style={{flex:1,backgroundColor:"#202021",alignItems:'center',justifyContent:'center'}}>
                /*更多按钮的展示*/
                {this._showMoreView(info)}
            </View>
        }
        return <View style={{flex:1,backgroundColor:"#202021",alignItems:'center',justifyContent:'center'}}>


            {this._showWordsView(info.section.words,info.item.key)}
            <TouchableOpacity
                onPress={()=>{
                    {this.jumpToProductDeatil()}
                }}
            >
                <ETTHomeSimpleCell cellData={info.item} isShowPrice={false}/>
            </TouchableOpacity>



        </View>
    }


    _renderItemStyleTwo = (info) => {
        // return <View style={{flex:1,backgroundColor:"#7a63ff",height:30,alignItems:'center',justifyContent:'center'}}>
        //     <TouchableOpacity
        //         onPress={()=>{
        //             {this.jumpToProductDeatil()}
        //         }}
        //     >
        //     <Text style={{color:'yellow',fontSize:14}}>{info.item.title}</Text>
        //     </TouchableOpacity>
        // </View>

        return null
    }

    _renderItemStyleThree = (info) => {
        return <View style={{flex:1,backgroundColor:"#ff9dfb",height:30,alignItems:'center',justifyContent:'center'}}>
            <TouchableOpacity
                onPress={()=>{
                    {this.jumpToProductDeatil()}
                }}
            >
                <Text style={{color:'#a5ff54',fontSize:14}}>{info.item.title}</Text>
            </TouchableOpacity>
        </View>
    }

    // 头视图

    // sectionHeaderView
    _sectionComp = (info) => {
        var txt = info.section.key;
        if (txt === "网校精品"){
            return <View>
                <View style={{flexDirection:'row',flex:1,backgroundColor:'#140e1d',alignItems:'center',justifyContent:'center'}}>
                    <Image style={{marginLeft:20, marginTop:-10, width:100,height:1,backgroundColor:"#fffefd"}}/>
                    <Text style={{paddingTop:10,paddingBottom:20, marginLeft:20,color:'white',fontSize: 15,textAlignVertical:'center'}}>{txt}</Text>
                    <Image style={{marginLeft:20,marginTop:-10,width:100,height:1,backgroundColor:"#fffefd"}}/>

                </View>
                <FlatList
                    data={info.section.data}
                    numColumns={2}
                    renderItem={({item})=>
                        <ETTHomeShowImgCell/>
                    }
                />
            </View>



        }else
            return <View style={{flexDirection:'row',flex:1,backgroundColor:'#140e1d',alignItems:'center',justifyContent:'center'}}>
                <Image style={{marginLeft:20, marginTop:-10, width:100,height:1,backgroundColor:"#fffefd"}}/>
                <Text style={{paddingTop:10,paddingBottom:20, marginLeft:20,color:'white',fontSize: 15,textAlignVertical:'center'}}>{txt}</Text>
                <Image style={{marginLeft:20,marginTop:-10,width:100,height:1,backgroundColor:"#fffefd"}}/>
            </View>

    };

    render() {
        return (
            <View style={{ flex: 1,backgroundColor:'#202021'}}>
                <SectionList
                    keyExtractor={this._keyExtractor}
                    // 该属性如果设置为true则使用旧的ListView实现。在上述提到的两个问题中，如果将SectionList的legacyImplementation设置为true，则两个问题均解决
                    legacyImplementation={false}
                    // 组的头视图
                    renderSectionHeader={this._sectionComp}
                    // renderItem={this._renderItem}

                    // sections={this.state.sourceData.lists}
                    sections={[{key: "我的课程",
                        words:"我是鼓励文字我是鼓励文字我是鼓励文字我是鼓励文字我是鼓励文字我是鼓励文字我是鼓励文字我是鼓励文字我是鼓励文字",
                        data:[{key:"1",userName:"鲁迅",title:"鲁迅浪漫主义现实解释之大背景小说鉴赏一", },
                            {key:"2",userName:"李本华",title:"窗前明月光疑是地上霜" },
                            {key:"3",more:true}],
                        renderItem:this._renderItemStyleOne},
                        {key: "网校精品",
                            data:[{key:"1", title: "表哥" },
                                {key:"2", title: "贝贝" },
                                {key:"3",more:true}],
                            renderItem:this._renderItemStyleTwo},
                        {key: "4月免费学",
                            data:[{key:"1", title: "成吉思汗" },
                                {key:"2", title: "表弟" }],
                            renderItem:this._renderItemStyleThree}]}
                    // ItemSeparatorComponent={this._renderItemSeparatorComponent}
                    // list的头视图
                    ListHeaderComponent={this._renderHeader}
                    // ListFooterComponent={this._renderFooter}
                    ListFooterComponent={() => <View style={{ backgroundColor: '#25B960', alignItems: 'center', height: 30 }}><Text style={{ fontSize: 18, color: '#ffffff' }}>这是list的尾部</Text></View>}
                />
            </View>
        );
    }

}

class FlatListItem extends  React.PureComponent{
    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };

    render(){
        let bgColor = this.props.id % 2 == 0?'red':'blue';
        return(
            <TouchableOpacity
                {...this.props}
                onPress={this._onPress}
                style={{height:40,justifyContent:'center',alignItems:'center',backgroundColor:bgColor}}
            >
                <Text>{this.props.title}</Text>
            </TouchableOpacity>
        );
    }
}