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
import { SearchBar, Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import StoreService from '../../../services/store.service';
import ProductService from '../../../services/products.service';
import CartActions from '../../../reducers/cart/cart.action';
import StripeService from '../../../services/stripe.service';

class Container extends React.Component<> {
    state = {
        stores: [],
        search: ''
    };

    componentDidMount() {
        this.props.fetchStores()
            .then(stores => {
                this.setState({stores});
            })
            .catch(err => alert(err.message));
    }

    renderCard = item => {
        <Card image={item} />
      }
      
 
    
      updateSearch = search => {
        this.setState({ search });
      };
    
    render() {
        const { search } = this.state;

        return (
            <View  style = {{ flex: 1}}>
                <SearchBar style={{backgroundColor: 'transparent'}}
                    lightTheme
                    searchIcon = {<Icon name={'search'} size={20} color="#eaeaea" />}
                    clearIcon = {<Icon name={'close'} size={20} color="#eaeaea" />}
                    placeholder="Store Name"
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
                   data = { this.state.stores } 
                   renderItem={({item}) => (
                       <TouchableOpacity
                           onPress={() => {
                               this.props.navigation.navigate('StoreDetails', item)
                           }}
                       >
                        <Card>
                            <Image
                                style = {{width: 350 , height: 170, backgroundColor: 'black'}}
                                source={(item && item.displayPicUrl) ? {
                                    uri: item.displayPicUrl,
                                } : require('../../../assets/images/default-bg.jpg')}
                            />
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 15
                            }}>
                                <Text
                                    style={{marginBottom: 5, fontSize: 20, fontWeight: 'bold'}}
                                >
                                    {item.name}
                                </Text>
                                <Text>
                                    <Icon name={'star'}  color="tomato" size={15}></Icon>
                                    <Text>{((item.score && item.score.total || 0) / (item.score && item.score.count || 0)).toFixed(1)} ({item.score && item.score.count || 0})</Text>
                                </Text>
                            </View>
                            <Text style={{fontSize: 14, color: 'tomato', marginBottom: 15}}>&#8369; {item.deliveryFee || 0} Delivery Fee</Text>
                        </Card>
                       </TouchableOpacity>
                     )}
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
