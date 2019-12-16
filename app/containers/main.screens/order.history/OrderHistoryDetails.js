import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Card } from 'react-native-elements';
import { HeaderBackButton } from 'react-navigation';


class Container extends React.Component<> {
    static navigationOptions = ({ navigation }) => ({
        headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />,
    })

    renderButtons = () => {
        const canCancel = this.props.userType === 'customer' && true;
        const canAccept = this.props.userType === 'store' && true;
        const canStartDelivery = this.props.userType === 'store' && true;
        const canFinish = this.props.userType === 'store' && true;
        return (
            <React.Fragment>
                {canCancel && <Button
                    title="Cancel Order"
                    onPress={() => {}}
                />}
                {canAccept && <Button
                    title="Accept"
                    onPress={() => {}}
                />}
                {canStartDelivery && <Button
                    title="Start Delivery"
                    onPress={() => {}}
                />}
                {canFinish && <Button
                    title="Finish"
                    onPress={() => {}}
                />}
            </React.Fragment>
        );
    }

    render() {
        const order = this.props.navigation.state && this.props.navigation.state.params;
        return (
            <View style={{flex: 1}}>
                {/* <Text>src/containers/main.screens/order.history/OrderHistoryDetails.js</Text> */}
                <ScrollView>
                    <Card title='WAITING' titleStyle = {{backgroundColor: '#FF9900', color: 'white', padding: 10}}>
                        <View style={{flexDirection: 'row',justifyContent: 'space-between', marginBottom: 15}}>
                            <Text style={{fontSize: 16}}>Order Date:</Text>
                            <Text style={{fontSize: 16}}>December 16 2019</Text>
                        </View>
                        <View style={{flexDirection: 'row',justifyContent: 'space-between', marginBottom: 15}}>
                            <Text style={{fontSize: 16}}>Store Name:</Text>
                            <Text style={{fontSize: 16}}>Street Food House</Text>
                        </View>
                        <View style={{flexDirection: 'row',justifyContent: 'space-between', marginBottom: 15}}>
                            <Text style={{fontSize: 16}}>Order Details:</Text>
                        </View>
                        <View style={{paddingLeft: 10, marginBottom: 15}}>
                            <View style={{flexDirection: 'row',justifyContent: 'space-around', marginBottom: 10}}>
                                <Text style={{fontSize: 14}}>Kwek-Kwek</Text>
                                <Text style={{fontSize: 14}}>6 pieces</Text>
                                <Text style={{fontSize: 14}}>&#8369; 20</Text>
                            </View>
                            <View style={{flexDirection: 'row',justifyContent: 'space-around', marginBottom: 10}}>
                                <Text style={{fontSize: 14}}>Tempura</Text>
                                <Text style={{fontSize: 14}}>6 pieces</Text>
                                <Text style={{fontSize: 14}}>&#8369; 20</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row',justifyContent: 'space-between', marginBottom: 15}}>
                            <Text style={{fontSize: 16}}>SubTotal:</Text>
                            <Text style={{fontSize: 16}}>&#8369; 40</Text>
                        </View>
                        <View style={{flexDirection: 'row',justifyContent: 'space-between', marginBottom: 15}}>
                            <Text style={{fontSize: 16}}>Delivery Fee:</Text>
                            <Text style={{fontSize: 16}}>&#8369; 30</Text>
                        </View>
                        <View
                        style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: 0.5
                        }}
                         />
                        <View style={{flexDirection: 'row',justifyContent: 'space-between', marginTop: 15}}>
                            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'tomato'}}>Total Payment:</Text>
                            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'tomato'}}>&#8369; 70</Text>
                        </View>
                        
                    </Card>
                </ScrollView>
                {/* <Text>{JSON.stringify(order)}</Text> */}
                 {this.renderButtons()}
                
            </View>
        );
    }a
}
const mapStateToProps = store => ({
    userType: store.userStore.user && store.userStore.user.type,
});
const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
