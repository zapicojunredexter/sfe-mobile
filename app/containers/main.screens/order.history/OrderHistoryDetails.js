import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Button,
} from 'react-native';
import { HeaderBackButton } from 'react-navigation';


class Container extends React.Component<> {
    static navigationOptions = ({ navigation }) => ({
        headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
    })
    render() {
        const order = this.props.navigation.state && this.props.navigation.state.params;
        return (
            <View>
                <Text>src/containers/main.screens/order.history/OrderHistoryDetails.js</Text>
                <Text>{JSON.stringify(order)}</Text>
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
