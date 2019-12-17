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

    state = {
        username: '',
        password: '',
        name: '',
        contactNumber: '',
        address: '',

    };
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
            username: this.state.username,
            password: this.state.password,
            type: 'customer',
        };
        const customer = {
            name: this.state.name,
            contactNumber: this.state.contactNumber,
            address: this.state.address,
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
              placeholder="Username"
              placeholderTextColor = 'white'
              underlineColorAndroid = 'white'
              style={{color: 'white',marginTop: 20, marginBottom: 10, width: '70%'}}
              value={this.state.username}
              onChangeText={ev => this.setState({username: ev})}
            />
            <TextInput
              placeholderTextColor = 'white'
              underlineColorAndroid = 'white'
              style={{color: 'white', marginBottom: 10 , width: '70%'}}
              placeholder="Password"
              value={this.state.password}
              onChangeText={ev => this.setState({password: ev})}
            />
            <TextInput
              placeholder="Full Name"
              placeholderTextColor = 'white'
              underlineColorAndroid = 'white'
              style={{color: 'white',marginBottom: 10, width: '70%'}}
              value={this.state.name}
              onChangeText={ev => this.setState({name: ev})}
            />
            <TextInput
              placeholder="Contact Number"
              placeholderTextColor = 'white'
              underlineColorAndroid = 'white'
              style={{color: 'white', marginBottom: 10, width: '70%'}}
              value={this.state.contactNumber}
              onChangeText={ev => this.setState({contactNumber: ev})}
            />
            <TextInput
              placeholder="Default Delivery Address"
              placeholderTextColor = 'white'
              underlineColorAndroid = 'white'
              style={{color: 'white', marginBottom: 10, width: '70%'}}
              value={this.state.address}
              onChangeText={ev => this.setState({address: ev})}
            />
            <TouchableOpacity  
                onPress={this.submitRegistration}     
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
