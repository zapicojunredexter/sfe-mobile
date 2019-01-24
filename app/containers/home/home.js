import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native';

class Home extends PureComponent<Props> {
  render() {
    console.log('RENDERED', this.props);
    return (
      <View style={{backgroundColor : 'red'}}>
        <Button title="asd" />
      </View>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
