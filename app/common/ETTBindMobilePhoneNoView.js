import {Component} from "react";

export class ETTBindMobilePhoneNoView extends Component {
    render() {
        return (
            <View style={LogStyles.log_bind_header}>
                <TouchableOpacity onPress ={()=>this.goback()}>
                   <Image style={LogStyles.log_back}
                       source={require('../res/images/km_back.png')}/>
                 </TouchableOpacity >

                 <Text style={LogStyles.log_code_title}>
                   绑定账号
                 </Text>

            </View>);
    }
}