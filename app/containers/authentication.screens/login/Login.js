import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Button,
} from 'react-native';
import UserActions from '../../../reducers/user/user.action';

class Login extends React.Component<> {
    static navigationOptions = {
        header: null,
    };
  render() {
    return (
      <View
      >
        <Text>You are in LOGIN PAGE</Text>
        <Button title="Registration" onPress={() => this.props.navigation.navigate('Registration')}/>
        <Button title="LOGIN" onPress={() => {
            this.props.setUserId('SAMPLE_USER_ID');
            this.props.navigation.navigate('Home')}}/>
      </View>
    );
  }
}
const mapStateToProps = store => ({
});
const mapDispatchToProps = dispatch => ({
    setUserId: userId => dispatch(UserActions.setUserId(userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
