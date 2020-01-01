import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import FeedbacksService from '../../../services/feedbacks.service';

class Container extends React.Component<> {
    state = {
        feedbacks: [],
        isFetching: false,
    };
    componentDidMount() {
        this.fetchFeedbacks();
    }

    fetchFeedbacks = () => {
        this.setState({isFetching: true});
        FeedbacksService.fetchStoreFeedbacks(this.props.userId)()
            .then(feedbacks => {
                this.setState({feedbacks, isFetching: false});
            })
            .catch(err => alert(err.message));
    }

    render() {
        return (
            <View>
                
                <Button title="Add Product" onPress={() => this.props.navigation.navigate('AddProduct')}/>
                <FlatList
                    data={this.state.feedbacks}
                    refreshing={this.state.isFetching}
                    onRefresh={this.fetchFeedbacks}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            onPress={() => {
                            }}
                        >
                            <Text> - {JSON.stringify(item)}</Text>
                        </TouchableOpacity>
                    )}
                />
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
