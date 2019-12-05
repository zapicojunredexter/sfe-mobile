import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
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
    chooseFile = () => {
        var options = {
          title: 'Select Image',
          customButtons: [
            { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
          ],
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.showImagePicker(null, response => {
          console.log('Response = ', response);
     
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            let source = response;
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
            this.setState({
              filePath: source,
            });
          }
        });
      };
    render() {
        return (
            <View>
                <Text>src/containers/main.screens/stores/index.js</Text>
                <Button title="Choose File" onPress={this.chooseFile} />
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
