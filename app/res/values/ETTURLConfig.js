
var tempUrl
var tempbaseheader;
var tempbaseavoidheader;
var tempavoid_login_name;
var tempavoid_login_pwd;
if(__DEV__){// debug模式

    tempUrl ='http://gw5.bj.etiantian.net:42393'
    tempbaseheader = 'Basic QzdERTlFMDhEM0I3RERGQUZDQzE2MkRERjVBMzg2QzA6M0VFMjA1NzIzODBFNzE2Njc0NUU3RTlGODU2RjIyNDc='
    tempbaseavoidheader =  'Basic QTgwNjUyNDk1QTMzMTk2RDI2QjMxMTM1RTdGNTYxQjI6MzQ2RjRBQzcwNUE4MjFGNEJBMjMwMzk1OEUxODREN0E='
    tempavoid_login_name = '9842622c06f611e88be4d8cb8a9f2496'
    tempavoid_login_pwd  =  '9842622c06f611e88be4d8cb8a9f2496'
    // tempavoid_login_name = '869426e606f611e88be4d8cb8a9f2496'
    // tempavoid_login_pwd  = '869426e606f611e88be4d8cb8a9f2496'


    // tempUrl ='http://school.etiantian.com'
    // tempbaseheader = 'Basic RjVERUVFMDY4NjA5QzZFREY1MTJCRjJCOTdCMkZENUQ6RTUyMTQ4ODMxOTYxRkQzN0Q1ODhCOURGOENCOThCRjQ='
    // tempbaseavoidheader = 'Basic MzBCNTM2ODI0MkQzM0UwNUZGRjYyQzNDMTZBNTNFQTk6QTIwNEE4RDcwMkY5M0U2Njc3QkE1Njg0OUFCNzhFQUU='
    // tempavoid_login_name = '9842622c06f611e88be4d8cb8a9f2496'
    // tempavoid_login_pwd  =  '9842622c06f611e88be4d8cb8a9f2496'


}else{// release模式

    tempUrl ='http://school.etiantian.com'
    tempbaseheader = 'Basic RjVERUVFMDY4NjA5QzZFREY1MTJCRjJCOTdCMkZENUQ6RTUyMTQ4ODMxOTYxRkQzN0Q1ODhCOURGOENCOThCRjQ='
    tempbaseavoidheader = 'Basic MzBCNTM2ODI0MkQzM0UwNUZGRjYyQzNDMTZBNTNFQTk6QTIwNEE4RDcwMkY5M0U2Njc3QkE1Njg0OUFCNzhFQUU='
    tempavoid_login_name = '9842622c06f611e88be4d8cb8a9f2496'
    tempavoid_login_pwd  =  '9842622c06f611e88be4d8cb8a9f2496'
}

let base_url = tempUrl

export default {

     SERVICE_NAME_SMS:'/api-sms-service',
     SERVICE_NAME_AUTH:'/authentication-center',
     SERVICE_TRADING:'/api-trading-service',
     SERVICE_PAY: '/api-pay-service',
     CONTENTTYPE:'application/x-www-form-urlencoded',
     SERVICE_NAME_ACCOUNT:'/km-api-account-service',
    'base_header':tempbaseheader,
    'avoid_login_header':tempbaseavoidheader,
    'wxSecret':'aed9dd766a225926f5fc9b9df7a94d61',
    'wxAppid':'wx24d51f92c3998b20',
    'avoid_login':'/authentication-center/authentication/login',//免登录
    'avoid_login_name':tempavoid_login_name,
    'avoid_login_pwd':tempavoid_login_pwd,
    'base_url':base_url,
    'amount':'/api/accounts',//注册
    'registerCode':'/api/sms/register',//注册发送验证码
    'password_Log':'/authentication/mobile',//手机密码登录

    'code_Log':'/authentication/mobileCode',//手机验证码登录
    'logCode':'/api/sms/login',//注册发送验证码
    'third_log_bind_getCode':'/api/sms/binding',//第三方登录绑定手机号获取验证码
    'third_log_bind':'/api/third/phone',//第三方登录绑定手机号获取验证码
    'third_reg':'/api/third/register',//注册第三方账号
    'third_unbind':'/api/third/unbind',//第三方账号解绑
    'third_singin':'/api/third/signIn',//第三方登录最后与后台请求
    'third_bind':'/api/third/bind',//绑定第三方账号
    'find_pwd_code':'/api/sms/retrieve',//找回密码发送验证码
    'find_pwd_enterset':'/api/accounts/password/retrieve',//找回密码设置密码
    'pwd_reset_oldpwd':'/api/accounts/password',//通过旧密码修改密码
    'pwd_reset_code':'/api/accounts/password/code',//通过手机验证码修改密码
    'pwd_reset_sendcode':'/api/sms/password',//修改密码发送验证码
     'edit_nickname':'/api/accounts/info',

    'goodses_list':'/api/goodses',//商品列表
    'goodses_detail':'/api/goodses/',//商品详情
    'post_orders':'/api/orders',//提交订单
    'pay_getChannel':'/api/paymentMethods',// 获取支付方式
    'pay':'/api/pay',// 支付
    'check_order':'/api/pay/',// 检查订单
    'pay_callBack':'/api/pay/callback',//支付成功后回调

    'refresh_token':'/accesstoken-control/tokens',//更新token

}

