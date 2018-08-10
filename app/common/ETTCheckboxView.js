import React, {PureComponent} from 'react'
import {
    StyleSheet,
    View,
    Image,
    TouchableHighlight
}from 'react-native';

export default class ETTCheckBox extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: this.props.info.isChecked || false
        };
    }
    getImage()
    {
        //alert(this.props.info.checkedImage);
        // alert(this.state.isChecked)
        if(this.state.isChecked)
        {

           return <Image  style={this.props.info.styles}
               source={require('../res/images/select_c8_pressed.png')}/>
        }

        return <Image
            source={require('../res/images/select_c10_default.png')}/>

    }

    checkClick() {

        this.setState({
            isChecked: !this.state.isChecked

        });
        let callback = this.props.checkSelected;
        if (callback)
        {


            callback(!this.state.isChecked);
        }


    }
    render() {
        return (

               <TouchableHighlight underlayColor={'transparent'} onPress={() => this.checkClick()}>
                   {this.getImage()}
               </TouchableHighlight>

        );
    }
}