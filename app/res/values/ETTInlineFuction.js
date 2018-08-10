/*
   内联函数、公用函数
 */

import {
    Dimensions
} from 'react-native';

import ETTDevice from './ETTDevice';
export function sum(numa, numb){
    return numa + numb;
}

const defaultPixel = 2;                           //iphone6的像素密度
//px转换成dp
const w2 = 750 / defaultPixel;
const h2 = 1334 / defaultPixel;
const scale = Math.min(ETTDevice.ScreenHeight / h2, ETTDevice.ScreenWidth / w2);   //获取缩放比例
/**
 * 设置text为px
 * @param size px
 * return number dp
 */
export function adaptationText(size: number) {
    size = Math.round((size * scale + 0.5) * ETTDevice.PixelRatio / ETTDevice.FontScale);
    return size / defaultPixel;
}

/**
 * 输入px，输出dp。
 * 最小0.5; 大于1时取整
 * @param size 像素px
 * @returns {number} dp
 */
export function scaleSize(size: number) {
    let dp = size/750 * ETTDevice.ScreenWidth;
    return dp < 1 ? 0.5 : Math.round(dp);
}

export function scaleSizeWrapper(size: number) {

    let ret = scaleSize(size)
    return ret;
}
/**
 * 密码格式
 * 控制（1）6-16位（2）只能为英文字母、数字、下划线（3）不能是纯数字。
 * 正确为true 错误为false
 */
export function isRightPwd(pwd) {
    // var regu = /^(?![0-9]+$)[0-9A-Za-z_]{6,16}$/;
    var regu = /^(?!\d+$)[\w_]{6,16}$/;
    var re = new RegExp(regu);

    if (re.test(pwd)) {
        return true;
    } else {
        return false;
    }
}


/**
 * 是否是正确的手机号码
 * @param phone
 * @returns {boolean}
 */
export function isRightPhone(phoneStr) {
    var phone = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}/;
    if (phone.test(phoneStr) && phoneStr.length === 11) {
        return true;
    } else {
        return false;
    }
}
//import {sum} from './TestComponent'
//result = sum(1, 2);
import {PixelRatio} from 'react-native';
export const dp2px = dp=>PixelRatio.getPixelSizeForLayoutSize(dp);
export const px2dp = px=>PixelRatio.roundToNearestPixel(px);