import React from 'react';
import { connect } from 'react-redux';
import { createStackNavigator, createDrawerNavigator, SafeAreaView, DrawerItems } from 'react-navigation';
import { View, TouchableOpacity, Text, ScrollView, Image } from 'react-native';

const screens = {
    'vendor' : {
        'Profile' : true,
        'OrderHistory' : true,
        'Stores' : true,
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
        const { items } = this.props;
        const userType = 'vendor';
        const filteredItems = (userType) ? items.filter((item, index) => screens[userType][item.key]) : [];
        
        return (
            <ScrollView>
                <View style={{width:'100%',backgroundColor : '#147DAD',padding:20, alignItems:'center'}}>
                    <View
                        style={{
                            backgroundColor: '#0B5173',
                            height: 80,
                            width: 80,
                            borderRadius:40,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Image
                            style={{width: 70, height: 70}}
                            source={{}}
                        />
                    </View>
                    <Text style={{color: 'white',fontWeight: 'bold', fontSize: 15}}>/navigators/drawer.js</Text>
                </View>
                <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                    <DrawerItems
                        {...this.props}
                        items={filteredItems}
                        activeTintColor="white"
                        inactiveTintColor="white"
                    />
                    <View style={{marginLeft: 5, marginRight: 5, marginTop: 20, marginBottom: 20, borderColor: 'gray', borderTopWidth: 0.5}}/>
                    <TouchableOpacity
                        style={{padding: 10,paddingLeft: 15}}
                        onPress={() => alert('TODO: terms and conditions')}
                    >
                        <Text style={{color: 'white'}}>Terms & Conditions</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{padding: 5,paddingLeft: 15}}
                        onPress={() => {
                                this.props.navigation.navigate('Login');
                            }
                        }
                    >
                        <Text style={{color: 'white'}}>Logout</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </ScrollView>
        );
    }
}


const mapStateToProps = store => ({
});
const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DrawerComponent);