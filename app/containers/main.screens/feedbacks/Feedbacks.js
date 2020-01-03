import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Card } from 'react-native-elements';
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

    render() {

        const sampleFeedbacks = [
            { name: "Lalisa Manoban",
              comment: "When the night gets dark let me be your fire.",
              rating: "4.5"
            },
            { name: "Jennie Ruby-Jane Kim",
              comment: "All eyes on me when I step in the room.",
              rating: "4.0"
            }
            ,
            { name: "Rosé Park",
              comment: "Dream big when you can and enjoy it",
              rating: "4.0"
            }
            ,
            { name: "Jisoo Turtle Rabbit Kim",
              comment: "We will only read what we want to read.",
              rating: "4.0"
            }
        ]

        return (
            <View style = {{ flex: 1}}>
              <Text style = {{ fontSize: 22, marginLeft: 15, marginTop: 5, color: 'tomato', fontWeight: 'bold'}}>Feedbacks</Text>
{/*                 
                
                <Button title="Add Product" onPress={() => this.props.navigation.navigate('AddProduct')}/> */}
                <FlatList
                    // data={this.state.feedbacks}
                    style = {{ marginBottom: 20}}
                    data = { sampleFeedbacks } 
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
                                <Text>
                                    <Icon name={'star'}  color="tomato" size={15}></Icon>
                                    <Icon name={'star'}  color="tomato" size={15}></Icon>
                                    <Icon name={'star'}  color="tomato" size={15}></Icon>
                                    <Icon name={'star'}  color="tomato" size={15}></Icon>
                                    <Icon name={'star-half-full'}  color="tomato" size={15}></Icon>
                                </Text>
                                <Text
                                    style={{fontSize: 16, color: 'tomato'}}
                                >
                                    {item.rating}
                                </Text>
                                
                            </View>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 15
                            }}>
                                <Text
                                    style={{fontSize: 20, fontWeight: 'bold'}}
                                >
                                    {item.name}
                                </Text>
                                <Text style = {{fontSize: 16}}>
                                    Jan-04-20
                                </Text>
                            </View>
                            <Text style={{fontSize: 14, color: 'tomato', marginBottom: 15}}>{item.comment}</Text>
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
