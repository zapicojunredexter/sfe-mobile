import React from 'react';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import {
  Text,
  View,
} from 'react-native';
import UserService from '../services/user.service';
import CustomerService from '../services/customers.service';
import NotificationService from "../services/notification.service";
import UserActions from '../reducers/user/user.action';

class InitialRoute extends React.Component<> {
    constructor(props){
        super(props);
        const { navigation, userType, userId } = props;
        if(userId){
            NotificationService.setNotifToken(userId);
            NotificationService.listenNotification();
            // this.listenUserUpdates();
        }
        if(userType === 'store') {
            navigation.navigate('Profile');
        } else {
            navigation.navigate('Stores');
        }

    }

    userListener = null;

    customerListener = null;

    storeListener = null;

    listenUserUpdates = () => {
        if(this.props.userType === 'store') {
            this.storeListener = null;
        } else {
            this.customerListener = CustomerService.createCustomerListener(this.props.userId, (user) => {
                console.log('called', user);
                // this.props.setUser({...this.props.user,...user});
            })
        }
    }

    componentWillUnmount() {
        if(this.userListener) {
            this.userListener();
        }
        if(this.customerListener) {
            this.customerListener();
        }
        if(this.storeListener) {
            this.storeListener();
        }
    }

    render() {
        return (
            <View>
                
            </View>
        );
    }
}
const mapStateToProps = store => ({
    userType: store.userStore.user && store.userStore.user.type,
    userId: store.userStore.user && store.userStore.user.id,
});
const mapDispatchToProps = dispatch => ({
    setUser: (user) => dispatch(UserActions.setUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InitialRoute);
