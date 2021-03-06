import firebase from 'react-native-firebase';

import CustomerService from './customers.service';
import StoreService from './store.service';
import NotificationService from './notification.service';

export const collection = firebase.firestore().collection('users');

export default class Service {

    static add = (params) => async (dispatch, getState) => {
        try {
            await collection.add({
                ...params,
                createdAtMs: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAtMs: firebase.firestore.FieldValue.serverTimestamp(),
                deleted: false,
            });
        } catch (err) {
            throw err;
        }
    }

    static set = (id, params) => async (dispatch, getState) => {
        try {
            await collection.doc(id).set({
                ...params,
                updatedAtMs: firebase.firestore.FieldValue.serverTimestamp()
            });
        } catch (err) {
            throw err;
        }
    }

    static update = (id, params) => async (dispatch, getState) => {
        try {
            await collection.doc(id).update({
                ...params,
                updatedAtMs: firebase.firestore.FieldValue.serverTimestamp()
            });
        } catch (err) {
            throw err;
        }
    }

    static find = async (docId) => {
        const data = await collection.doc(docId).get().then(res => ({id: res.id, ...res.data()}));
        return data;
    }

    static createListener = (callback = () => {}, query) => {
        return collection.onSnapshot((result) => {
            const data = result.docs.map(data => ({id: data.id, ...data.data()}));
            callback(data);
        });
    }

    static login = async (username, password) => {
        try {
            const authUser = await collection
                .where('username', '==', username)
                .get()
                .then(results => {
                    if(results.empty) {
                        throw new Error('User does not exist');
                    }
                    const data = results.docs.map(res => ({id: res.id, ...res.data()}));
                    return data[0];
                });
            if(authUser.password !== password) {
                throw new Error('Wrong password');
            }
            const userObj = authUser.type === 'store' ? await StoreService.find(authUser.id) :await CustomerService.find(authUser.id);
            return {...userObj,...authUser};
            // return user;
        } catch(err) {
            throw err;
        }
    }

    static registerCustomer = async (user, customer) => {
        try {
            const { username } = user;
            if(await Service.getUserByUsername(username)) {
                throw new Error('Username already in use');
            }
    
            const userDoc = collection.doc();
            await userDoc.set({
                ...user,
                createdAtMs: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAtMs: firebase.firestore.FieldValue.serverTimestamp(),
                deleted: false,
            });
            await CustomerService.set(userDoc.id, {
                ...customer,
                createdAtMs: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAtMs: firebase.firestore.FieldValue.serverTimestamp(),
                deleted: false,
            })();
        } catch(err){
            throw err;
        }
    }

    static getUserByUsername = async (username) => {
        try {
            const user = await collection
                .where('username', '==', username)
                .get()
                .then(results => {
                    if(results.empty) {
                        return null;
                    }
                    const data = results.docs.map(res => ({id: res.id, ...res.data()}));
                    return data[0];
                });
            return user;
        } catch(err) {
            throw err;
        }
    }

    static sendNotifToUser = async (userId, notification) => {
        try {
            const user = await Service.find(userId);
            if(user.notifToken){
                const payload = {
                    to: user.notifToken,
                    notification,
                }
                await NotificationService.sendNotification(payload);
            }
        } catch (err){
            alert(err.message);
        }
    }
};