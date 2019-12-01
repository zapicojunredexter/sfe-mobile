import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Button,
  TextInput
} from 'react-native';
import UserActions from '../../../reducers/user/user.action';
import UserService from '../../../services/user.service';

class Login extends React.Component<> {
    static navigationOptions = {
        header: null,
    };
    state = {
        username: '',
        password: '',
    };

    login = () => {
        UserService.login(this.state.username, this.state.password)
            .then(res => {
                this.props.setUser(res);
                if(res.type === 'store') {
                    this.props.navigation.navigate('Profile')
                }
                if(res.type === 'customer') {
                    this.props.navigation.navigate('Stores')
                }
            })
            .catch(err => {
                alert(err.message);
            });
    }
    
  render() {
    return (
      <View>
        <Text>You are in LOGIN PAGE</Text>
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
        />
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
