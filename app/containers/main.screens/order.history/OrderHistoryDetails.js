import React from 'react';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import {
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
  Platform 
} from 'react-native';

import { Card } from 'react-native-elements';
import { HeaderBackButton } from 'react-navigation';
import OrderService from '../../../services/orders.service';
import ProductService from '../../../services/products.service';
import UserService from '../../../services/user.service';
import StartOrderModal from './modals/StartOrderModal';
import StripeService from '../../../services/stripe.service';

import Spinner from 'react-native-loading-spinner-overlay';

class Container extends React.Component<> {
    static navigationOptions = ({ navigation }) => ({
        headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
    })

    state = {
        isStartDeliverModalOpen: false,
        isLoading: false
    }

    renderButtons = () => {
        const order = this.props.navigation.state && this.props.navigation.state.params;
        if(!order){
            return null;
        }
        const canCancel = this.props.userType === 'customer' && order.status === 'waiting';
        const canAccept = this.props.userType === 'store' && order.status === 'waiting';
        const canReject = this.props.userType === 'store' && order.status === 'waiting';
        const canStartDelivery = this.props.userType === 'store' && order.status === 'accepted';
        const canFinish = this.props.userType === 'store' && order.status === 'delivery';
        const canSendSms = this.props.userType === 'store' && order.status;
        const canFeedback = this.props.userType === 'customer' && order.status === 'delivered';
        return (
            <React.Fragment>
                {canFeedback && <Button
                    title="Submit Review"
                    onPress={() => {
                        this.props.navigation.navigate('AddFeedback', order)
                    }}
                />}
                {canSendSms && <Button
                    title="Send SMS"
                    onPress={() => {
                        const url = (Platform.OS === 'android')
                        ? `sms:${order.contactNumber}`
                        : `sms:${order.contactNumber}`
                        Linking.canOpenURL(url).then(supported => {
                            if (!supported) {
                                console.log('Unsupported url: ' + url)
                            } else {
                                return Linking.openURL(url)
                            }
                        }).catch(err => console.error('An error occurred', err))
                    }}
                />}
                {canCancel && <Button
                    title="Cancel Order"
                    onPress={() => {
                        Alert.alert(
                            'Cancel Order',
                            'Are you sure you want to cancel your order?',
                            [
                                {
                                    text: 'Yes',
                                    onPress: async () => {
                                        try {
                                            this.setState({isLoading: true});
                                            const stripeCharge = order.stripeCharge;
                                            if(stripeCharge){
                                                await StripeService.cancelCharge({chargeId: stripeCharge});
                                            }
                                            OrderService.update(order.id, {
                                                status: 'cancelled',
                                                cancelledDate: firebase.firestore.FieldValue.serverTimestamp(),
                                            })()
                                            .then(() => {
                                                this.setState({isLoading: false})
                                                this.props.navigation.goBack(null);
                                            })
                                            .catch(err => {
                                                this.setState({isLoading: false})
                                                alert(err.message);
                                            });
                                        } catch (err) {
                                            this.setState({isLoading: false})
                                            alert(err.message);
                                        }
                                    }
                                },
                              {
                                text: 'No',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                              },
                            ],
                            {cancelable: true},
                        );
                    }}
                />}
                {canAccept && <Button
                    title="Accept"
                    onPress={() => {
                        Alert.alert(
                            'Accept Order',
                            'Are you sure you want to accept order?',
                            [
                                {
                                    text: 'Yes',
                                    onPress: async () => {
                                        try {
                                            this.setState({isLoading: true});
                                            const { cart, customer } = order;
                                            const toBeRestocked = cart.map(crt => ({
                                                id: crt.itemId,
                                                qty: crt.orderQty,
                                                name: crt.itemName,
                                            }));

                                            const res = await ProductService.updateProductStockByCart(toBeRestocked)
                                            if(res){
                                                await ProductService.updateProductStockByCart(toBeRestocked);
                                                await OrderService.update(order.id, {
                                                    status: 'accepted',
                                                    acceptedDate: firebase.firestore.FieldValue.serverTimestamp(),
                                                })();
                                                this.setState({isLoading: false})
                                                UserService.sendNotifToUser(customer.id, {
                                                    title: 'Your order has been accepted',
                                                    message: 'Item is being prepared',
                                                });
                                                alert('successfully accepted order');
                                                this.props.navigation.goBack(null);
                                            }
                                            
                                            this.setState({isLoading: false})
                                        } catch (err) {
                                            this.setState({isLoading: false})
                                            alert(err.message);
                                        }
                                    }
                                },
                              {
                                text: 'No',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                              },
                            ],
                            {cancelable: true},
                        );
                    }}
                />}
                {canReject && <Button
                    title="Reject"
                    onPress={() => {
                        Alert.alert(
                            'Reject Order',
                            'Are you sure you want to reject order?',
                            [
                                {
                                    text: 'Yes',
                                    onPress: () => {
                                        this.setState({isLoading: true})
                                        OrderService.update(order.id, {
                                            status: 'rejected',
                                            rejectedDate: firebase.firestore.FieldValue.serverTimestamp(),
                                        })()
                                        .then(() => {
                                            this.setState({isLoading: false})
                                            this.props.navigation.goBack(null);
                                        })
                                        .catch(err => {
                                            this.setState({isLoading: false})
                                            alert(err.message);
                                        });;
                                    }
                                },
                              {
                                text: 'No',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                              },
                            ],
                            {cancelable: true},
                        );
                    }}
                />}
                {canStartDelivery && <Button
                    title="Start Delivery"
                    onPress={() => this.setState({isStartDeliverModalOpen: true})}
                />}
                {canFinish && <Button
                    title="Finish"
                    onPress={() => {
                        Alert.alert(
                            'Finish Transaction',
                            'Are you sure you want to Finish transaction?',
                            [
                                {
                                    text: 'Yes',
                                    onPress: async () => {
                                        this.setState({isLoading: true})
                                        OrderService.update(order.id, {
                                            status: 'delivered',
                                            deliveredDate: firebase.firestore.FieldValue.serverTimestamp(),
                                        })();
                                        this.setState({isLoading: false});
                                        this.props.navigation.goBack(null);
                                    }
                                },
                              {
                                text: 'No',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                              },
                            ],
                            {cancelable: true},
                        );
                    }}
                />}
            </React.Fragment>
        );
    }

    render() {
        const order = this.props.navigation.state && this.props.navigation.state.params;
        if(!order){
            return null;
        }
        const statusUC = order.status && order.status.toUpperCase() || 'wala';
        const cardBgColor = {
            'CANCELLED': 'tomato',
            'WAITING': '#cc3f22',
            'ACCEPTED': '#79BEDB',
            'REJECTED': 'tomato',
            'DELIVERY': '#266A2E',
            'DELIVERED': '#266A2E',
        };
        return (
            <View style={{flex: 1}}>
                <Spinner
                visible={this.state.isLoading}
                textContent={'Loading...'}
                />
                <StartOrderModal
                    visible={this.state.isStartDeliverModalOpen}
                    close={() => this.setState({isStartDeliverModalOpen: false})}
                    submit={(newFields) => {

                        Alert.alert(
                            'Start Delivery',
                            'Are you sure you want to Start delivery?',
                            [
                                {
                                    text: 'Yes',
                                    onPress: () => {
                                        this.setState({isLoading: true});
                                        const { customer } = order;
                                        OrderService.update(order.id, {
                                                status: 'delivery',

                                                deliveryDate: firebase.firestore.FieldValue.serverTimestamp(),
                                                ...newFields,
                                            })()
                                            .then(() => {
                                                UserService.sendNotifToUser(customer.id, {
                                                    title: 'Your order is being delivered',
                                                    message: 'Item is on its way'
                                                });
                                                this.setState({isStartDeliverModalOpen: false, isLoading: false,})
                                                this.props.navigation.goBack(null);
                                            })
                                            .catch(err => {
                                                this.setState({isLoading: false})
                                                alert(err.message);
                                            });
                                    }
                                },
                              {
                                text: 'No',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                              },
                            ],
                            {cancelable: true},
                        );
                    }}
                />
                <ScrollView>
                    <Card title={statusUC} titleStyle = {{backgroundColor: cardBgColor[statusUC], color: 'white', padding: 10}}>
                        <View style={{flexDirection: 'row',justifyContent: 'space-between', marginBottom: 15}}>
                            <Text style={{fontSize: 16}}>Order Date:</Text>
                            <Text style={{fontSize: 16}}>{order.createdAtMs && `${new Date(order.createdAtMs).toLocaleDateString()} ${new Date(order.createdAtMs).toLocaleTimeString()}`}</Text>
                        </View>
                        <View style={{flexDirection: 'row',justifyContent: 'space-between', marginBottom: 15}}>
                            <Text style={{fontSize: 16}}>Store Name:</Text>
                            <Text style={{fontSize: 16}}>{order.store && order.store.name}</Text>
                        </View>
                        <View style={{flexDirection: 'row',justifyContent: 'space-between', marginBottom: 15}}>
                            <Text style={{fontSize: 16}}>Order Details:</Text>
                        </View>
                        <View style={{paddingLeft: 10, marginBottom: 15}}>

                            {order.cart.map(cart => (
                                <View style={{flexDirection: 'row',justifyContent: 'space-around', marginBottom: 10}}>
                                    <Text style={{fontSize: 14}}>{cart.itemName} ({cart.orderQty}) </Text>
                                    <Text style={{fontSize: 14}}>&#8369; {cart.price}</Text>
                                </View>
                            ))}
                        </View>
                        <View style={{flexDirection: 'row',justifyContent: 'space-between', marginBottom: 15}}>
                            <Text style={{fontSize: 16}}>SubTotal:</Text>
                            <Text style={{fontSize: 16}}>&#8369; {order.payment && order.payment.subtotal}</Text>
                        </View>
                        {(order.status === 'accepted' || order.status === 'delivery' || order.status === 'delivered') && (
                            <View style={{flexDirection: 'row',justifyContent: 'space-between', marginBottom: 15}}>
                                <Text style={{fontSize: 16}}>Driver's Name:</Text>
                                <Text style={{fontSize: 16}}>{order && order.driverName}</Text>
                            </View>
                        )}
                        
                        <View style={{flexDirection: 'row',justifyContent: 'space-between', marginBottom: 15}}>
                            <Text style={{fontSize: 16}}>Customer's Name:</Text>
                            <Text style={{fontSize: 16}}>{order && order.customer && order.customer.name}</Text>
                        </View>

                        <View style={{flexDirection: 'row',justifyContent: 'space-between', marginBottom: 15}}>
                            <Text style={{fontSize: 16}}>Note:</Text>
                            <Text style={{fontSize: 16}}>{order && order.note}</Text>
                        </View>
                        
                        <View style={{flexDirection: 'row',justifyContent: 'space-between', marginBottom: 15}}>
                            <Text style={{fontSize: 16}}>Delivery Address:</Text>
                            <Text style={{fontSize: 16}}>{order && order.deliveryAddress}</Text>
                        </View>
                        <View style={{flexDirection: 'row',justifyContent: 'space-between', marginBottom: 15}}>
                            <Text style={{fontSize: 16}}>Delivery Fee:</Text>
                            <Text style={{fontSize: 16}}>&#8369; {order.payment && order.payment.deliveryFee}</Text>
                        </View>
                        <View
                        style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: 0.5
                        }}
                         />
                        <View style={{flexDirection: 'row',justifyContent: 'space-between', marginTop: 15}}>
                            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'tomato'}}>Total Payment:</Text>
                            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'tomato'}}>&#8369; {order.payment && order.payment.total}</Text>
                        </View>
                        
                    </Card>
                </ScrollView>
                {/* <Text>{JSON.stringify(order)}</Text> */}
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
