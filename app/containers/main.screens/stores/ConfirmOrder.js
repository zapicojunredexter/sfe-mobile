import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { Card, Badge, ButtonGroup } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import { HeaderBackButton } from 'react-navigation';
import ConfirmOrderModal from './modals/ConfirmOrderModal';
import OrderService from '../../../services/orders.service';
import CartActions from '../../../reducers/cart/cart.action';


class Container extends React.Component<> {
    static navigationOptions = ({ navigation }) => ({
        headerLeft: <HeaderBackButton onPress={() => navigation.pop(2)} />,
    });

    state = {
        store: null,
        isConfirmed: false,
        deliveryAddress: 'Talisay City',
        noteText: 'Sample notes or additional information here',
        paymentType: 'COD',
    };

    componentDidMount(){
        const store = this.props.navigation.state && this.props.navigation.state.params;
        if(store){
            this.setState({store});
        }
    }
    submitOrder = () => {
        const {cartItems} = this.props;
        const { store, paymentType, noteText, deliveryAddress } = this.state;
        const cartArray = Object.values(cartItems);
        const subtotal = cartArray.reduce((acc, cur) => {
            return acc + (cur.price * cur.orderQty);
        }, 0);
        const deliveryFee = 0;
        const total = subtotal + deliveryFee;
        const cart = cartArray.map(crt => ({
            itemId: crt.id,
            orderQty: crt.orderQty,
            price: crt.price,
            itemName: crt.name,
        }));
        const payload = {
            store: {
                id: store.id,
                name: store.name,
            },
            customer: {
                id: this.props.userId,
                name: this.props.name,
            },
            cart,
            status: 'waiting',
            note: noteText,
            deliveryAddress,
            payment: {
                type: paymentType,
                subtotal,
                total,
                deliveryFee
            }
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
        const {cartItems, name} = this.props;
        const contactNumber = '';
        const cartArray = Object.values(cartItems);
        const subtotal = cartArray.reduce((acc, cur) => {
            return acc + (cur.price * cur.orderQty);
        }, 0);
        const deliveryFee = 0;
        const total = subtotal + deliveryFee;
        const isConfirmed = this.state.isConfirmed
        const noteText = this.state.noteText
        const deliveryAddress = this.state.deliveryAddress


        return (
            <View style={{flex: 1}}>
                {isConfirmed ? (
                <ScrollView>
                    <Card>
                         <View style={{flexDirection: 'row',justifyContent: 'space-between', marginBottom: 10}}>
                            <Text style={{fontSize: 16}}>Name:</Text>
                            <Text style={{fontSize: 16}}>{name}</Text>
                        </View>
                        <View style={{flexDirection: 'row',justifyContent: 'space-between', marginBottom: 10}}>
                            <Text style={{fontSize: 16}}>Contact Number:</Text>
                            <Text style={{fontSize: 16}}>{contactNumber}</Text>
                        </View>
                        <View style={{flexDirection: 'row',justifyContent: 'space-between', marginBottom: 10}}>
                            <Text style={{fontSize: 16, marginTop: 20}}>Delivery Address:</Text>
                            <TextInput
                                style={{ fontSize: 16}}
                                value= {this.state.deliveryAddress}
                                onChangeText = {(deliveryAddress) => this.setState({deliveryAddress})}
                            />
                        </View>
                        <View>
                            <Text style={{fontSize: 16, marginBottom: 10}}>Payment Type</Text>
                        </View>
                        <ButtonGroup
                            // onPress={index => alert(index)}
                            selectedIndex={0}
                            // buttonStyle = {{backgroundColor: 'tomato', color: 'white'}}
                            buttons={[<Text>COD</Text>,<Text>Credit Card</Text>]}
                            containerStyle={{height: 50, marginBottom: 10}} />
                        <View>
                            <Text style={{fontSize: 16}}>Note</Text>
                        </View>
                        <View>
                        <TextInput
                            multiline={true}
                            numberOfLines={2}
                            onChangeText={(noteText) => this.setState({noteText})}
                            value={this.state.noteText}
                            style = {{marginBottom: 10}}/>
                        </View>
                    </Card>
                </ScrollView>

                ) : (
                    <ScrollView>
                    <Card>
                        <View style={{marginBottom: 10}}>
                            <FlatList
                                data={ cartArray }
                                extraData={this.props.cartItems}
                                renderItem={({item}) => {
                                    return (
                                        <View style={{flexDirection: 'row',justifyContent: 'space-between', padding: 15,marginBottom: 10}}>
                                            <Text style={{fontSize: 16}}>{item.name}</Text>
                                            <Icon
                                                onPress={() => {
                                                    this.props.updateCartItem(item.id, {
                                                        orderQty: item.orderQty - 1,
                                                    });
                                                }}
                                                name= {'minus'}
                                                color='tomato'
                                                size={20}
                                                disabled={item.orderQty <= 1}
                                            />
                                            <Text style={{fontSize: 16}}> {item.orderQty} </Text>
                                            <Icon
                                                onPress={() => {
                                                    this.props.updateCartItem(item.id, {
                                                        orderQty: item.orderQty + 1,
                                                    });
                                                }}
                                                name= {'plus'}
                                                color='tomato'
                                                size={20}
                                                disabled={item.orderQty >= item.stockQty}
                                            />
                                            <Text style={{fontSize: 16}}>&#8369; {item.price * item.orderQty}</Text>
                                        </View>
                                    );
                                }}
                            /> 
                       </View>
                    <View
                        style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: 0.5
                        }}
                    />
                    <View style={{flexDirection: 'row',justifyContent: 'space-between', marginTop: 10}}>
                        <Text style={{fontSize: 16}}>Subtotal</Text>
                        <Text style={{fontSize: 16}}>&#8369; {subtotal}</Text>
                    </View>
                    <View style={{flexDirection: 'row',justifyContent: 'space-between', marginTop: 10, marginBottom: 10}}>
                        <Text style={{fontSize: 16}}>Delivery Fee</Text>
                        <Text style={{fontSize: 16}}>&#8369; {deliveryFee}</Text>
                    </View>
                    <View
                        style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: 0.5
                        }}
                    />
                    <View style={{flexDirection: 'row',justifyContent: 'space-between', marginTop: 10}}>
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Total</Text>
                        <Text style={{fontSize: 18, fontWeight: 'bold', color: 'tomato'}}>&#8369; {total}</Text>
                    </View>
                    </Card>    
                    
                    </ScrollView> 
                )}
                
               <TouchableOpacity
                    onPress={ () => { if (isConfirmed){
                        // alert("Your order is waiting for processing. Please wait for store's confirmation. Thank you")
                        this.submitOrder();
                    }else {
                        this.setState({isConfirmed: true})
                    }
                        
                    }} 
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        backgroundColor: 'tomato',
                        padding: 10
                     }}>
                        <Badge value={<Text style={{color: 'tomato', fontWeight: 'bold'}}>{cartArray.length}</Text>} badgeStyle = {{backgroundColor: 'white', width: 30, height: 30, borderRadius: 30/2 }} />
                            <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>{ isConfirmed? "Submit" : "Place Order"}</Text>
                        <Icon name= {'right'} color='white' size={25}/>
                </TouchableOpacity>
                     
                {/* <Button
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
                /> */}
            </View>
        );
    }
}
const mapStateToProps = store => ({
    userId: store.userStore.user && store.userStore.user.id,
    name: store.userStore.user && store.userStore.user.name,
    cartItems: store.cartStore.cartItems,
});
const mapDispatchToProps = dispatch => ({
    submitOrder: order => dispatch(OrderService.add(order)),
    clearCart: () => dispatch(CartActions.clearCart()),
    updateCartItem: (id, payload) => dispatch(CartActions.updateCartItem(id, payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
