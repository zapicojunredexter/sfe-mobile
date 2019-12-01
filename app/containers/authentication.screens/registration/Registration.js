import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Button,
} from 'react-native';
import UserService from '../../../services/user.service';


class Registration extends React.Component<> {
    listener = null;
    componentDidMount(){
        console.log('mounted');
        this.listener = UserService.createListener((result) => {
            console.log('tua ra man unta', result);
        });
    }
    closeListener = () => {
        if(this.listener) {
            console.log('GINACLOSED');
            this.listener();
        }
    };
  render() {
    return (
      <View>
        <Text>You are in REGISTRATION PAGE</Text>
        <Button
            title="Create User"
            onPress={() => {
                this.props.add({sampleUser:123})
                    .then(() => alert('DONE'))
                    .catch(err => alert(err.message))
            }}
        />
        <Button
            title="CLOSE LISTENER"
            onPress={this.closeListener}
        />
        
      </View>
    );
  }
}
const mapStateToProps = store => ({
});
const mapDispatchToProps = dispatch => ({
    add: params => dispatch(UserService.add(params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Registration);
