import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { HeaderBackButton } from 'react-navigation';
import ProductsService from '../../../services/products.service';
import CartActions from '../../../reducers/cart/cart.action';


class Container extends React.Component<> {
    static navigationOptions = ({ navigation }) => ({
        headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
    });

    state = {
        store: null,
        products: [],
    }

    listener = null;

    componentDidMount(){
        const store = this.props.navigation.state && this.props.navigation.state.params;
        if(store){
            this.setState({store});
            this.listener = ProductsService.createStoreProductsListener(store.id, (data) => {
                this.setState({products: data});
            });
        }
    }
    render() {
        const { store } = this.state;
        return (
            <View>
                <Button
                    title="Go to Confirm Order"
                    onPress={() => {
                        this.props.navigation.navigate('ConfirmOrder', store);
                    }}
                />
                <Text>src/containers/main.screens/stores/StoreDetails.js</Text>
                <Text style={{marginTop: 15}}>STORE DETAILS: {JSON.stringify(store)}</Text>
                <Text style={{marginTop: 15}}>PRODUCTS: </Text>
                <FlatList
                    data={this.state.products}
                    extraData={this.props.cartItems}
                    renderItem={({item}) => {
                        const isInCart = !!this.props.cartItems[item.id];
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    if(isInCart) {
                                        this.props.remoteFromCart(item.id);
                                    } else {
                                        this.props.addCartItem(item);
                                    }
                                }}
                            >
                                <Text> - {JSON.stringify(item)}</Text>
                            </TouchableOpacity>
                        );
                    }}
                />
                <Text style={{marginTop: 15}}>CART ITEMS : {JSON.stringify(this.props.cartItems)}</Text>
                
            </View>
        );
    }
}
const mapStateToProps = store => ({
    cartItems: store.cartStore.cartItems
});
const mapDispatchToProps = dispatch => ({
    addCartItem: item => dispatch(CartActions.addCartItem(item)),
    remoteFromCart: itemId => dispatch(CartActions.removeCartItem(itemId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
