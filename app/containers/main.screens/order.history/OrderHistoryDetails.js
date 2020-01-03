import React from 'react';
import { connect } from 'react-redux';
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


class Container extends React.Component<> {
    static navigationOptions = ({ navigation }) => ({
        headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
    })

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
                                    onPress: () => {
                                        OrderService.update(order.id, {status: 'cancelled'})();
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
                {canAccept && <Button
                    title="Accept"
                    onPress={() => {
                        Alert.alert(
                            'Accept Order',
                            'Are you sure you want to accept order?',
                            [
                                {
                                    text: 'Yes',
                                    onPress: () => {
                                        OrderService.update(order.id, {status: 'accepted'})();
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
                                        OrderService.update(order.id, {status: 'rejected'})();
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
                {canStartDelivery && <Button
                    title="Start Delivery"
                    onPress={() => {
                        Alert.alert(
                            'Start Delivery',
                            'Are you sure you want to Start delivery?',
                            [
                                {
                                    text: 'Yes',
                                    onPress: () => {
                                        OrderService.update(order.id, {status: 'delivery'})();
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
                {canFinish && <Button
                    title="Finish"
                    onPress={() => {
                        Alert.alert(
                            'Finish Transaction',
                            'Are you sure you want to Finish transaction?',
                            [
                                {
                                    text: 'Yes',
                                    onPress: () => {
                                        OrderService.update(order.id, {status: 'delivered'})();
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
            'WAITING': '#2E8B57',
            'ACCEPTED': '#79BEDB',
            'REJECTED': 'tomato',
            'DELIVERY': '#266A2E',
            'DELIVERED': '#266A2E',
        };
        return (
            <View style={{flex: 1}}>
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
