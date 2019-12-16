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
    };
    componentDidMount() {
        if(this.props.userType === 'customer') {  
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
    render() {
        const sampleOrders = [
            {name: 'order 1'},
            {name: 'order 2'},
            {name: 'order 3'},
            {name: 'order 4'},
        ]

        return (
            <View style={{flex: 1}}>
                <Text>src/containers/main.screens/order.history/index.js</Text>
                <FlatList
                    data={ sampleOrders }
                    renderItem={({item}) => (
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('OrderHistoryDetails', item)
                            }}
                        >
                        <Card
                            title='WAITING'
                            titleStyle = {{backgroundColor: '#FF9900', color: 'white', padding: 10}}
                            // title='CANCELLED'
                            // titleStyle = {{backgroundColor: 'tomato', color: 'white', padding: 10}}
                            // title='CONFIRMED'
                            // titleStyle = {{backgroundColor: '#79BEDB', color: 'white', padding: 10}}
                            // title='DELIVERED'
                            // titleStyle = {{backgroundColor: '#266A2E', color: 'white', padding: 10}}

                            >
                            <View style={{flexDirection: 'row',justifyContent: 'space-between', marginBottom: 15}}>
                                <Text style={{fontSize: 16}}>Order Date:</Text>
                                <Text style={{fontSize: 16}}>December 16 2019</Text>
                            </View>
                            <View style={{flexDirection: 'row',justifyContent: 'space-between', marginBottom: 15}}>
                                <Text style={{fontSize: 16}}>Store Name:</Text>
                                <Text style={{fontSize: 16}}>Street Food House</Text>
                            </View>
                            <View style={{flexDirection: 'row',justifyContent: 'space-between', marginBottom: 15}}>
                                <Text style={{fontSize: 16}}>Number of Food Ordered:</Text>
                                <Text style={{fontSize: 16}}>2</Text>
                            </View>
                            <View style={{flexDirection: 'row',justifyContent: 'space-between', marginBottom: 15}}>
                                <Text style={{fontSize: 16}}>Total Payment:</Text>
                                <Text style={{fontSize: 16}}>&#8369; 70</Text>
                            </View>
                        </Card>
                                                       
                         {/* <Text> - {JSON.stringify(item)}</Text> */}
                        </TouchableOpacity>
                    )}
                />
                <Button title="Go To Order Details" onPress={() => {this.props.navigation.navigate('OrderHistoryDetails')}}/>
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
