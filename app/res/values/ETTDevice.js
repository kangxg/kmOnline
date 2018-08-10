
/**
 * 康晓光
 * 2018-3-29
 * 存放设备信息 如 设备类型、屏幕宽度高度等与设备相关的全局数据
 */

import {
     Dimensions,
     PixelRatio
} from 'react-native';


export default  {

    'ScreenWidth':Dimensions.get('window').width,// 屏幕宽度
    'ScreenHeight':Dimensions.get('window').height, // 屏幕高度
    'PixelRatio':PixelRatio.get(), // 屏幕缩放比例
    'FontScale':PixelRatio.getFontScale(), //返回字体大小缩放比例
    'ResolutionX':Dimensions.get('window').width* PixelRatio.get(), // X分辨率
    'ResolutionY':Dimensions.get('window').height* PixelRatio.get(), // Y分辨率
}
// // 屏幕宽度
// export let ScreenWidth = Dimensions.get('window').width;
//
// // 屏幕高度
// export let ScreenHeight = Dimensions.get('window').height;
//
//
// export let leftStartPoint = ScreenWidth * 0.1;
//
// export let componentWidth = ScreenHeight * 0.8;