import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { HeaderBackButton } from 'react-navigation';
import ProductsServices from '../../../services/products.service';


class Container extends React.Component<> {
    static navigationOptions = ({ navigation }) => ({
        headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
    });

    addFile = () => {
        ImagePicker.showImagePicker(null, response => {
            console.log('Response = ', response);
        
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let source = response;
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({
                    filePath: source,
                });
            }
        });
    };

    submitProduct = () => {
        const payload = {
            name: `sample product ${new Date().getTime()}`,
            store: {
                id: this.props.userId,
            },
        };
        this.props.addStoreProduct(payload)
            .then(() => {
                alert('successfully added product');
                this.props.navigation.goBack(null);
            })
            .catch(err => alert(err.message));
    }

    render() {
        return (
            <View>
                <Text>src/containers/main.screens/products/AddProduct.js</Text>
                <Button title="ADD IMAGE" onPress={this.addFile}/>
                <Button
                    title="SUBMIT"
                    onPress={this.submitProduct}
                />
            </View>
        );
    }
}
const mapStateToProps = store => ({
    userId: store.userStore.user && store.userStore.user.id,
});
const mapDispatchToProps = dispatch => ({
    addStoreProduct: product => dispatch(ProductsServices.add(product)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
