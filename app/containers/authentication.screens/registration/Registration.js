import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Button,
} from 'react-native';


class Registration extends React.Component<> {
  render() {
    return (
      <View>
        <Text>You are in REGISTRATION PAGE</Text>
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
