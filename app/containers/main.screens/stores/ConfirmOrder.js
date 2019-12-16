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
        noteText: 'Sample notes or additional information here'
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
        const sampleOrder = [
            { name: "order 1"},
            { name: "order 2"},
            { name: "order 3"},
            { name: "order 4"}
            
        ]
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
                            <Text style={{fontSize: 16}}>Juan Luna</Text>
                        </View>
                        <View style={{flexDirection: 'row',justifyContent: 'space-between', marginBottom: 10}}>
                            <Text style={{fontSize: 16}}>Contact Number:</Text>
                            <Text style={{fontSize: 16}}>09123123122</Text>
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
                            onPress={index => alert(index)}
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
                                data={ sampleOrder }
                                extraData={this.props.cartItems}
                                renderItem={({item}) => {
                                    return (
                                    
                                        <View style={{flexDirection: 'row',justifyContent: 'space-between', padding: 15,marginBottom: 10}}>
                                            <Text style={{fontSize: 16}}>Kwek-Kwek</Text>
                                            <Icon name= {'minus'} color='tomato' size={20} />
                                            <Text style={{fontSize: 16}}> 2 </Text>
                                            <Icon name= {'plus'} color='tomato' size={20} />
                                            <Text style={{fontSize: 16}}>&#8369; 10</Text>
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
                        <Text style={{fontSize: 16}}>&#8369; 40</Text>
                    </View>
                    <View style={{flexDirection: 'row',justifyContent: 'space-between', marginTop: 10, marginBottom: 10}}>
                        <Text style={{fontSize: 16}}>Delivery Fee</Text>
                        <Text style={{fontSize: 16}}>&#8369; 30</Text>
                    </View>
                    <View
                        style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: 0.5
                        }}
                    />
                    <View style={{flexDirection: 'row',justifyContent: 'space-between', marginTop: 10}}>
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Total</Text>
                        <Text style={{fontSize: 18, fontWeight: 'bold', color: 'tomato'}}>&#8369; 70</Text>
                    </View>
                    </Card>    
                    
                    </ScrollView> 
                )}
                
               <TouchableOpacity
                onPress={ () => { if (isConfirmed){
                    alert("Your order is waiting for processing. Please wait for store's confirmation. Thank you")
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
                      <Badge value={<Text style={{color: 'tomato', fontWeight: 'bold'}}>2</Text>} badgeStyle = {{backgroundColor: 'white', width: 30, height: 30, borderRadius: 30/2 }} />
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
