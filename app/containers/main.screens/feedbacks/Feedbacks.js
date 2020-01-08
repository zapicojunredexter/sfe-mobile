import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Card, Rating } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
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

    showRating = (rate) => {
        let rates = [];
    
        for(let i=1; i<=rate; i+=1) {
            rates.push(
                <Text> <Icon name={'star'}  color="tomato" size={15}></Icon> </Text>
            );
        }
    
        return rates;
    }
    render() {

        return (
            <View style = {{ flex: 1}}>
              <Text style = {{ fontSize: 22, marginLeft: 15, marginTop: 10, color: 'tomato', fontWeight: 'bold'}}>Feedbacks</Text>

                <FlatList
                    data={this.state.feedbacks}
                    style = {{ marginBottom: 20}}
                    refreshing={this.state.isFetching}
                    onRefresh={this.fetchFeedbacks}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            onPress={() => {
                            }}
                        >
                            {/* <Text> - {JSON.stringify(item)}</Text> */}
                            <Card>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 15
                            }}>
                                   
                                <Text> {this.showRating(item.rating)}</Text>
                                
                                <Text
                                    style={{fontSize: 16, color: 'tomato'}}
                                >
                                    {item.createdAtMs && `${new Date(item.createdAtMs).toLocaleDateString()} ${new Date(item.createdAtMs).toLocaleTimeString()}`}
                                </Text>
                                
                            </View>
        
                                <Text style={{marginTop: 15, fontSize: 20, fontWeight: 'bold'}}>{item.reviewer.name} </Text>
                                <Text style={{fontSize: 14, color: 'tomato', marginBottom: 15, marginTop: 10}}>{item.review}</Text>
                        </Card>
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
