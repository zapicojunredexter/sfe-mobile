import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Button,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Card } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import UserService from '../../../services/user.service';
import StoreService from '../../../services/store.service';
import StorageService from '../../../services/storage.service';
import CustomerService from '../../../services/customers.service';
import UserActions from '../../../reducers/user/user.action';

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
            dpUrl: user && user.dpUrl || '',
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
                        {this.props.user && this.props.user.type && this.props.user.type === 'customer' && (
                            <TouchableOpacity
                                style={{alignItems:'center'}}
                                onPress={() => {
                                    ImagePicker.showImagePicker(null, response => {
                                        console.log('Response = ', response);
                                    
                                        if (response.didCancel) {
                                            console.log('User cancelled image picker');
                                        } else if (response.error) {
                                            console.log('ImagePicker Error: ', response.error);
                                        } else if (response.customButton) {
                                            console.log('User tapped custom button: ', response.customButton);
                                        } else {
                                            let source = response;
                                            const { uri } = response;
                                            // You can also display the image using data:
                                            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                                            StorageService.uploadFile([uri])()
                                                .then((res) => {
                                                    this.setState({
                                                        dpUrl: res[0],
                                                    });
                                                })
                                                .catch(err => alert(err.message));
                                        }
                                    });
                                }}
                            >
                                <Image
                                    source={this.state.dpUrl ? {
                                        uri: this.state.dpUrl
                                    } : require('../../../assets/images/no-image.png')}
                                    style={{height: 150, width:150}}
                                />
                            </TouchableOpacity>
                        )}
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

                     <Text
                        onPress={async () => {
                            try {

                                const userId = this.props.user && this.props.user.id;
                                const userType = this.props.user && this.props.user.type;
                                const user = {
                                    username: this.state.username,
                                    password: this.state.password,
                                };
                                await UserService.update(userId, user)();
                                const details = {
                                    // name: this.state.name,
                                    contactNumber: this.state.contactNumber,
                                    address: this.state.address,
                                };
                                if(userType === 'customer') {
                                    const customerDetails = {
                                        ...details,
                                        dpUrl: this.state.dpUrl,
                                    };
                                    await CustomerService.update(userId, customerDetails)();
                                    this.props.setUser({...this.props.user, ...customerDetails});
                                }
                                if(userType === 'store') {
                                    await StoreService.update(userId, details)();
                                    this.props.setUser({...this.props.user, ...details});
                                }
                                alert('successfully updated user');
                                this.setState({isEdited: false});
                            } catch (err) {
                                alert(err.message)
                            }
                        }} style={{marginTop: 50, color: 'tomato', textAlign: 'right', marginBottom: 20}}>Save Changes</Text>
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
    setUser: (user) => dispatch(UserActions.setUser(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
