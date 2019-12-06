import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Button,
  Alert,
} from 'react-native';
import { HeaderBackButton } from 'react-navigation';
import ConfirmOrderModal from './modals/ConfirmOrderModal';


class Container extends React.Component<> {
    static navigationOptions = ({ navigation }) => ({
        headerLeft: <HeaderBackButton onPress={() => navigation.pop(2)} />,
    })
    render() {
        return (
            <View style={{flex: 1}}>
                <Text>src/containers/main.screens/stores/ConfirmOrder.js</Text>
                <Button
                    title="Confirm Order"
                    onPress={() => {
                        Alert.alert(
                            'Select Type',
                            'Select payment type',
                            [
                              {text: 'COD', onPress: () => console.log('Ask me later pressed')},
                              {text: 'Credit Card', onPress: () => console.log('OK Pressed')},
                              {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                              },
                            ],
                            {cancelable: true},
                          );
                    }}
                />
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
)(Container);
