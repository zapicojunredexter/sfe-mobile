import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Button,
  FlatList,
  ImageBackground,
  Image,
  TouchableOpacity 
} from 'react-native';
import { Card, Badge } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { HeaderBackButton } from 'react-navigation';
import ProductsService from '../../../services/products.service';
import CartActions from '../../../reducers/cart/cart.action';


class Container extends React.Component<> {
    static navigationOptions = ({ navigation }) => ({
        headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
    });

    state = {
        store: null,
        products: [],
        tabIndex: 0
    }

    listener = null;

    componentDidMount(){
        const store = this.props.navigation.state && this.props.navigation.state.params;
        if(store){
            this.setState({store});
            this.listener = ProductsService.createStoreProductsListener(store.id, (data) => {
                this.setState({products: data});
            });
        }
    }
    render() {
        const { store, tabIndex } = this.state;
        const  sampleProducts = [
            {
                name: "product 1"
            },
            {
                name: "product 2"
            },
            {
                name: "product 3"
            },
            {
                name: "product 4"
            }
        ]
        const sampleStoreDetails = [
            {
                name: 'Store 1',
                location: 'Location sa Store',
                hours: 'Monday: 10am - 10pm'
            }
        ]

        const sampleReviews = [
            {
                name: 'Review 1',
               
            },
            {
                name: 'Review 2',
               
            },
            {
                name: 'Review 3',
               
            },
            {
                name: 'Review 4',
               
            }
        ]

        return (
            <View style={{flex: 1}}>
                <ImageBackground
                source={require('./adasda.jpg')}
                style={{
                    height: 170,
                    width: 450,
                    position: 'relative', // because it's parent
                    top: 0, left: '-2%', right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'
                }}
                >
                <Text
                    style={{
                    fontWeight: 'bold',
                    color: 'white',
                    position: 'absolute', // child
                    fontSize: 24
                    }}
                >
                    Albertos - San Isidro
                </Text>
                <Text
                    style={{
                    fontWeight: 'bold',
                    color: 'white',
                    position: 'absolute', // child
                    fontSize: 18,
                    top: '60%'
                    }}
                >
                   <Icon name={'star'}  color="tomato" size={20}></Icon>
                   <Text style={{color: 'tomato'}}>4.6 (10)</Text>
                </Text>
                </ImageBackground>
                <View style={{flexDirection: 'row',justifyContent: 'space-around', backgroundColor: 'tomato'}}>
                <TouchableOpacity  onPress={() => {
                    this.setState({tabIndex: 0})
                }} 
                    style={tabIndex == 0 ? {borderBottomColor: 'white', borderBottomWidth: 2,  flex: 1, justifyContent: 'center', alignItems: 'center', padding: 15} : {justifyContent: 'center', alignItems: 'center', padding: 15, flex: 1}}
                >
                    <Text style={{color: 'white'}}>
                    Menu
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={() => {
                    this.setState({tabIndex: 1})
                }}
                   style={tabIndex == 1 ? {borderBottomColor: 'white', borderBottomWidth: 2,  flex: 1, justifyContent: 'center', alignItems: 'center', padding: 15} : {justifyContent: 'center', alignItems: 'center', padding: 15, flex: 1} }
                >
                    <Text style={{color: 'white'}}>
                    Store Details
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={() => {
                    this.setState({tabIndex: 2})
                }}
                  style={tabIndex == 2 ? {borderBottomColor: 'white', borderBottomWidth: 2, flex: 1, justifyContent: 'center', alignItems: 'center', padding: 15} : {justifyContent: 'center', alignItems: 'center', padding: 15, flex: 1}}
                >
                    <Text style={{color: 'white'}}>
                    Reviews
                    </Text>
                </TouchableOpacity>
                </View>
{/* 
                <Text>src/containers/main.screens/stores/StoreDetails.js</Text>
                <Text style={{marginTop: 15}}>STORE DETAILS: {JSON.stringify(store)}</Text>
                <Text style={{marginTop: 15}}>PRODUCTS: </Text> */}
                {tabIndex == 0 && (
                     <FlatList
                     data={ sampleProducts }
                     extraData={this.props.cartItems}
                     renderItem={({item}) => {
                         const isInCart = !!this.props.cartItems[item.id];
                         return (
                             <TouchableOpacity
                                 // onPress={() => {
                                 //     if(isInCart) {
                                 //         this.props.removeFromCart(item.id);
                                 //     } else {
                                 //         this.props.addCartItem(item);
                                 //     }
                                 // }}
                             >
                              <Card>
                                
                                 <View style={{
                                     flex: 1,
                                     flexDirection: 'row',
                                     justifyContent: 'space-around',
                                     marginTop: 15
                                 }}>
                                      <Image
                                     style = {{width: 100 , height: 100, borderRadius: 100/2 }}
                                     source={require('./b.jpg')}
                                      />
                                     <View>
                                         <Text style={{marginBottom: 2, fontSize: 16, fontWeight: 'bold'}}>Taho</Text>
                                         <Text style={{marginBottom: 2, fontSize: 12}}>Lorem Ipsum Lorem Ipsum</Text>
                                         <Text style={{marginBottom: 2, fontSize: 14, color: 'tomato'}}>&#8369; 10</Text>
                                     </View>
                                     
                                 </View>
                             </Card>    
                                 {/* <Text> - {JSON.stringify(item)}</Text> */}
                             </TouchableOpacity>
                         );
                     }}
                 /> 
                )}

                {tabIndex == 1 && (
                   <FlatList
                    data={ sampleStoreDetails }
                    extraData={this.props.cartItems}
                    renderItem={({item}) => {
                        const isInCart = !!this.props.cartItems[item.id];
                        return (
                            <TouchableOpacity >
                                <Card>
                                <Text style={{marginBottom: 5, fontSize: 16}}>Name: Albertos</Text>
                                <Text style={{marginBottom: 5, fontSize: 16}}>Location: San Isidro Talisay City Cebu</Text>
                                <Text style={{fontSize: 16}}>Store Hours: </Text>
                                <View style={{flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginTop: 15,
                                    marginLeft: 20,}} >
                                    <Text style={{color: 'tomato'}}>Monday</Text>
                                    <Text style={{color: 'tomato'}}>10am - 10pm</Text>
                                </View>
                                <View style={{flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginTop: 15,
                                    marginLeft: 20}} >
                                    <Text style={{color: 'tomato'}}>Tueday</Text>
                                    <Text style={{color: 'tomato'}}>10am - 10pm</Text>
                                </View>
                                <View style={{flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginTop: 15,
                                    marginLeft: 20}} >
                                    <Text style={{color: 'tomato'}}>Wednesday</Text>
                                    <Text style={{color: 'tomato'}}>10am - 10pm</Text>
                                </View>
                                <View style={{flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginTop: 15,
                                    marginLeft: 20}} >
                                    <Text style={{color: 'tomato'}}>Thursday</Text>
                                    <Text style={{color: 'tomato'}}>10am - 10pm</Text>
                                </View>
                                <View style={{flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginTop: 15,
                                    marginLeft: 20}} >
                                    <Text style={{color: 'tomato'}}>Friday</Text>
                                    <Text style={{color: 'tomato'}}>10am - 10pm</Text>
                                </View>
                                <View style={{flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginTop: 15,
                                    marginLeft: 20}} >
                                    <Text style={{color: 'gray'}}>Saturday</Text>
                                    <Text style={{color: 'gray'}}>Closed</Text>
                                </View>
                                <View style={{flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginTop: 15,
                                    marginLeft: 20}} >
                                    <Text style={{color: 'gray'}}>Sunday</Text>
                                    <Text style={{color: 'gray'}}>Closed</Text>
                                </View>
                            </Card>    
                                
                            </TouchableOpacity>
                        );
                    }}
                   />     
                )}

                {tabIndex == 2 && (
                      <FlatList
                        data={ sampleReviews }
                        extraData={this.props.cartItems}
                        renderItem={({item}) => {
                            const isInCart = !!this.props.cartItems[item.id];
                            return (
                                <TouchableOpacity style={{marginBottom: 15}} >
                                 <Card>
                                   <Text style={{marginBottom: 5, fontSize: 16}}> Name: Juan Luna </Text>
                                   <Text style={{marginBottom: 5}}>
                                     <Icon name={'star'}  color="tomato" size={15}/>
                                     <Icon name={'star'}  color="tomato" size={15}/>
                                     <Icon name={'star'}  color="tomato" size={15}/>
                                   </Text>
                                   <Text style={{marginBottom: 5, fontSize: 14}}>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
                                    consectetur, adipisci velit</Text>
                                  
                                </Card>    
                             </TouchableOpacity>
                            );
                        }}
                    />    
                )}
                     <TouchableOpacity style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                        backgroundColor: 'tomato',
                        padding: 10
                     }}
                       onPress={() => {
                        this.props.navigation.navigate('ConfirmOrder', store);
                    }}  
                    >
                      <Badge value={<Text style={{color: 'tomato', fontWeight: 'bold'}}>2</Text>} badgeStyle = {{backgroundColor: 'white', width: 30, height: 30, borderRadius: 30/2 }} />
                      <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>&#8369; 200</Text>
                      <Icon name= {'angle-right'} color='white' size={25}/>
                    </TouchableOpacity>

                {/* <Text style={{marginTop: 15, padding: 20, backgroundColor: 'tomato'}}>CART ITEMS : {JSON.stringify(this.props.cartItems)}</Text> */}
            </View>
        );
    }
}
const mapStateToProps = store => ({
    cartItems: store.cartStore.cartItems
});
const mapDispatchToProps = dispatch => ({
    addCartItem: item => dispatch(CartActions.addCartItem(item)),
    removeFromCart: itemId => dispatch(CartActions.removeCartItem(itemId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
