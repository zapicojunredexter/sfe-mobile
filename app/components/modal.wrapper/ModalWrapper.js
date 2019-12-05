import React, {Component} from 'react';
import {Modal, TouchableOpacity, StyleSheet, View, Alert} from 'react-native';

const _styles = StyleSheet.create({
    modalBackgroundStyle : {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

export default class ModalExample extends Component {
    render() {
        const { styles, children, visible, close } = this.props;
        
        return (
                <Modal
                    {...this.props}
                    animationType='fade'
                    transparent={true}
                    visible={visible}
                    onRequestClose={close}
                >
                    <TouchableOpacity onPress={ev => { close(); }} style={{ flex : 1 }}>
                        <View style={[_styles.modalBackgroundStyle, { flex: 1 }]}>
                            {children}
                        </View>
                    </TouchableOpacity>
                </Modal>
        );
    }
}