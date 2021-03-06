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
        stores: [],
        search: ''
    };
    

    componentDidMount() {
        this.props.fetchStores()
            .then(stores => {
                getCurrentLocation().then(currentLocation => {
                    const withDistance = stores.map(store => {
                        const distance = computeDistance(
                            currentLocation.latitude,
                            currentLocation.longitude,
                            store.location && store.location.latitude,
                            store.location && store.location.longitude,
                        )
                        return {
                            ...store,
                            distance: store.location ? distance : -1
                        };
                    });

                    const toShow = withDistance.filter(dist => dist.distance > -1);
                    toShow.sort((a, b) => a.distance - b.distance);

                    this.setState({stores: toShow});
                })
                .catch(err => alert(err.message));
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
        const storesToDisplay = this.state.stores.filter(store => {
            const lowerName = store.name && store.name.toLowerCase() || '';
            const lowerSearch = search && search.toLowerCase() || '';
            return lowerName.includes(lowerSearch);
        });

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
                   data = {storesToDisplay} 
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
                                    <Text>{item.score ? ((item.score && item.score.total || 0) / (item.score && item.score.count || 0)).toFixed(1) : 0} ({item.score && item.score.count || 0})</Text>
                                </Text>
                            </View>
                            <Text style={{fontSize: 14, color: 'tomato', marginBottom: 4}}>&#8369; {item.deliveryFee || 0} Delivery Fee</Text>
                            <Text style={{fontSize: 14, marginBottom: 15}}>
                            <Icon name={'street-view'}  color="tomato" size={15}></Icon>
                            {`${(Number(item.distance).toFixed(4))}km `} from your location    
                            </Text>
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
