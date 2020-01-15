import React from 'react';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import {
  Text,
  View,
} from 'react-native';
import UserService from '../services/user.service';
import NotificationService from "../services/notification.service";

class InitialRoute extends React.Component<> {
    constructor(props){
        super(props);
        const { navigation, userType, userId } = props;
        if(userId){
            NotificationService.setNotifToken(userId);
            NotificationService.listenNotification();
        }
        if(userType === 'store') {
            navigation.navigate('Profile');
        } else {
            navigation.navigate('Stores');
        }

    }

    render() {
        return (
            <View>
                <Text>INITIAL ROUTE</Text>
            </View>
        );
    }
}
const mapStateToProps = store => ({
    userType: store.userStore.user && store.userStore.user.type,
    userId: store.userStore.user && store.userStore.user.id,
});
const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InitialRoute);
