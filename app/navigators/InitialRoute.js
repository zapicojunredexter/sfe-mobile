import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
} from 'react-native';

class InitialRoute extends React.Component<> {
    constructor(props){
        super(props);
        const { navigation } = props;
        navigation.navigate('Stores');
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
});
const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InitialRoute);
