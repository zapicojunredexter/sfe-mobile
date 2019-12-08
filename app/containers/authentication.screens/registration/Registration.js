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
        // this.listener = UserService.createListener((result) => {
        //     console.log('tua ra man unta', result);
        // });
    }
    closeListener = () => {
        // if(this.listener) {
        //     console.log('GINACLOSED');
        //     this.listener();
        // }
    };

    submitRegistration = () => {
        const user = {
            username: 'customer1',
            password: 'customer',
        };
        const customer = {
            name: `sample name ${new Date().getTime()}`,
            mobileNumber: '09123123123',
        };
        UserService.registerCustomer(user, customer)
            .then(() => {
                alert('successfully registerd');
            })
            .catch(err => alert(err.message));
    }
  render() {
    return (
      <View>
        <Text>You are in REGISTRATION PAGE</Text>
        <Button
            title="Create User"
            onPress={this.submitRegistration}
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Registration);
