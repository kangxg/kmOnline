/*
   康晓光 2018-4-16  忘记秘密
*/

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import  ETTDevice from '../res/values/ETTDevice';

import  {ETTDarkStatus} from '../common/ETTStatusBar';
import LogStyles from "../res/styles/ETTLogStyles";
import UserAgreementStyles from "../res/styles/ETTUserAgreementStyles";
import ETTProductDeatilStyle from "../res/styles/ETTProductDeatilStyle";
import PersonalStyles from "../res/styles/ETTPersonalDataStyles";
import ETTPerCenterStyles from "../res/styles/ETTPerlCenterStyles";


export default class  ETTUserAgreementScene extends   Component
{
    render() {
        return(
            <View style={LogStyles.log_Mian}>
                <ETTDarkStatus/>
                <View style={UserAgreementStyles.main_user_header}>
                    <TouchableOpacity onPress ={()=>this.goback()} >
                        <Image style={ETTPerCenterStyles.top_header_back_image}
                               source={require('../res/images/km_back.png')}/>
                    </TouchableOpacity >

                    <Text style={PersonalStyles.title}>
                        酷蒙在线用户协议
                    </Text>
                </View>
                <View  style={PersonalStyles.header_line}/>
                <ScrollView
                    style={UserAgreementStyles.main_user_scrollView}
                    automaticallyAdjustContentInsets={false}
                    scrollEventThrottle={16}
                >
                    <View style = {UserAgreementStyles.main_user_arg}>
                        <Text style = {UserAgreementStyles.main_user_arg_p}>
                            本协议是您与酷蒙在线的所有者（即北京龙之门网络教育技术股份有限公司，以下简称“本网站所有者”）之间就酷蒙在线服务等相关事宜所订立的契约，请您仔细阅读本注册协议，在您点击“同意注册”按钮后，本协议即构成对双方有约束力的法律文件。
                        </Text>
                        <Text style = {UserAgreementStyles.main_user_arg_h3}>
                            一、本站服务条款的确认和接纳
                        </Text>
                        <Text style = {UserAgreementStyles.main_user_arg_p}>
                            本站各项电子服务的所有权和运作权归酷蒙在线所有。用户必须完全接收本服务条款的全部内容，完成注册程序，才能成为酷蒙在线的用户，享受酷蒙在线的相关服务。
                            本协议条款是处理双方权利义务的契约，始终有效，法律另有强制性规定或双方另有特别约定的，依其规定。
                        </Text>
                        <Text style = {UserAgreementStyles.main_user_arg_h3}>
                            二、用户须承担的责任
                        </Text>
                        <Text style = {UserAgreementStyles.main_user_arg_p}>
                            1．自备上网所需要的设备，自行承担上网产生的各项费用。使用自己的电脑能够顺利地接入互联网，并能访问本网站主页。
                        </Text>
                        <Text style = {UserAgreementStyles.main_user_arg_p}>
                            2．提供详尽、准确的个人资料并及时地更新个人资料。若用户提供任何错误、不实、过时或不完整的资料，并为酷蒙在线所知；或者酷蒙在线有合理理由怀疑用户所提供资料为错误、不实、过时或不完整，酷蒙在线保留结束或终止其注册学员资格的权利。
                        </Text>

                        <Text style = {UserAgreementStyles.main_user_arg_p}>
                            3．遵守中华人民共和国的法律、法规、规章、条例、以及其他具有法律效力的规范，不使用本网络服务做非法用途。
                        </Text>

                        <Text style = {UserAgreementStyles.main_user_arg_p}>
                            4．不干扰或混乱网络服务
                        </Text>
                        <Text style = {UserAgreementStyles.main_user_arg_p}>
                            5．不得侵犯酷蒙在线所享有的著作权、版权以及其它权益。
                        </Text>
                        <Text style = {UserAgreementStyles.main_user_arg_p}>
                            6．用户对其发布的内容单独承担相应的法律责任。
                        </Text>
                        <Text style = {UserAgreementStyles.main_user_arg_p}>
                            7．若用户未遵守以上规定的，本站有权作出独立判断并采取暂停或关闭用户帐号等措施。用户须对自己在网上的言论和行为承担法律责任。
                        </Text>
                        <Text style = {UserAgreementStyles.main_user_arg_h3}>
                            三、用户行为的限制
                        </Text>
                        <Text style = {UserAgreementStyles.main_user_arg_p}>

                            1．不得在网页上发布、传播以下信息：

                        </Text>
                        <View style = {UserAgreementStyles. main_user_arg_more_line}>
                            <Text style = {UserAgreementStyles.main_user_arg_p}>
                                ⑴ 违反我国宪法及法律、法规的；
                            </Text>
                            <Text style = {UserAgreementStyles.main_user_arg_p}>
                                ⑵ 危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；
                            </Text>
                            <Text style = {UserAgreementStyles.main_user_arg_p}>
                                ⑶ 损害国家荣誉和利益的；
                            </Text>
                            <Text style = {UserAgreementStyles.main_user_arg_p}>
                                ⑷ 煽动民族仇恨、民族歧视，破坏民族团结的；
                            </Text>
                            <Text style = {UserAgreementStyles.main_user_arg_p}>
                                ⑸ 破坏国家宗教政策，宣扬邪教和封建迷信的；
                            </Text>
                            <Text style = {UserAgreementStyles.main_user_arg_p}>
                                ⑹ 散布谣言，扰乱社会秩序，破坏社会稳定的；
                            </Text>
                            <Text style = {UserAgreementStyles.main_user_arg_p}>
                                ⑺ 散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；
                            </Text>
                            <Text style = {UserAgreementStyles.main_user_arg_p}>
                                ⑻ 侮辱或者诽谤他人，侵害他人合法权益的；
                            </Text>
                        </View>

                        <Text style = {UserAgreementStyles.main_user_arg_p}>
                            2．不得利用网站从事以下活动：
                        </Text>
                        <View style = {UserAgreementStyles. main_user_arg_more_line}>
                            <Text style = {UserAgreementStyles.main_user_arg_p}>
                                ⑴ 故意制作、传播计算机病毒等破坏性程序的；
                            </Text>
                            <Text style = {UserAgreementStyles.main_user_arg_p}>
                                ⑵ 其他危害计算机信息网络安全的行为；
                            </Text>
                            <Text style = {UserAgreementStyles.main_user_arg_p}>
                                ⑶ 以任何方式干扰本网站的服务。
                            </Text>
                            <Text style = {UserAgreementStyles.main_user_arg_p}>
                                ⑷ 利用软件或网络系统漏洞干扰或混乱网络服务。
                            </Text>
                            <Text style = {UserAgreementStyles.main_user_arg_p}>
                                ⑸ 将广告、促销资料等加以上载、张贴、发送电子邮件或以其他方式传送。但是供前述目的使用的专用区域除外。
                            </Text>
                        </View>
                        <Text style = {UserAgreementStyles.main_user_arg_p}>
                            3．对于在本网站发表内容，提倡原创，如有帖子转入，应当注明是转帖，不得擅自加为原创； 发表内容不允许只是一个简单的网址链接或图片，必须有文字说明； 对网友间在网站上的各种贸易、交易及信息交流所发生的纠纷本论坛不予负责。
                        </Text>
                        <Text style = {UserAgreementStyles.main_user_arg_p}>
                            4．管理员及版主有权保留或删除论坛中用户发布的任何内容。本站管理员拥有一切管理权力。
                        </Text>

                        <Text style = {UserAgreementStyles.main_user_arg_h3}>
                            四、用户名及密码的安全性
                        </Text>
                        <Text style = {UserAgreementStyles.main_user_arg_p}>
                            1．用户应当确保用户名及密码的安全性。如果丢失或泄露，造成损失的，由本人承担全部后果；用户对利用该用户名及密码所进行的一切活动负全部责任；用户对上述行为所衍生的任何损失或损害，酷蒙在线不承担任何责任。
                        </Text>
                        <Text style = {UserAgreementStyles.main_user_arg_p}>
                            2．用户不得将用户名借予他人或多人使用。如果发现或者有正当的理由怀疑多人共用一个用户名的现象，酷蒙在线将保留结束或终止该用户名的权利。
                        </Text>

                        <Text style = {UserAgreementStyles.main_user_arg_h3}>
                            五、服务约定
                        </Text>
                        <Text style = {UserAgreementStyles.main_user_arg_p}>
                            本网站为用户提供的可下载的教学资源内容，允许用户作为资料自行保存，用户不得将其作为商品进行销售或者提供给他人。
                        </Text>
                        <Text style = {UserAgreementStyles.main_user_arg_h3}>
                            五、服务约定
                        </Text>
                        <Text style = {UserAgreementStyles.main_user_arg_p}>
                            本网站为用户提供的可下载的教学资源内容，允许用户作为资料自行保存，用户不得将其作为商品进行销售或者提供给他人。
                        </Text>

                        <Text style = {UserAgreementStyles.main_user_arg_h3}>
                            六、免责声明
                        </Text>
                        <Text style = {UserAgreementStyles.main_user_arg_p}>
                            1．本网站所有者不保证（但不限于）：
                        </Text>
                        <View style = {UserAgreementStyles. main_user_arg_more_line}>
                            <Text style = {UserAgreementStyles.main_user_arg_p}>
                                （1）本服务不受任何干扰；绝对及时、安全、可靠；不出现任何错误。
                            </Text>
                            <Text style = {UserAgreementStyles.main_user_arg_p}>
                                （2）经由本服务所取得的任何产品、服务或其他材料完全符合用户的期望；
                            </Text>
                        </View>
                        <Text style = {UserAgreementStyles.main_user_arg_p}>
                            2．用户使用经由本服务下载的或取得的任何资料，其风险自行负担。
                        </Text>
                        <Text style = {UserAgreementStyles.main_user_arg_p}>
                            3．由于地震、台风、洪水、火灾、战争、政府禁令以及其他不可抗力或互联网上的黑客攻击事件，致使影响本服务条款的履行，本网站所有者不承担责任。
                        </Text>

                        <Text style = {UserAgreementStyles.main_user_arg_h3}>
                            七、服务条款的修改和修订
                        </Text>
                        <Text style = {UserAgreementStyles.main_user_arg_p}>
                            本网站所有者有权在必要时修改本服务条款以及各单项服务的相关条款。用户在享受单项服务时，应当及时查阅了解修改的内容，并自觉遵守本服务条款以及该单项服务的相关条款。
                        </Text>

                        <Text style = {UserAgreementStyles.main_user_arg_h3}>
                            八、服务的结束
                        </Text>
                        <Text style = {UserAgreementStyles.main_user_arg_p}>
                            用户或本网站所有者双方可随时根据实际情况中断一项或多项网络服务。本网站所有者可以随时中断服务而不需对任何个人或第三方负责。用户对网站的条款修改有异议，或对本网站的服务不满，可以行使如下权利：
                        </Text>
                        <View style = {UserAgreementStyles. main_user_arg_more_line}>
                            <Text style = {UserAgreementStyles.main_user_arg_p}>
                                (1) 停止使用本网站的网络服务。
                            </Text>
                            <Text style = {UserAgreementStyles.main_user_arg_p}>
                                (2) 通知本网站停止对该用户的服务。
                            </Text>
                        </View>

                        <Text style = {UserAgreementStyles.main_user_arg_p}>
                            结束用户服务后，用户使用网络服务的权利马上被终止。终止之后，本网站没有义务向其传送任何未处理的信息或未完成的服务。
                        </Text>

                        <Text style = {UserAgreementStyles.main_user_arg_h3}>
                            九、个人隐私的声明
                        </Text>
                        <Text style = {UserAgreementStyles.main_user_arg_p}>
                            酷蒙在线隐私权声明系本网站保护用户个人隐私的承诺。鉴于网络的特性以及本公司为用户提供服务的性质，本网站将不可避免地与用户产生直接或间接的互动关系
                        ，故特此说明本网站对用户个人信息所采取的收集、使用和保护政策，请务必仔细阅读：
                        </Text>
                        <Text style = {UserAgreementStyles.main_user_arg_p}>
                            1．当用户在酷蒙在线进行用户注册登记、使用本站提供的服务时，在用户的同意及确认下，本网站将通过注册表格等形式要求用户提供一些个人资料。
                        </Text>
                        <Text style = {UserAgreementStyles.main_user_arg_p}>
                            2．在未经用户同意及确认之前，本网站不会将用户所提供的资料利用于其它目的。
                        </Text>
                        <Text style = {UserAgreementStyles.main_user_arg_p}>
                            3．本网站将用户你所提供的资料进行严格的管理及保护，本网站将使用相应的技术，防止用户的个人资料丢失、被盗用或遭篡改。
                        </Text>
                        <Text style = {UserAgreementStyles.main_user_arg_p}>
                            4．本网站在符合下列条件之一，可以对收集之个人资料进行必要范围以外之利用：
                        </Text>
                        <View style = {UserAgreementStyles. main_user_arg_more_line}>
                            <Text style = {UserAgreementStyles.main_user_arg_p}>
                                (1) 已取得用户的书面同意；
                            </Text>
                            <Text style = {UserAgreementStyles.main_user_arg_p}>
                                (2) 为免除用户在生命、身体或财产方面所面临的急迫危险；
                            </Text>
                            <Text style = {UserAgreementStyles.main_user_arg_p}>
                                (3) 为防止他人权益遭受重大危害；
                            </Text>
                            <Text style = {UserAgreementStyles.main_user_arg_p}>
                                (4) 为增进公共利益，且无害于用户的重大利益。
                            </Text>
                        </View>
                        <Text style = {UserAgreementStyles.main_user_arg_p}>
                            5．监护人应承担保护未成年人在网络环境下的隐私权的首要责任。
                        </Text>
                        <Text style = {UserAgreementStyles.main_user_arg_p}>
                            6．有下列情形之一的，本网站免责。
                        </Text>
                        <View style = {UserAgreementStyles. main_user_arg_more_line}>
                            <Text style = {UserAgreementStyles.main_user_arg_p}>
                                (1) 由于用户将用户密码告知他人或与他人共享注册帐户，由此导致的任何个人资料泄露。
                            </Text>
                            <Text style = {UserAgreementStyles.main_user_arg_p}>
                                (2) 任何由于计算机系统、黑客攻击、计算机病毒侵入或发作、因政府管制而造成的暂时性关闭等影响网络正常经营之不可抗力而造成的个人资料泄露、丢失、被盗用或被篡改等。
                            </Text>
                            <Text style = {UserAgreementStyles.main_user_arg_p}>
                                (3) 当政府机关依照法定程序要求本网站披露个人资料时，本网站将根据执法单位的要求或为公共安全之目的提供个人资料。在此情况下之任何披露。
                            </Text>
                        </View>
                        <Text style = {UserAgreementStyles.main_user_arg_h3}>
                            十、本网站所有者对本服务条款拥有最终解释权
                        </Text>
                        <Text style = {UserAgreementStyles.main_user_arg_p}>
                            关本协议不明之处，本网站所有者拥有最终解释权。
                        </Text>
                    </View>
                </ScrollView>

            </View>
        );
    }

    //返回
    goback()
    {
        this.props.navigation.pop();
    }

}