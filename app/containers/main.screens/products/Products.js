import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import { Card } from 'react-native-elements';
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

    checkStock = (stock) => {
        let stocks;
    
        if( stock == 0 ){
            stocks = 'OUT OF STOCK'
        }
        else if (stock <= 5)
        {
            stocks = 'LOW STOCK'
        }
        else{
            stocks = false
        }
       
    
        return stocks;
    }
    render() {
        return (
            <View style = {{ flex: 1}}>
                <FlatList
                    style = {{ marginBottom: 20}}
                    data={this.state.products}
                    refreshing={this.state.isFetching}
                    onRefresh={this.fetchProducts}
                    renderItem={({item}) => {
                        const statusUC = this.checkStock(item.stockQty);
                        const cardBgColor = {
                            'LOW STOCK': 'tomato',
                            'OUT OF STOCK': 'gray',
                            'false': 'white',
                        };
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('ProductDetails', item)
                            }}
                        >
                             <Card
                                title={statusUC}
                                titleStyle = {{backgroundColor: cardBgColor[statusUC], color: 'white', padding: 10}}
                                // title='Out of Stock'
                                // titleStyle = {{backgroundColor: 'gray', color: 'white', padding: 10}}
                             >
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    marginTop: 15
                                }}>
                                    <Image
                                        style = {{width: 100 , height: 100, borderRadius: 100/2, marginTop: -10}}
                                        source={(item && item.imgUrl) ? {
                                            uri: item.imgUrl,
                                        } : require('../../../assets/images/default-bg.jpg')}
                                    />
                                     {/* <Image
                                    style = {{width: 100 , height: 100, borderRadius: 100/2 }}
                                    source={require('../../../assets/images/kwekwek.jpg')}
                                     /> */}
                                    <View style={{ width: 160 }}>
                                        <Text style={{marginBottom: 2, fontSize: 16, fontWeight: 'bold'}}>{item.name}</Text>
                                        <Text style={{marginBottom: 2, fontSize: 12}}>{item.description}</Text>
                                    <Text style={{marginBottom: 2, fontSize: 14, color: 'tomato'}}>{item.stockQty} {item.serving}</Text>
                                    </View>
                                    
                                </View>
                            </Card>    
                            {/* <Text> - {JSON.stringify(item)}</Text> */}
                        </TouchableOpacity>
                    );
                    }}
                     
                />
                 <View style={{padding: 15}}>
                    <Button 
                        title="Add New Product" 
                        onPress={() => this.props.navigation.navigate('AddProduct')}
                        style = {{ backgroundColor: 'tomato' }}
                    />
                 </View>
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
