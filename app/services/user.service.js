import firebase from 'react-native-firebase';

export const collection = firebase.firestore().collection('users');

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

    static createListener = (callback = () => {}, query) => {
        return collection.onSnapshot((result) => {
            const data = result.docs.map(data => ({id: data.id, ...data.data()}));
            callback(data);
        });
    }

    static login = async (username, password) => {
        try {
            const user = await collection
                .where('username', '==', username)
                .get()
                .then(results => {
                    if(results.empty) {
                        throw new Error('User does not exist');
                    }
                    const data = results.docs.map(res => ({id: res.id, ...res.data()}));
                    return data[0];
                });
            if(user.password !== password) {
                throw new Error('Wrong password');
            }
            return user;
        } catch(err) {
            throw err;
        }
    }
};