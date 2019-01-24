import React from 'react';
import View from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import InitialRoute from './InitialRoute';
import Home from '../containers/home/home';
import Login from '../containers/authentication/login';
import Registration from '../containers/authentication/registration';

const AuthenticationStack = createStackNavigator({
    Login : {
        screen : Login,
    },
    Registration : {
        screen : Registration,
    }
});

const HomeStack = createDrawerNavigator({
    Home: {
        screen: Home,
        navigationOptions: () => ({}),
    },
});

const StackNavigator = createStackNavigator(
  {
    InitialRoute : { screen: InitialRoute },
    Authentication : { screen : AuthenticationStack },
    Home : { screen : HomeStack }
  },
  {
    headerMode: 'none',
    navigationOptions: {
    },
  },
);

export default StackNavigator;
