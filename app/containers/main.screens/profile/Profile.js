import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Button,
} from 'react-native';

class Container extends React.Component<> {
    static navigationOptions = {
        headerTitle : 'profile/index.js',
    };
    render() {
        return (
            <View
            >
                <Text>src/containers/main.screens/profile/index.js</Text>
                <Button title="Click" onPress={() => {}}/>
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
