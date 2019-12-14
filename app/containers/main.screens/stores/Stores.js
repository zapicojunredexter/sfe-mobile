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
import CartActions from '../../../reducers/cart/cart.action';

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

        const sampleStores = [
            { name: "hello store one"},
            { name: "hello store two"}
        ]

        return (
            <View  style = {{ flex: 1}}>
                <Text>src/containers/main.screens/stores/index.js</Text>
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
                   data = { sampleStores } 
                   renderItem={({item}) => (
                       <TouchableOpacity
                           onPress={() => {
                               this.props.navigation.navigate('StoreDetails', item)
                           }}
                       >
                        <Card>
                            <Image
                                style = {{width: 350 , height: 170}}
                                source={require('./adasda.jpg')}
                            />
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 15
                            }}>
                                <Text style={{marginBottom: 5, fontSize: 20, fontWeight: 'bold'}}>Albertos - San Isidro</Text>
                                <Text>
                                    <Icon name={'star'}  color="tomato" size={15}></Icon>
                                    <Text>4.6 (10)</Text>
                                </Text>
                            </View>
                            <Text style={{fontSize: 14, color: 'tomato', marginBottom: 15}}>&#8369; 70 Delivery Fee</Text>
                        </Card>
                       </TouchableOpacity>
                     )}
                />
                <Button title="Go to Store Details" onPress={() => this.props.navigation.navigate('StoreDetails')}/>
                
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
