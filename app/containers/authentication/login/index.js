import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Button,
} from 'react-native';

type Props = {
};


class Login extends React.Component<Props> {
  render() {
    return (
      <View
      >
        <Text>You are in LOGIN PAGE</Text>
        <Button title="Registration" onPress={() => this.props.navigation.navigate('Registration')}/>
        <Button title="Home" onPress={() => this.props.navigation.navigate('Home')}/>
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
)(Login);
