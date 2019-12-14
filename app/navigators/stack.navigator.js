import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import InitialRoute from './InitialRoute';
import Profile from '../containers/main.screens/profile/Profile';
import OrderHistory from '../containers/main.screens/order.history/OrderHistory';
import OrderHistoryDetails from '../containers/main.screens/order.history/OrderHistoryDetails';
import Stores from '../containers/main.screens/stores/Stores';
import Products from '../containers/main.screens/products/Products';
import ProductDetails from '../containers/main.screens/products/ProductDetails';
import AddProduct from '../containers/main.screens/products/AddProduct';
import Feedbacks from '../containers/main.screens/feedbacks/Feedbacks';
import StoreDetails from '../containers/main.screens/stores/StoreDetails';
import ConfirmOrder  from '../containers/main.screens/stores/ConfirmOrder';
import Login from '../containers/authentication.screens/login/Login';
import Registration from '../containers/authentication.screens/registration/Registration';
import Drawer from './Drawer';
const AuthenticationStack = createStackNavigator({
    Login : {
        screen : Login,
    },
    Registration : {
        screen : Registration,
    }
});


const createStackWithNotifIcon = (screens) =>
    createStackNavigator(screens,
        {
            navigationOptions : (({ navigation, screenProps }) => ({
                headerLeft : (
                    <TouchableOpacity onPress={navigation.toggleDrawer}>
                        <Text>src/navigators/stack.navigator.js</Text>
                    </TouchableOpacity>
                    
                ),
                headerStyle: {
                    // backgroundColor: '#0B5173',
                },
                // headerTintColor: '#fff',
            })),
        }
    );

const MainStack = createDrawerNavigator({
    Stores: {
        screen: createStackWithNotifIcon({
            Stores,
            StoreDetails,
            ConfirmOrder,
        }),
        navigationOptions: {
            drawerLabel: 'Stores',
            // drawerIcon: () => (
            //     <Entypo name="home" size={20} color="#fff" />
            // ),
        },
    },
    Profile: {
        screen: createStackWithNotifIcon({Profile}),
        navigationOptions: {
            drawerLabel: 'ProFile',
            // drawerIcon: () => (
            //     <Entypo name="home" size={20} color="#fff" />
            // ),
        },
    },
    Feedbacks: {
        screen: createStackWithNotifIcon({Feedbacks}),
        navigationOptions: {
            drawerLabel: 'Feedbacks',
            // drawerIcon: () => (
            //     <Entypo name="home" size={20} color="#fff" />
            // ),
        },
    },
    Products: {
        screen: createStackWithNotifIcon({Products, ProductDetails, AddProduct}),
        navigationOptions: {
            drawerLabel: 'Products',
            // drawerIcon: () => (
            //     <Entypo name="home" size={20} color="#fff" />
            // ),
        },
    },
    OrderHistory: {
        screen: createStackWithNotifIcon({OrderHistory, OrderHistoryDetails}),
        navigationOptions: {
            drawerLabel: 'OrderHistory',
            // drawerIcon: () => (
            //     <Entypo name="home" size={20} color="#fff" />
            // ),
        },
    },
}, {
    contentComponent : Drawer,
    drawerBackgroundColor : '#0B5173',
});

const StackNavigator = createStackNavigator(
  {
    InitialRoute : { screen: InitialRoute },
    Authentication : { screen : AuthenticationStack },
    Home : { screen : MainStack }
  },
  {
    headerMode: 'none',
    navigationOptions: {
    },
  },
);

export default StackNavigator;
