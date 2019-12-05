import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Button,
} from 'react-native';
import { HeaderBackButton } from 'react-navigation';
import ConfirmOrderModal from './modals/ConfirmOrderModal';


class Container extends React.Component<> {
    static navigationOptions = ({ navigation }) => ({
        headerLeft: <HeaderBackButton onPress={() => navigation.pop(2)} />,
    })
    state = {
        isConfirming: false,
    };
    render() {
        return (
            <View style={{flex: 1}}>
                <Text>src/containers/main.screens/stores/ConfirmOrder.js</Text>
                <Button title="Confirm Order" onPress={() => this.setState({isConfirming: true})}/>
                <ConfirmOrderModal
                    visible={this.state.isConfirming}
                    close={() => this.setState({isConfirming: false})}
                />
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
