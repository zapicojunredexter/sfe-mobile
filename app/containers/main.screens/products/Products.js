import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import ProductsServices from '../../../services/products.service';

class Container extends React.Component<> {
    state = {
        products: [],
        isFetching: false,
    };
    componentDidMount() {
        this.fetchProducts();
    }

    fetchProducts = () => {
        this.setState({isFetching: true});
        this.props.fetchStoreProducts(this.props.userId)
            .then(products => {
                this.setState({products, isFetching: false});
            })
            .catch(err => alert(err.message));
    }

    render() {
        return (
            <View>
                <Text>src/containers/main.screens/products/Products.js</Text>
                <FlatList
                    data={this.state.products}
                    refreshing={this.state.isFetching}
                    onRefresh={this.fetchProducts}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('ProductDetails', item)
                            }}
                        >
                            <Text> - {JSON.stringify(item)}</Text>
                        </TouchableOpacity>
                    )}
                />
                <Button title="Add Product" onPress={() => this.props.navigation.navigate('AddProduct')}/>
            </View>
        );
    }
}
const mapStateToProps = store => ({
    userId: store.userStore.user && store.userStore.user.id,
});
const mapDispatchToProps = dispatch => ({
    fetchStoreProducts: storeId => dispatch(ProductsServices.fetchStoreProducts(storeId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
