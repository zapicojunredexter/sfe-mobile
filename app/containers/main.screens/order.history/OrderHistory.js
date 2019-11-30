import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Button,
} from 'react-native';

class Container extends React.Component<> {
  render() {
    return (
      <View
      >
      <Text>src/containers/main.screens/order.history/index.js</Text>
        <Button title="Go To Order Details" onPress={() => {this.props.navigation.navigate('OrderHistoryDetails')}}/>
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
)(Container);
