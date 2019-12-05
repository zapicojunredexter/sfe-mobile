import React from 'react';

import {
  Text,
  View,
  Button,
  Modal,
  TouchableOpacity
} from 'react-native';
import ModalWrapper from '../../../../components/modal.wrapper/ModalWrapper';

class Container extends React.Component<> {
    render() {
        return (
            <ModalWrapper visible={this.props.visible} close={this.props.close}>
                <View style={{margin: 20, backgroundColor: 'white'}}>
                <Text>src/containers/main.screens/stores/modal/ConfirmOrderModalz.js</Text>
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
