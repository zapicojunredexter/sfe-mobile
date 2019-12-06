import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Button,
  Alert,
} from 'react-native';
import { HeaderBackButton } from 'react-navigation';
import ConfirmOrderModal from './modals/ConfirmOrderModal';
import OrderService from '../../../services/orders.service';
import CartActions from '../../../reducers/cart/cart.action';


class Container extends React.Component<> {
    static navigationOptions = ({ navigation }) => ({
        headerLeft: <HeaderBackButton onPress={() => navigation.pop(2)} />,
    });

    state = {
        store: null
    };

    componentDidMount(){
        const store = this.props.navigation.state && this.props.navigation.state.params;
        if(store){
            this.setState({store});
        }
    }
    submitOrder = (paymentType) => {
        const { store } = this.state;
        const payload = {
            store: {
                id: store.id,
                name: store.name,
            },
            customer: {
                id: this.props.userId,
            },
            cart: this.props.cartItems,
            paymentType,
        };
        this.props.submitOrder(payload)
            .then(() => {
                alert('successfully added order');
                this.props.clearCart();
                this.props.navigation.pop(2);
            })
            .catch(err => alert(err.message));
    }
    render() {
        return (
            <View style={{flex: 1}}>
                <Text>src/containers/main.screens/stores/ConfirmOrder.js</Text>
                <Button
                    title="Confirm Order"
                    onPress={() => {
                        Alert.alert(
                            'Select Type',
                            'Select payment type',
                            [
                              {text: 'COD', onPress: () => this.submitOrder('cod')},
                              {text: 'Credit Card', onPress: () => this.submitOrder('cc')},
                              {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                              },
                            ],
                            {cancelable: true},
                          );
                    }}
                />
            </View>
        );
    }
}
const mapStateToProps = store => ({
    userId: store.userStore.user && store.userStore.user.id,
    cartItems: store.cartStore.cartItems,
});
const mapDispatchToProps = dispatch => ({
    submitOrder: order => dispatch(OrderService.add(order)),
    clearCart: () => dispatch(CartActions.clearCart()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
