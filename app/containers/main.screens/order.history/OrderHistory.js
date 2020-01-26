import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { Card } from 'react-native-elements';
import OrderService from '../../../services/orders.service';

class Container extends React.Component<> {
    listener = null;
    state = {
        orders: [],
        isFetching: false,
    };
    componentDidMount() {
        if(this.props.userType === 'customer') {  
            this.fetchCustomerOrders();
            this.listener = OrderService.createCustomerListener(this.props.userId, (data) => {
                this.setState({orders: data});
            });  
        }
        if(this.props.userType === 'store') {
            this.listener = OrderService.createStoreListener(this.props.userId, (data) => {
                this.setState({orders: data});
            });
        }
    }
    componentWillUnmount() {
        if(this.listener) {
            this.listener();
        }
    }

    fetchCustomerOrders = () => {
        this.setState({isFetching: true});
        OrderService.getCustomerOrders(this.props.userId).then((data) => {
            this.setState({isFetching: false, orders: data});
        })
        .catch(err => {
            alert(err.message)
        })
    }

    fetchStoreOrders = () => {
        this.setState({isFetching: true});
        OrderService.getStoreOrders(this.props.userId).then((data) => {
            this.setState({isFetching: false, orders: data});
        })
        .catch(err => {
            alert(err.message)
        })
    }
    render() {
        const refreshFunctions = {
            customer: this.state.fetchCustomerOrders,
            store: this.state.fetchStoreOrders
        };
        return (
            <View style={{flex: 1}}>
                <FlatList
                    data={ this.state.orders }
                    refreshing={this.state.refreshing}
                    onRefresh={refreshFunctions[this.props.userType]}
                    renderItem={({item}) => {
                        //  ['cancelled','waiting', 'accepted','rejected','delivery', 'delivered']
                        const statusUC = item.status && item.status.toUpperCase() || 'wala';
                        const cardBgColor = {
                            'CANCELLED': 'tomato',
                            'WAITING': '#cc3f22',
                            'ACCEPTED': '#79BEDB',
                            'REJECTED': 'tomato',
                            'DELIVERY': '#266A2E',
                            'DELIVERED': '#266A2E',
                        };
                        return (
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('OrderHistoryDetails', item)
                            }}
                        >
                            <Card
                                title={statusUC}
                                titleStyle = {{backgroundColor: cardBgColor[statusUC], color: 'white', padding: 10}}
                                // title='CANCELLED'
                                // titleStyle = {{backgroundColor: 'tomato', color: 'white', padding: 10}}
                                // title='CONFIRMED'
                                // titleStyle = {{backgroundColor: '#79BEDB', color: 'white', padding: 10}}
                                // title='DELIVERED'
                                // titleStyle = {{backgroundColor: '#266A2E', color: 'white', padding: 10}}

                                >
                                <View style={{flexDirection: 'row',justifyContent: 'space-between', marginBottom: 15}}>
                                    <Text style={{fontSize: 16}}>Order Date:</Text>
                                    <Text style={{fontSize: 16}}>{item.createdAtMs && `${new Date(item.createdAtMs).toLocaleDateString()} ${new Date(item.createdAtMs).toLocaleTimeString()}`}</Text>
                                </View>
                                <View style={{flexDirection: 'row',justifyContent: 'space-between', marginBottom: 15}}>
                                    <Text style={{fontSize: 16}}>Store Name:</Text>
                                    <Text style={{fontSize: 16}}>{item.store && item.store.name}</Text>
                                </View>
                                <View style={{flexDirection: 'row',justifyContent: 'space-between', marginBottom: 15}}>
                                    <Text style={{fontSize: 16}}>Number of Items Ordered:</Text>
                                    <Text style={{fontSize: 16}}>{item.cart && item.cart.length}</Text>
                                </View>
                                <View style={{flexDirection: 'row',justifyContent: 'space-between', marginBottom: 15}}>
                                    <Text style={{fontSize: 16}}>Total Payment:</Text>
                                    <Text style={{fontSize: 16}}>&#8369; {item.payment && item.payment.total}</Text>
                                </View>
                            </Card>
                        </TouchableOpacity>
                    );
                    }}
                />
            </View>
        );
    }
}
const mapStateToProps = store => ({
    userId: store.userStore.user && store.userStore.user.id,
    userType: store.userStore.user && store.userStore.user.type,
});
const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
