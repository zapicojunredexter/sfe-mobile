import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import StoreService from '../../../services/store.service';

class Container extends React.Component<> {
    state = {
        stores: [],
    };
    componentDidMount() {
        this.props.fetchStores()
            .then(stores => {
                this.setState({stores});
            })
            .catch(err => alert(err.message));
    }
    render() {
        return (
            <View>
                <Text>src/containers/main.screens/stores/index.js</Text>
                
                <FlatList
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
