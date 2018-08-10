/*
 康晓光  2018-4-19  网络请求，响应数据处理辅助类
 */
var ETTNetResponseHelper = {};

ETTNetResponseHelper.responseJson = function (json) {
    if(!json)
    {
        return {'code':-20148,'msg':'请求失败'}
    }
    if(json.code == -50001)
    {
        return {'code':-50001,'msg':'手机号已注册，请直接登录'}
    }

    return json
}
ETTNetResponseHelper.responseJsonForResult = function (json) {
    if(!json)
    {
        return {'code':-20148,'msg':'请求失败'}
    }
    if(json.result == -50001)
    {
        return {'code':-50001,'msg':'手机号已注册，请直接登录'}
    }

    return json
}
ETTNetResponseHelper.requestFailJson = function(json)
{
    if(!json)
    {
        return {'code':-20148,'msg':'请求失败'}
    }

    if(json.status == 404)
    {
        return {'code':-404,'msg':'地址不可达'}
    }
    else if (json.status == 401)
    {
        return {'code':401,'msg':'授权失败'}
    }
    else if (json.status == -20148)
    {
        return {'code':-20148,'msg':'请求失败'}
    }
    return json
}


export default ETTNetResponseHelper;