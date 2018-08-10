/**
 * Name: ParallaxSwiperView
 * Describe: TODO
 * Author: lee.limr@gmail.com
 * Date: 2018/06/21
 **/
import React, {
	Component
} from 'react'
import {
	View,
	Text,
	ScrollView,
	Animated,
	StyleSheet
} from 'react-native'

import ETTDevice from "../res/values/ETTDevice";

export default class ParallaxSwiperView extends Component {
	static defaultProps = {
		...ScrollView.propTypes,
		windowHeight: 140,
		backgroundColor:'#fff',
		header: <View></View>
	};
	
	constructor( props ) {
		super(props);
		this.state = {
			scrollY: new Animated.Value(0),
		}
	}
	
	renderContainer() {
		const {  scrollY } = this.state;
		const {windowHeight, backgroundColor} = this.props;
		return (
			<View style={[styles.headerContainer, { height: windowHeight, }]}>
				<Animated.Text
					style={[styles.headerShade, {
						width:ETTDevice.ScreenWidth,
						position:'absolute',
						left:0,top:0,
						height: windowHeight,
						backgroundColor: backgroundColor,
						opacity: scrollY.interpolate({
							inputRange: [-windowHeight, 0, windowHeight*4],
							outputRange: [0, 0, .5]
						}),
					}]}>
				</Animated.Text>
				<View style={{width:ETTDevice.ScreenWidth,height:windowHeight,position:'absolute',left:0,top:0}}>
					{this.props.header}
				</View>
			</View>
		)
	}

	render() {
		return (
			<View style={styles.container}>
				<ScrollView
                    automaticallyAdjustContentInsets={false}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
                    )}
                    scrollEventThrottle={16}>

					{this.props.children}
				</ScrollView>
				{this.renderContainer()}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		borderColor: '#fff',
		position:'relative'
	},
	headerContainer: {
		position: 'absolute',
		left:0,
		top:0,
	},
    headerShade:{
        width: ETTDevice.ScreenWidth,
        position: 'absolute',
        top: 0,
        left: 0,
    }
});