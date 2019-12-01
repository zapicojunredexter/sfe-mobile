import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import InitialRoute from './InitialRoute';
import Profile from '../containers/main.screens/profile/Profile';
import OrderHistory from '../containers/main.screens/order.history/OrderHistory';
import OrderHistoryDetails from '../containers/main.screens/order.history/OrderHistoryDetails';
import Stores from '../containers/main.screens/stores/Stores';
import Login from '../containers/authentication.screens/login/Login';
import Registration from '../containers/authentication.screens/registration/Registration';
import Drawer from './drawer';
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
                        <Text>TOGGLE</Text>
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
        screen: createStackWithNotifIcon({Stores}),
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
