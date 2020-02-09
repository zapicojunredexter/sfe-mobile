import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity
} from 'react-native';
import UserActions from '../../../reducers/user/user.action';
import UserService from '../../../services/user.service';
import NotificationService from '../../../services/notification.service';

import Spinner from 'react-native-loading-spinner-overlay';

class Login extends React.Component<> {
    static navigationOptions = {
        header: null,
    };
    state = {
        username: '',
        password: '',
        isLoading: false
    };

    login = () => {
        this.setState({isLoading: true})
        UserService.login(this.state.username, this.state.password)
            .then(res => {
                this.setState({isLoading: false})
                this.props.setUser(res);
                NotificationService.setNotifToken(res.id);
                NotificationService.listenNotification();
                if(res.type === 'store') {
                    this.props.navigation.navigate('Profile')
                }
                if(res.type === 'customer') {
                    this.props.navigation.navigate('Stores')
                }
            })
            .catch(err => {
                this.setState({isLoading: false})
                alert(err.message);
            });
    }
    
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'tomato'}}>
        <Spinner
            visible={this.state.isLoading}
            textContent={'Loading...'}
        />
        <View style={{ justifyContent: 'center', alignItems: 'center', top: '15%'}}
        >
          <Image
              style = {{width: 150 , height: 150}}
              source={require('../../../assets/images/sfelogowhite.png')}
          />
          <TextInput
            value={this.state.username}
            onChangeText={text => this.setState({username: text})}
            placeholder="Login ID"
            placeholderTextColor = 'white'
            underlineColorAndroid = 'white'
            style={{color: 'white',marginTop: 20, marginBottom: 10, width: '70%'}}
          />
           <TextInput
            value={this.state.password}
            onChangeText={text => this.setState({password: text})}
            placeholderTextColor = 'white'
            underlineColorAndroid = 'white'
            style={{color: 'white', marginBottom: 20 , width: '70%'}}
            placeholder="Password"
          />
          <TouchableOpacity  
            onPress={this.login}     
            style={{backgroundColor: 'white', color: 'tomato', width: '50%', padding: 15, borderRadius: 5}} 
            >
            <Text style={{color: 'tomato', textAlign: 'center', fontSize: 16}}>Login</Text>
          </TouchableOpacity>

          <Text style={{color: 'white', marginTop: 10}} >
            Forgot Password?
          </Text>

          <Text style={{color: 'white', marginTop: 30}} onPress={() => this.props.navigation.navigate('Registration')}>
            New user? Create an account
          </Text>
          
        </View>

        {/* <Text>You are in LOGIN PAGE</Text>
        <TextInput
            value={this.state.username}
            onChangeText={text => this.setState({username: text})}
            placeholder="Username"
        />
        <TextInput
            value={this.state.password}
            onChangeText={text => this.setState({password: text})}
            placeholder="Password"
        />
        <Button title="Registration" onPress={() => this.props.navigation.navigate('Registration')}/>
        <Button
            title="LOGIN"
            onPress={this.login}
        /> */}
      </View>
    );
  }
}
const mapStateToProps = store => ({
});
const mapDispatchToProps = dispatch => ({
    setUser: user => dispatch(UserActions.setUser(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
