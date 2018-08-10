import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Platform,
    TouchableOpacity
} from 'react-native';
import {scaleSize} from "../res/values/ETTInlineFuction";
import ETTColor from "../res/values/ETTColor";

export default class ETTNavigationBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // leftTitle和leftImage 优先判断leftTitle (即 文本按钮和图片按钮优先显示文本按钮)
    	const { title, leftTitle, leftImage, leftAction, rightTitle, rightImage, rightAction } = this.props;
        return (
            <View style={[styles.barView, this.props.style]}>
            	<View style={ styles.showView }>
            		{
                        leftTitle
                        ?
                        <TouchableOpacity style={styles.leftNav} onPress={ ()=>{leftAction()} }>
                            <View style={{alignItems: 'center'}}>
                                <Text style={styles.barButton}>{leftTitle}</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        (
                            leftImage
                            ?
                            <TouchableOpacity style={styles.leftNav} onPress={ ()=>{leftAction()} }>
                                <View style={{alignItems: 'center'}}>
                                    <Image source={ leftImage }/>
                                </View>
                            </TouchableOpacity>
                            : null
                        )
            		}
		            {
                        title ?
                        <Text style={styles.title}>{title || ''}</Text>
                        : null
		            }


		        </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    barView: {
        height: Platform.OS === 'android' ? 44 : scaleSize(128),//64,
        backgroundColor: 'white',
    },
    showView: {
    	flex: 1,
    	alignItems: 'center',
    	justifyContent: 'center',
    	flexDirection: 'row',
    	marginTop: Platform.OS === 'android' ? 0 : scaleSize(40),//20,
    	height: scaleSize(88),//44,
    },
    title: {
    	color: 'black',
    	fontSize: scaleSize(36),
    },
    leftNav: {
    	position: 'absolute',
    	left: scaleSize(30),
    	justifyContent: 'center',
    },
    rightNav: {
    	position: 'absolute',
    	right: scaleSize(36),
    	top: scaleSize(26),
    	bottom: scaleSize(28),
    	justifyContent: 'center',
    },
    barButton: {
        color: 'white',
        fontSize: scaleSize(30)
    },
})


/*
              {
                  rightTitle ?
                  <TouchableOpacity style={styles.rightNav} onPress={ ()=>{rightAction()} }>
                      <View style={{alignItems: 'center'}}>
                          <Text style={styles.barButton}>{rightTitle}</Text>
                      </View>
                  </TouchableOpacity>
                  : (rightImage ?
                      <TouchableOpacity style={styles.rightNav} onPress={ ()=>{rightAction()} }>
                          <View style={{alignItems: 'center'}}>
                              <Image source={ rightImage }/>
                          </View>
                      </TouchableOpacity>
                      : null
                  )
              }
              */