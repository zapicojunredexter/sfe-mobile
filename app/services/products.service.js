import firebase from 'react-native-firebase';

export const collection = firebase.firestore().collection('products');

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

    static fetchStoreProducts = (storeId) => async (dispatch, getState) => {
        try {
            const result = await collection.where('store.id','==',storeId).get();
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

    static createStoreProductsListener = (storeId, callback = () => {}, query) => {
        return collection.where('store.id','==',storeId).onSnapshot((result) => {
            const data = result.docs.map(data => ({id: data.id, ...data.data()}));
            callback(data);
        });
    }

    static hasEnoughStock = async (productId, amount) => {
        const product = await Service.find(productId);
        const currentStock = product.stockQty || 0;

        if(currentStock <= amount) {
            return false;
        }
        return true;
    }

    static updateProductStockByCart = async (cart) => {
        const hasEnoughOfAll = await Promise.all(cart.map(async(crt) => {
            const isEnough = await Service.hasEnoughStock(crt.id, crt.qty);
            
            return isEnough ? false : crt;
        }));
        console.log('ara sila o', hasEnoughOfAll);

        const hasInsufficient = hasEnoughOfAll.find(heoa => !!heoa);
        if(hasInsufficient){
            throw new Error(`Low in stock for ${hasInsufficient.name}`);   
        }
        await Promise.all(cart.map(async(crt) => {
            await Service.updateProductInventory(crt.id, crt.qty);
        }));
        return true;
    }

    static updateProductInventory =  async (productId, amount) => {
        const product = await Service.find(productId);
        const currentStock = product.stockQty || 0;
        // if(currentStock <= amount) {
        //     throw new Error('Low in stock');
        // }
        // if(!await Service.hasEnoughStock(productId, amount)) {
        //     throw new Error('Low in stock');
        // }




        const newStockQty = Number(Number(currentStock) - Number(amount));
        await Service.update(productId, { stockQty: newStockQty })();
        return true;
    }
};