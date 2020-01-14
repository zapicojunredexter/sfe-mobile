import React from 'react';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import {
  Text,
  View,
} from 'react-native';
import UserService from '../services/user.service';

class InitialRoute extends React.Component<> {
    constructor(props){
        super(props);
        const { navigation, userType, userId } = props;
        this.setNotification();
        this.listenNotification();
        if(userType === 'store') {
            navigation.navigate('Profile');
        } else {
            navigation.navigate('Stores');
        }

    }

    setNotification = () => {
        const { navigation, userType, userId } = this.props;
        if(userId){
            firebase.messaging().getToken().then(notifToken => {
                UserService.update(userId, {notifToken})();
            })
            .catch(err => {});
        }
    }


    listenNotification = async () => {
        try {

            const { navigation, userType, userId } = this.props;
            const hasPermission = await firebase.messaging().hasPermission();
            if(!hasPermission) {
                await firebase.messaging().requestPermission();
            }
            firebase.notifications().onNotification((notification) => {
                console.log('notif',notification);
                if(userId) {
                    const notif = new firebase.notifications.Notification()
                    .setNotificationId(notification._notificationId)
                    .setTitle(notification._title)
                    .setBody(notification._body)
                    .setData(notification._data)
                    .android.setSmallIcon('ic_notification')
                    .android.setLargeIcon('ic_notification')
                    .android.setChannelId('testchannel');
                    if(notification.data.status_code === 'REVIEW_DRIVER' && notification.data.driver) {
                        const driver = JSON.parse(notification.data.driver);
                        this.setState({driver: driver });
                    }
                    firebase.notifications().displayNotification(notif);
                }
            });
    
        } catch (err) {
            alert(err.message);
        }
        //   alert('AHAH');
        // firebase.messaging().createLocalNotification({
        //     body: 'body',
        //     show_in_foreground: true,
        //     title: 'title',
        //     local_notification: true,
        //     priority: 'high'
        // }).catch(err => alert(err.message));
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
