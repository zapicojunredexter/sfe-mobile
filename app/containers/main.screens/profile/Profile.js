import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Button,
  ScrollView,
  TextInput
} from 'react-native';
import { Card } from 'react-native-elements';

class Container extends React.Component<> {
    static navigationOptions = {
        headerTitle : '',
    };

    state = {
        isEdited: false
    }
    render() {
        
        const isEdited = this.state.isEdited
        return (
            <View style={{flex: 1}}>
                { isEdited ? (
                <ScrollView>
                   <Card>
                        <TextInput
                            value="juanluna@gmail.com"
                            placeholder="Email Address"
                            style={{color: 'tomato',marginBottom: 10}}
                        />
                        <TextInput
                            placeholder="Password"
                            style={{color: 'tomato',marginBottom: 10}}
                        />
                        <TextInput
                            placeholder="New Password"
                            style={{color: 'tomato',marginBottom: 10}}
                        />
                        <TextInput
                            placeholder="Confirm New Password"
                            style={{color: 'tomato',marginBottom: 10}}
                        />
                        <TextInput
                            value="Juan"
                            placeholder="First Name"
                            style={{color: 'tomato',marginBottom: 10}}
                        />
                        <TextInput
                            value="Luna"
                            placeholder="Last Name"
                            style={{color: 'tomato',marginBottom: 10}}
                        />
                        <TextInput
                            value="09123123321"
                            placeholder="Contact Number"
                            style={{color: 'tomato',marginBottom: 10}}
                        />
                        <TextInput
                            value="123 IDK street, Labangon, Cebu City"
                            placeholder="Delivery Address"
                            style={{color: 'tomato',marginBottom: 10}}
                        />

                     <Text onPress={() => {this.setState({isEdited: false})}} style={{marginTop: 50, color: 'tomato', textAlign: 'right', marginBottom: 20}}>Save Changes</Text>
                    </Card>
                </ScrollView>   
                ) : (
                <ScrollView>
                     <Card>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 15
                        }}>
                            <Text style={{marginBottom: 10}}>Email Address:</Text>
                            <Text>
                                <Text>juanluna@gmail.com</Text>
                            </Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 15
                        }}>
                            <Text style={{marginBottom: 10}}>First Name:</Text>
                            <Text>
                                <Text>Juan</Text>
                            </Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 15
                        }}>
                            <Text style={{marginBottom: 10}}>Last Name:</Text>
                            <Text>
                                <Text>Luna</Text>
                            </Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 15
                        }}>
                            <Text style={{marginBottom: 10}}>Contact Number:</Text>
                            <Text>
                                <Text>09123123321</Text>
                            </Text>
                        </View>
                        <Text style={{marginBottom: 10, marginTop: 15}}>Address:</Text>
                        <Text style={{textAlign: 'right'}}>123 IDK street, Labangon, Cebu City</Text>
                        <Text onPress={() => {this.setState({isEdited: true})}} style={{marginTop: 50, color: 'tomato', textAlign: 'right', marginBottom: 20}}>Edit Profile</Text>
                    </Card>
                       
                </ScrollView>
                    
                
                )}
               
                {/* <Button title="Click" onPress={() => {}}/> */}
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
