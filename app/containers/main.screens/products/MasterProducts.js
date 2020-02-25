import React from 'react';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import {
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import { SearchBar, Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import StoreService from '../../../services/store.service';
import ProductService from '../../../services/products.service';
import CartActions from '../../../reducers/cart/cart.action';
import StripeService from '../../../services/stripe.service';
import { computeDistance } from '../../../utils/computations';
import { getLocationPermission, getCurrentLocation } from '../../../utils/permissions';

class Container extends React.Component<> {
    state = {
        products: [],
        search: ''
    };
    

    componentDidMount() {
        ProductService.get()()
            .then(items => {
                console.log('items ay', items);
                this.setState({products: items})
            })
    }

    renderCard = item => {
        <Card image={item} />
      }
      
 
    
      updateSearch = search => {
        this.setState({ search });
      };
    
    render() {
        const { products, search } = this.state;
        const productsToDisplay = products.filter(product => {
            const lowerName = product.name && product.name.toLowerCase() || '';
            const lowerSearch = search && search.toLowerCase() || '';
            return lowerName.includes(lowerSearch);
        });

        return (
            <View  style = {{ flex: 1}}>
                <SearchBar style={{backgroundColor: 'transparent'}}
                    lightTheme
                    searchIcon = {<Icon name={'search'} size={20} color="#eaeaea" />}
                    clearIcon = {<Icon name={'close'} size={20} color="#eaeaea" />}
                    placeholder="Product Name"
                    onChangeText={this.updateSearch}
                    value={search}
                />
                {/* <FlatList
                    data={this.state.stores}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('StoreDetails', item)
                            }}
                        >
                            <Text> - {JSON.stringify(item)}</Text>
                        </TouchableOpacity>
                    )}
                /> */}
                 <FlatList
                    data = {productsToDisplay} 
                     renderItem={({item}) => {
                        return (
                           <TouchableOpacity
                                onPress={() => {
                                    StoreService.find(item.store.id).then((store) => {
                                        this.props.navigation.navigate('StoreDetails', store)
                                    });
                                }}
                           >
                               <Card
                               >
                                   <View style={{
                                       flex: 1,
                                       flexDirection: 'row',
                                       justifyContent: 'space-around',
                                       marginTop: 15,
                                   }}>
                                       <Image
                                           style = {{width: 100 , height: 100, borderRadius: 100/2 }}
                                           source={require('../../../assets/images/kwekwek.jpg')}
                                           source={{
                                               uri: item.imgUrl,
                                           }}
                                       />
                                       <View>
                                               <Text style={{marginBottom: 2, fontSize: 16, fontWeight: 'bold'}}>{item.name}</Text>
                                               <Text style={{marginBottom: 2, fontSize: 12}}>{item.description}</Text>
                                               <Text style={{marginBottom: 2, fontSize: 14}}>{item.store && item.store.name}</Text>
                                               <Text style={{marginBottom: 8, fontSize: 14, color: 'tomato'}}>&#8369; {item.price}</Text>
                                               <Text style={{marginBottom: 2, fontSize: 12, fontWeight: 'bold'}}>Serving size: {item.serving}</Text>
                                       </View>
                                   </View>
                               </Card>    
                            </TouchableOpacity>
                        );
                    }}
                />
                {/* <Button title="Go to Store Details" onPress={() => this.props.navigation.navigate('StoreDetails')}/> */}
                
            </View>
        );
    }
}
const mapStateToProps = store => ({
});
const mapDispatchToProps = dispatch => ({
    fetchStores: () => dispatch(StoreService.get()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
