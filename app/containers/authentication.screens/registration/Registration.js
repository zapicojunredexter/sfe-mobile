import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView
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
      <View style={{flex: 1, backgroundColor: 'tomato'}}>
        <ScrollView>
          <View style={{ justifyContent: 'center', alignItems: 'center', top: '2%', marginBottom: 10}}
          >
            <Image
                style = {{width: 120 , height: 120}}
                source={require('../../../assets/images/sfelogowhite.png')}
            />
            <TextInput
              placeholder="Email Address"
              placeholderTextColor = 'white'
              underlineColorAndroid = 'white'
              style={{color: 'white',marginTop: 20, marginBottom: 10, width: '70%'}}
            />
            <TextInput
              placeholderTextColor = 'white'
              underlineColorAndroid = 'white'
              style={{color: 'white', marginBottom: 10 , width: '70%'}}
              placeholder="Password"
            />
            <TextInput
              placeholderTextColor = 'white'
              underlineColorAndroid = 'white'
              style={{color: 'white', marginBottom: 10 , width: '70%'}}
              placeholder="Confirm Password"
            />
            <TextInput
              placeholder="First Name"
              placeholderTextColor = 'white'
              underlineColorAndroid = 'white'
              style={{color: 'white',marginBottom: 10, width: '70%'}}
            />
            <TextInput
              placeholder="Last Name"
              placeholderTextColor = 'white'
              underlineColorAndroid = 'white'
              style={{color: 'white', marginBottom: 10, width: '70%'}}
            />
            <TextInput
              placeholder="Contact Number"
              placeholderTextColor = 'white'
              underlineColorAndroid = 'white'
              style={{color: 'white', marginBottom: 10, width: '70%'}}
            />
            <TextInput
              placeholder="Default Delivery Address"
              placeholderTextColor = 'white'
              underlineColorAndroid = 'white'
              style={{color: 'white', marginBottom: 10, width: '70%'}}
            />
            <TouchableOpacity       
              style={{backgroundColor: 'white', color: 'tomato', width: '50%', padding: 10, borderRadius: 5}}>
              <Text style={{color: 'tomato', textAlign: 'center', fontSize: 16}}>Register</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* <Text>You are in REGISTRATION PAGE</Text>
        <Button
            title="Create User"
            onPress={this.submitRegistration}
        />
        <Button
            title="CLOSE LISTENER"
            onPress={this.closeListener}
        />
         */}
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
