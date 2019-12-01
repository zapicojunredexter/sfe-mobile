import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
} from 'react-native';

class InitialRoute extends React.Component<> {
    constructor(props){
        super(props);
        const { navigation, userType } = props;
        if(userType === 'store') {
            navigation.navigate('Profile');
        } else {
            navigation.navigate('Stores');
        }
    }
    render() {
        return (
            <View>
                <Text>INITIAL ROUTE</Text>
            </View>
        );
    }
}
const mapStateToProps = store => ({
    userType: store.userStore.user && store.userStore.user.type,
});
const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InitialRoute);
