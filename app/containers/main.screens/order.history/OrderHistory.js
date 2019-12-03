import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity
} from 'react-native';
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
        return (
            <View>
                <Text>src/containers/main.screens/order.history/index.js</Text>
                <FlatList
                    data={this.state.orders}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('OrderHistoryDetails', item)
                            }}
                        >
                            <Text> - {JSON.stringify(item)}</Text>
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
