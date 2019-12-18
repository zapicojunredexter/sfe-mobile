import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Button,
  FlatList,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert
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
        const { store, tabIndex, products } = this.state;
        const { cartItems, isLoggedIn } = this.props;
        const cartArray = Object.values(cartItems);
        const totalCart = cartArray.reduce((acc, cur) => {
            return acc + cur.price;
        }, 0);

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
                source={require('../../../assets/images/sample.png')}
                style={{
                    height: 170,
                    width: 450,
                   
                    backgroundColor: 'black'
                }}
                >
                <View
                    style={{
                        width: 450,
                        height: 170,
                        backgroundColor: 'rgba(0,0,0,0.60)',
                        position: 'relative', 
                        top: 0,
                        // left: '-2%',
                        right: 0,
                        bottom: 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Text
                        style={{
                        fontWeight: 'bold',
                        color: 'white',
                        position: 'absolute', // child
                        fontSize: 24
                        }}
                    >
                        {store && store.name}
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
                </View>
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
                {tabIndex == 0 && (
                     <FlatList
                     data={ products }
                     extraData={this.props.cartItems}
                     renderItem={({item}) => {
                         const isInCart = !!this.props.cartItems[item.id];
                         return (
                            <TouchableOpacity
                                 onPress={() => {
                                     if(isLoggedIn) {
                                        if(isInCart) {
                                            this.props.removeFromCart(item.id);
                                        } else {
                                            this.props.addCartItem(item);
                                        }
                                     } else {
                                        Alert.alert(
                                            'Not Logged in',
                                            'You need to be logged in to use this service',
                                            [
                                            {text: 'Login', onPress: () => this.props.navigation.navigate('Login')},
                                            {
                                                text: 'Cancel',
                                                onPress: () => console.log('Cancel Pressed'),
                                                style: 'cancel',
                                            },
                                            ],
                                            {cancelable: true},
                                        );
                                     }
                                 }}
                            >
                                <Card
                                    containerStyle={isInCart && {borderColor: 'tomato'}}
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
                                                <Text style={{marginBottom: 2, fontSize: 14, color: 'tomato'}}>&#8369; {item.price}</Text>
                                        </View>
                                    </View>
                                </Card>    
                             </TouchableOpacity>
                         );
                     }}
                 /> 
                )}

                {tabIndex == 1 && (
                   <FlatList
                    data={ [{}] }
                    extraData={this.props.cartItems}
                    renderItem={({item}) => {
                        const isInCart = !!this.props.cartItems[item.id];
                        return (
                            <TouchableOpacity>
                                <Card>
                                    <Text style={{marginBottom: 5, fontSize: 16}}>Name: {store && store.name}</Text>
                                    <Text style={{marginBottom: 5, fontSize: 16}}>Location: {store && store.address}</Text>
                                    <Text style={{fontSize: 16}}>Store Hours: </Text>
                                    <View style={{flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        marginTop: 15,
                                        marginLeft: 20}} >
                                        <Text style={{color: store && store.operatingHours && !store.operatingHours.Monday.closed ? 'tomato' : 'gray'}}>Monday</Text>
                                        <Text style={{color: 'tomato'}}>{store && store.operatingHours && store.operatingHours.Monday ? (store.operatingHours.Monday.closed ? 'Closed':`${store.operatingHours.Monday.from} - ${store.operatingHours.Monday.to}`) : `Closed`}</Text>
                                    </View>
                                    <View style={{flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        marginTop: 15,
                                        marginLeft: 20}} >
                                        <Text style={{color: store && store.operatingHours && !store.operatingHours.Tuesday.closed ? 'tomato' : 'gray'}}>Tuesday</Text>
                                        <Text style={{color: 'tomato'}}>{store && store.operatingHours && store.operatingHours.Tuesday ? (store.operatingHours.Tuesday.closed ? 'Closed':`${store.operatingHours.Tuesday.from} - ${store.operatingHours.Tuesday.to}`) : `Closed`}</Text>
                                    </View>
                                    <View style={{flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        marginTop: 15,
                                        marginLeft: 20}} >
                                        <Text style={{color: store && store.operatingHours && !store.operatingHours.Wednesday.closed ? 'tomato' : 'gray'}}>Wednesday</Text>
                                        <Text style={{color: 'tomato'}}>{store && store.operatingHours && store.operatingHours.Wednesday ? (store.operatingHours.Wednesday.closed ? 'Closed':`${store.operatingHours.Wednesday.from} - ${store.operatingHours.Wednesday.to}`) : `Closed`}</Text>
                                    </View>
                                    <View style={{flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        marginTop: 15,
                                        marginLeft: 20}} >
                                        <Text style={{color: store && store.operatingHours && !store.operatingHours.Thursday.closed ? 'tomato' : 'gray'}}>Thursday</Text>
                                        <Text style={{color: 'tomato'}}>{store && store.operatingHours && store.operatingHours.Thursday ? (store.operatingHours.Thursday.closed ? 'Closed':`${store.operatingHours.Thursday.from} - ${store.operatingHours.Thursday.to}`) : `Closed`}</Text>
                                    </View>
                                    <View style={{flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        marginTop: 15,
                                        marginLeft: 20}} >
                                        <Text style={{color: store && store.operatingHours && !store.operatingHours.Friday.closed ? 'tomato' : 'gray'}}>Friday</Text>
                                        <Text style={{color: 'tomato'}}>{store && store.operatingHours && store.operatingHours.Friday ? (store.operatingHours.Friday.closed ? 'Closed':`${store.operatingHours.Friday.from} - ${store.operatingHours.Friday.to}`) : `Closed`}</Text>
                                    </View>
                                    <View style={{flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        marginTop: 15,
                                        marginLeft: 20}} >
                                        <Text style={{color: store && store.operatingHours && !store.operatingHours.Saturday.closed ? 'tomato' : 'gray'}}>Saturday</Text>
                                        <Text style={{color: 'tomato'}}>{store && store.operatingHours && store.operatingHours.Saturday ? (store.operatingHours.Saturday.closed ? 'Closed':`${store.operatingHours.Saturday.from} - ${store.operatingHours.Saturday.to}`) : `Closed`}</Text>
                                    </View>
                                    <View style={{flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        marginTop: 15,
                                        marginLeft: 20}} >
                                        <Text style={{color: store && store.operatingHours && !store.operatingHours.Sunday.closed ? 'tomato' : 'gray'}}>Sunday</Text>
                                        <Text style={{color: 'tomato'}}>{store && store.operatingHours && store.operatingHours.Sunday ? (store.operatingHours.Sunday.closed ? 'Closed':`${store.operatingHours.Sunday.from} - ${store.operatingHours.Sunday.to}`) : `Closed`}</Text>
                                    </View>
                                    {/*
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
                                        <Text style={{color: store && store.operatingHours && !store.operatingHours.DAY.closed ? 'tomato' : 'gray'}}>Friday</Text>
                                        <Text style={{color: 'tomato'}}>{store && store.operatingHours && store.operatingHours.DAY ? `${store.operatingHours.DAY.from} - ${store.operatingHours.DAY.to}` : `Closed`}</Text>
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
                                    */}
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
                     <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 15,
                            backgroundColor: 'tomato',
                            padding: 10
                        }}
                        onPress={() => {
                            this.props.navigation.navigate('ConfirmOrder', store);
                        }}
                        disabled={cartArray.length === 0}  
                    >
                      <Badge value={<Text style={{color: 'tomato', fontWeight: 'bold'}}>{cartArray.length}</Text>} badgeStyle = {{backgroundColor: 'white', width: 30, height: 30, borderRadius: 30/2 }} />
                        <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>
                          &#8369; {totalCart}
                        </Text>
                      <Icon name= {'angle-right'} color='white' size={25}/>
                    </TouchableOpacity>

                {/* <Text style={{marginTop: 15, padding: 20, backgroundColor: 'tomato'}}>CART ITEMS : {JSON.stringify(this.props.cartItems)}</Text> */}
            </View>
        );
    }
}
const mapStateToProps = store => ({
    cartItems: store.cartStore.cartItems,
    isLoggedIn: !!(store.userStore.user && store.userStore.user.id),
    userId: store.userStore.user && store.userStore.user.id,
    userType: store.userStore.user && store.userStore.user.type,
});
const mapDispatchToProps = dispatch => ({
    addCartItem: item => dispatch(CartActions.addCartItem(item)),
    removeFromCart: itemId => dispatch(CartActions.removeCartItem(itemId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
