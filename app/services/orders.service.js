import firebase from 'react-native-firebase';

export const collection = firebase.firestore().collection('orders');

export default class {

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

    static get = () => async (dispatch, getState) => {
        try {
            const result = await collection.get();
            const data = result.docs.map(doc => ({id: doc.id, ...doc.data()}));

            return data;
        } catch (err) {
            throw err;
        }
    }


    static createListener = (callback = () => {}, query) => {
        return collection.onSnapshot((result) => {
            const data = result.docs.map(data => ({id: data.id, ...data.data()}));
            callback(data);
        });
    }

    static createCustomerListener = (customerId, callback = () => {}, query) => {
        return collection
            .orderBy("createdAtMs", "desc")
            .where('customer.id','==',customerId)
            .onSnapshot((result) => {
                const data = result.docs.map(data => ({id: data.id, ...data.data()}));
                callback(data);
            });
    }
    
    static createStoreListener = (storeId, callback = () => {}, query) => {
        return collection
            .orderBy("createdAtMs", "desc")
            .where('store.id','==',storeId)
            .onSnapshot((result) => {
                const data = result.docs.map(data => ({id: data.id, ...data.data()}));
                callback(data);
            });
    }

    static getStoreOrders = (storeId) => {
        return collection
            .orderBy("createdAtMs", "desc")
            .where('store.id','==',storeId)
            .get();
    }

    static getCustomerOrders = async customerId => {
        try {
            const result = await collection
                .orderBy("createdAtMs", "desc")
                .where('customer.id','==',customerId)
                .get();

            const data = result.docs.map(doc => ({id: doc.id, ...doc.data()}));

            return data;
        } catch (err) {
            throw err;
        }
    }
};