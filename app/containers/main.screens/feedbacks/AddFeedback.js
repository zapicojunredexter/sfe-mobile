import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Button,
  TextInput,
} from 'react-native';
import { Rating, AirbnbRating } from 'react-native-elements';
import StoreService from '../../../services/store.service';
import FeedbacksService from '../../../services/feedbacks.service';

class Container extends React.Component<> {
    constructor(props) {
        super(props);
        const order = props.navigation.state && props.navigation.state.params;
        this.state = {
            review: '',
            order,
            rating: 3,
        }
    }

    submitReview = async () => {
        try {
            const { order } = this.state;
            await StoreService.updateStoreScore(order.store.id, this.state.rating);
            const payload = {
                review: this.state.review,
                rating: this.state.rating,
                reviewee: {
                    id: order.store.id,
                    name: order.store.name,
                },
                reviewer: {
                    id: this.props.userId,
                    name: this.props.userName,
                },
            };
            FeedbacksService.add(payload)()
                .then(() => {
                    alert('successfully added');
                    this.props.navigation.goBack();
                })
                .catch(err => alert(err.message))
        }catch(err){
            alert(err.message);
        }
        
    }

    render() {
        const { order } = this.state;
        if(!order)
            return null;
        const { store } = order;

        return (
            <View>
                <Text>src/containers/main.screens/feedbacks/AddFeedback.js</Text>
                <Text>Review for {store.name}</Text>
                <Rating
                    startingValue={3}
                    onFinishRating={(rating) => this.setState({rating})}
                    style={{ paddingVertical: 10, backgroundColor: 'orange' }}
                />

                <TextInput
                    value={this.state.review}
                    onChangeText={text => this.setState({review: text})}
                />
                <Text>{JSON.stringify(order)}</Text>
                <Button title="Click" onPress={this.submitReview}/>
            </View>
        );
    }
}
const mapStateToProps = store => ({
    userId: store.userStore.user && store.userStore.user.id,
    userType: store.userStore.user && store.userStore.user.type,
    userName: store.userStore.user && store.userStore.user.name,
});
const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
