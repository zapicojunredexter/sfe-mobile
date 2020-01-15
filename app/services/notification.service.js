// import React from 'react';
import firebase from 'react-native-firebase';
import {
    Alert
} from 'react-native';
import constants from '../constants/constants';
import UserService from './user.service';

export default class NotifcationService {
    static sendNotification = (body) => {
        /*
            {
                "to": "eDVkRJDXEoA:APA91bFDVCoew1_3tK8LfVEr3P5ZUFmW2ZHyrVi0x7gqSp741ZEx-WIWiNWxHptXHw5J5iJWhIPqwCmpGjHNm5hrCFn4QSAkn9WVKhIb-E7SYxQtU8TxyQH4PNmO0ZbKtK_7xjIWYfp1",
                "notification": {
                    "title": "Balance Update",
                    "body": "hehehe working23"
                }
            }
        */
        return fetch(`https://fcm.googleapis.com/fcm/send`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer AIzaSyBscbh2C2t-qN95GXx3Q7bjAGMeV17KeI0'
            },
        })
    }

    static setNotifToken = async (userId) => {
        try {
            const notifToken = await firebase.messaging().getToken();
            await UserService.update(userId, {notifToken})();
        } catch (err) {
            alert(err.message);
        }
    }

    static listenNotification = async () => {
        try {

            const hasPermission = await firebase.messaging().hasPermission();
            if(!hasPermission) {
                await firebase.messaging().requestPermission();
            }
            firebase.notifications().onNotification((notification) => {
                // const notif = new firebase.notifications.Notification()
                // .setNotificationId(notification._notificationId)
                // .setTitle(notification._title)
                // .setBody(notification._body)
                // .setData(notification._data)
                // .android.setSmallIcon('ic_notification')
                // .android.setLargeIcon('ic_notification')
                // .android.setChannelId('testchannel');
                
                Alert.alert(notification._title, notification._body);
            });
    
        } catch (err) {
            alert(err.message);
        }
    }
}