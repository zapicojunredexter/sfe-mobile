import firebase from 'react-native-firebase';

export const collection = firebase.firestore().collection('stores');

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

    static updateStoreScore = async (storeId, score) => {
        try {
            const data = await collection.doc(storeId).get().then(res => ({id: res.id, ...res.data()}));
            const currentTotal = data.score && data.score.total || 0;
            const currentCount = data.score && data.score.count || 0;
            await collection.doc(storeId).update({
                    score: {
                        total: Number(currentTotal) + Number(score),
                        count: Number(currentCount) + 1
                    },
                });
            return data;
        } catch (err) {
            throw err;
        }
    }
};