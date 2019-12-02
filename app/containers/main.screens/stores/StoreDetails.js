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
        const store = this.props.navigation.state && this.props.navigation.state.params;
        return (
            <View>
                <Text>src/containers/main.screens/stores/StoreDetails.js</Text>
                <Text>{JSON.stringify(store)}</Text>
                <Button title="Go to Confirm Order" onPress={() => this.props.navigation.navigate('ConfirmOrder')}/>
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
