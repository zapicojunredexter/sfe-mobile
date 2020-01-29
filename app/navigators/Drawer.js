import React from 'react';
import { connect } from 'react-redux';
import { createStackNavigator, createDrawerNavigator, SafeAreaView, DrawerItems } from 'react-navigation';
import { View, TouchableOpacity, Text, ScrollView, Image } from 'react-native';
import UserAction from '../reducers/user/user.action';

const screens = {
    'store' : {
        'Profile' : true,
        'Products': true,
        'OrderHistory' : true,
        'Feedbacks': true,
    },
    'customer' : {
        'Profile' : true,
        'OrderHistory' : true,
        'Stores' : true,
    },
};

class DrawerComponent extends React.PureComponent<> {
    constructor(props) {
        super(props);
    }

    render() {
        const { items, userType, userId, userName } = this.props;
        const filteredItems = (userType) ? items.filter((item, index) => screens[userType][item.key]) : [];
        const isLoggedIn = userId;
        return (
            <ScrollView>
                <View style={{width:'100%',backgroundColor : '#f7907e',padding:20, alignItems:'center'}}>
                    <View
                        style={{
                            backgroundColor: 'white',
                            height: 70,
                            width: 70,
                            borderRadius:35,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Image
                            style={{width: 70, height: 70}}
                            source={require('../assets/images/sfelogo.png')}
                        />
                        {/* <Text style={{fontSize: 30}}>C</Text> */}
                    </View>
                    <Text style={{color: 'white',fontWeight: 'bold', fontSize: 15}}>
                        {(userName)}</Text>
                </View>
                <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                    <DrawerItems
                        {...this.props}
                        items={filteredItems}
                        activeTintColor="white"
                        inactiveTintColor="white"
                    />
                    <View
                        style={{
                            marginLeft: 5,
                            marginRight: 5,
                            marginTop: 20,
                            marginBottom: 20,
                            borderColor: 'gray',
                            borderTopWidth: isLoggedIn ? 0.5 : 0,
                        }}/>
                    <TouchableOpacity
                        style={{padding: 10,paddingLeft: 15}}
                        onPress={() => alert("'TODO: terms and conditions'")}
                    >
                        <Text style={{color: 'white'}}>Terms & Conditions</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{padding: 5,paddingLeft: 15}}
                        onPress={() => {
                                this.props.logout();
                                this.props.navigation.navigate('Login');
                            }
                        }
                    >
                        <Text style={{color: 'white'}}>
                            {isLoggedIn ? `Logout` : `Login`}
                        </Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </ScrollView>
        );
    }
}


const mapStateToProps = store => ({
    userId: store.userStore.user && store.userStore.user.id,
    userType: store.userStore.user && store.userStore.user.type,
    userName: store.userStore.user && store.userStore.user.name,
});
const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(UserAction.setUser(null)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DrawerComponent);