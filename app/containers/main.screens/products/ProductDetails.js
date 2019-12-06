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
import CartActions from '../../../reducers/cart/cart.action';


class Container extends React.Component<> {
    static navigationOptions = ({ navigation }) => ({
        headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
    });

    state = {
        product: null,
    }

    listener = null;

    componentDidMount(){
        const product = this.props.navigation.state && this.props.navigation.state.params;
        this.setState({product});
    }
    render() {
        const { product } = this.state;
        return (
            <View>
                <Text>src/containers/main.screens/products/ProductDetails.js</Text>
                <Text>{JSON.stringify(product)}</Text>
                <Button title="Edit" onPress={() => {}}/>
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
