import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { HeaderBackButton } from 'react-navigation';
import ProductsService from '../../../services/products.service';


class Container extends React.Component<> {
    static navigationOptions = ({ navigation }) => ({
        headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
    });

    state = {
        store: null,
        products: [],
    }

    listener = null;

    componentDidMount(){
        const store = this.props.navigation.state && this.props.navigation.state.params;
        this.setState({store});
        this.listener = ProductsService.createStoreProductsListener(store.id, (data) => {
            this.setState({products: data});
        });
    }
    render() {
        const { store } = this.state;
        return (
            <View>
                <Text>src/containers/main.screens/stores/StoreDetails.js</Text>
                <Text>{JSON.stringify(store)}</Text>

                <FlatList
                    data={this.state.products}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            onPress={() => {
                                alert(`adding to card ${JSON.stringify(item)}`);
                            }}
                        >
                            <Text> - {JSON.stringify(item)}</Text>
                        </TouchableOpacity>
                    )}
                />
                <Button title="Go to Confirm Order" onPress={() => this.props.navigation.navigate('ConfirmOrder')}/>
            </View>
        );
    }
}
const mapStateToProps = store => ({
});
const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
