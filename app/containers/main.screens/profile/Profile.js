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

    constructor(props){
        super(props)
        const { user } = props;
        this.state = {
            isEdited: false,
            username: user && user.username || '',
            password: user && user.password || '',
            name: user && user.name || '',
            contactNumber: user && user.contactNumber || '',
            address: user && user.address || '',
        }
    }

    render() {
        const isEdited = this.state.isEdited
        return (
            <View style={{flex: 1}}>
                { isEdited ? (
                <ScrollView>
                   <Card>
                        <TextInput
                            placeholder="username"
                            value={this.state.username}
                            onChangeText={text => this.setState({username: text})}
                            style={{color: 'tomato',marginBottom: 10}}
                        />
                        <TextInput
                            placeholder="password"
                            value={this.state.password}
                            onChangeText={text => this.setState({password: text})}
                            style={{color: 'tomato',marginBottom: 10}}
                        />
                        {/*
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
                        */}
                        
                        <TextInput
                            placeholder="name"
                            value={this.state.name}
                            editable={false}
                            onChangeText={text => this.setState({name: text})}
                            style={{color: 'tomato',marginBottom: 10}}
                        />
                        <TextInput
                            placeholder="contactNumber"
                            value={this.state.contactNumber}
                            onChangeText={text => this.setState({contactNumber: text})}
                            style={{color: 'tomato',marginBottom: 10}}
                        />
                        <TextInput
                            placeholder="address"
                            value={this.state.address}
                            onChangeText={text => this.setState({address: text})}
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
                            <Text style={{marginBottom: 10}}>Login ID:</Text>
                            <Text>
                                <Text>{this.state.username}</Text>
                            </Text>
                        </View>
                        {/*
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
                        */}
                        
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 15
                        }}>
                            <Text style={{marginBottom: 10}}>Name:</Text>
                            <Text>
                                <Text>{this.state.name}</Text>
                            </Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 15
                        }}>
                            <Text style={{marginBottom: 10}}>Contact Number:</Text>
                            <Text>
                                <Text>{this.state.contactNumber}</Text>
                            </Text>
                        </View>
                        <Text style={{marginBottom: 10, marginTop: 15}}>Address:</Text>
                        <Text style={{textAlign: 'right'}}>{this.state.address}</Text>
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
    user: store.userStore.user
});
const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
