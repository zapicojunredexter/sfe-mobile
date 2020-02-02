import React from 'react';

import {
  Text,
  View,
  Button,
  Modal,
  TouchableOpacity,
  TextInput
} from 'react-native';
import ModalWrapper from '../../../../components/modal.wrapper/ModalWrapper';

class Container extends React.Component<> {
    state = {
        driverName: '',
    }
    render() {
        return (
            <ModalWrapper visible={this.props.visible} close={this.props.close}>
                <View style={{margin: 20, padding: 20,backgroundColor: 'white'}}>
                    <Text>Driver Name: </Text>
                    <TextInput
                        onChangeText={driverName => this.setState({ driverName })}
                    />
                    <Button title="SUBMIT" onPress={() => {
                        const newFields = {
                            driverName: this.state.driverName,
                        }
                        this.props.submit(newFields);
                    }} />
                    <Button title="CLOSE" onPress={this.props.close} />
                </View>
            </ModalWrapper>
        );
        return (
            <View style={{marginTop: 22}}>
                <Modal
                animationType="slide"
                transparent={false}
                visible={this.props.visible}
                onRequestClose={this.props.close}>
                    <Text>src/containers/main.screens/stores/modal/ConfirmOrderModalz.js</Text>
                    <Button title="CLOSE" onPress={this.props.close} />
                </Modal>
            </View>);
        return (
            <View>
                <Text>src/containers/main.screens/stores/modal/ConfirmOrderModal.js</Text>
            </View>
        );
    }
}

export default (Container);
