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

    renderButtons = () => {
        const canCancel = this.props.userType === 'customer' && true;
        const canAccept = this.props.userType === 'store' && true;
        const canStartDelivery = this.props.userType === 'store' && true;
        const canFinish = this.props.userType === 'store' && true;
        return (
            <React.Fragment>
                {canCancel && <Button
                    title="Cancel Order"
                    onPress={() => {}}
                />}
                {canAccept && <Button
                    title="Accept"
                    onPress={() => {}}
                />}
                {canStartDelivery && <Button
                    title="Start Delivery"
                    onPress={() => {}}
                />}
                {canFinish && <Button
                    title="Finish"
                    onPress={() => {}}
                />}
            </React.Fragment>
        );
    }

    render() {
        const order = this.props.navigation.state && this.props.navigation.state.params;
        return (
            <View>
                <Text>src/containers/main.screens/order.history/OrderHistoryDetails.js</Text>
                <Text>{JSON.stringify(order)}</Text>
                
                {this.renderButtons()}
            </View>
        );
    }a
}
const mapStateToProps = store => ({
    userType: store.userStore.user && store.userStore.user.type,
});
const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
