import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView
} from 'react-native';
import { Card } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import { HeaderBackButton } from 'react-navigation';
import ProductsServices from '../../../services/products.service';
import StorageService from '../../../services/storage.service';


class Container extends React.Component<> {
    static navigationOptions = ({ navigation }) => ({
        headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
    });

    constructor(props) {
        super(props);
        const product = this.props.navigation.state && this.props.navigation.state.params;
        this.state = {
            imgUrl: product && product.imgUrl || '',
            name: product && product.name ||  '',
            description: product && product.description ||  '',
            stockQty: product && Number(product.stockQty).toString() ||  1,
            price: product && Number(product.price).toString() ||  0,
            serving: product && product.serving ||  '',
        };
    }

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
                const { uri } = response;
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                StorageService.uploadFile([uri])()
                    .then((res) => {
                        this.setState({
                            imgUrl: res[0],
                        });
                    })
                    .catch(err => alert(err.message));
            }
        });
    };

    submitProduct = () => {
        const product = this.props.navigation.state && this.props.navigation.state.params;
        const payload = {
            name: this.state.name,
            description: this.state.description,
            stockQty: Number(this.state.stockQty),
            price: Number(this.state.price),
            serving: this.state.serving,
            imgUrl: this.state.imgUrl,
            store: {
                name: this.props.storeName,
                id: this.props.userId,
            },
        };
        if(product){
            ProductsServices.update(product.id, payload)()
                .then(() => {
                    alert('successfully updated product');
                    this.props.navigation.goBack(null);
                })
                .catch(err => alert(err.message));
        }
    }

    render() {
        return (
            <View>
                {/* <Text>src/containers/main.screens/products/AddProduct.js</Text> */}
                <ScrollView>
                    <Card  style={{ justifyContent: 'center', alignItems: 'center', top: '2%', marginBottom: 10}}>
                        <TextInput
                        value={this.state.name}
                        onChangeText={text => this.setState({name: text})}
                        placeholder={"Name"}
                        style={{color: 'tomato',marginBottom: 10, fontWeight: 'bold'}}
                        />
                        <TouchableOpacity
                            style={{alignItems:'center'}}
                            onPress={this.addFile}
                        >
                            <Image
                                source={this.state.imgUrl ? {
                                    uri: this.state.imgUrl
                                } : require('../../../assets/images/no-image.png')}
                                style={{height: 150, width:150}}
                                onPress={this.addFile}
                            />
                        </TouchableOpacity>
                        <TextInput
                            value={this.state.description}
                            onChangeText={text => this.setState({description: text})}
                            placeholder={"Description"}
                            style={{color: 'tomato',marginBottom: 10, fontWeight: 'bold'}}
                        />
                        <TextInput
                            value={this.state.stockQty}
                            onChangeText={text => this.setState({stockQty: text})}
                            placeholder={"Stock Quantity"}
                            // keyboardType="numeric"
                            style={{color: 'tomato',marginBottom: 10, fontWeight: 'bold'}}
                        />
                        <TextInput
                            value={this.state.price}
                            onChangeText={text => this.setState({price: text})}
                            placeholder={"Price"} 
                            // keyboardType="numeric"
                            style={{color: 'tomato',marginBottom: 10, fontWeight: 'bold'}}

                        />
                        <TextInput
                            value={this.state.serving}
                            onChangeText={text => this.setState({serving: text})}
                            placeholder={"Serving"}
                            style={{color: 'tomato',marginBottom: 10, fontWeight: 'bold'}}
                        />
                        
                        <Button
                            title="Update Product"
                            onPress={this.submitProduct}
                        />
                    </Card>
                </ScrollView>
               
            </View>
        );
    }
}
const mapStateToProps = store => ({
    userId: store.userStore.user && store.userStore.user.id,
    storeName: store.userStore.user && store.userStore.user.name,
});
const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
