import React, {Component} from 'react';
import {
    View,
    ListView,
    ScrollView,
    FlatList,
    LayoutAnimation
} from 'react-native';

export default class ETTExpandableList extends Component{
    constructor(props){
        super(props);
        this.state={
            groupStatus:this._getInitialGroupStatus()
        }

        this.closeAll = this.closeAll.bind(this)
        this.toggleGroupStatus = this.toggleGroupStatus.bind(this);
        this._supportFlatList = this._supportFlatList.bind(this);
        this._renderGroupItem = this._renderGroupItem.bind(this);
        this._renderFlatListItem = this._renderFlatListItem.bind(this);
        this._renderListViewItem = this._renderListViewItem.bind(this);
        this._renderUsingView = this._renderUsingView.bind(this);
        this._renderUsingFlatList = this._renderUsingFlatList.bind(this);
        this._renderUsingListView = this._renderUsingListView.bind(this);


    }

    // https://blog.csdn.net/u013588817/article/details/78369331?locationNum=8&fps=1

    componentWillUpdate(){
        LayoutAnimation.easeInEaseOut()
    }

    _supportFlatList(){
        return !!FlatList
    }


    // 获取初始化的组的状态
    _getInitialGroupStatus(){
        const {initialOpenGroup = [], data = []} = this.props

        // true表示open false表示close
        return new Array(data.length)
            .fill(false)
            .map((item,index) => {
                return initialOpenGroup.indexOf(index) !== -1
            })

    }

    closeAll(){
        this.setState({
            groupStatus:this.state.groupStatus.map(()=>false)
        })
    }

    // 切换组的状态  关闭其他所有组是可选项，如果是true的话打开一个组其他组都被关闭了
    toggleGroupStatus(index,closeOthers){
       const newGroupStatus = this.state.groupStatus.map((status,idx)=>{
           return idx !== index?(closeOthers?false:status):!status
       })

        this.setState({
            groupStatus:newGroupStatus
        })
    }

    _renderGroupItem(groupItem,groupId){
        const status = this.state.groupStatus[groupId]
        const {groupHeaderData = [], groupListData = []} = groupItem
        const {renderGroupHeader,renderGroupListItem,groupStyle,groupSpacing} = this.props
        const groupHeader = renderGroupHeader && renderGroupHeader({
            status,
            groupId,
            item:groupHeaderData,
            toggleStatus:this.toggleGroupStatus.bind(this,groupId)
        })

        const gruopBody = groupListData.length > 0 && (
            <ScrollView bounces={false} style={!status && {height:0}}>
                {groupListData.map((listItem,index)=>(
                    <View key={`gid:${groupId}-rid:${index}`}>
                        {renderGroupListItem && renderGroupListItem({
                            item:listItem,
                            rowId:index,
                            groupId
                        })}

                    </View>
                ))

                }

            </ScrollView>
        )

        return(
            <View
                key={`group-${groupId}`}
                style={[groupStyle,groupId && groupSpacing && {marginTop:groupSpacing}]}
            >
                {groupHeader}
                {gruopBody}
            </View>
        )
    }

    _renderFlatListItem({item,index}){
        return this._renderGroupItem(item,index)
    }

    _renderListViewItem(rowData,groupId,rowId){
        return this._renderGroupItem(rowData,parseInt(rowId))
    }

    _renderUsingFlatList(){
        const {data = [],style} = this.props
        return (
            <FlatList
                data={data}
                style={style}
                extraData={this.state}
                showsVerticalScrollIndicator = {false}
                keyExtractor={(item,index)=>index}
                renderItem={this._renderFlatListItem}
            />
        )
    }

    _renderUsingView(){
        const {data=[],style} = this.props
        return(
            <View style={style}>
                {data.map((item,groupId)=>{
                    return this._renderGroupItem(item,groupId)
                })}
            </View>
        )
    }

    _renderUsingListView(){
        const {data=[],style} = this.props
        return(
            <ListView
            style={style}
            showsVerticalScrollIndicator={false}
            renderRow={this._renderListViewItem}
            dataSource={new ListView.DataSource({
                rowHasChanged:(r1,r2)=>r1!=r2
            }).cloneWithRows(data)
            }
            >

            </ListView>
        )

    }

    render(){
        const strategy={
            'View':this._renderUsingView,
            'ListView': this._renderUsingListView,
            'FlatList': this._supportFlatList() ? this._renderUsingFlatList : this._renderUsingListView
        }

        let {implementedBy} = this.props;
        if(!strategy[implementedBy]) {
            implementedBy = 'FlatList';
        }

        return strategy[implementedBy]();
    }
}