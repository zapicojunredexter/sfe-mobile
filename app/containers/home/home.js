import React from 'react';
import { connect } from 'react-redux';
import {
  SectionList,
  Text,
  Button,
  View,
  // CameraRoll,
} from 'react-native';

type Props = {
};


class Home extends React.Component<Props> {
  render() {
    return (
      <View
      >
        <Text>home</Text>
        <Button title="navigate" onPress={() =>
            {
                console.log("HOOOY");
                this.props.navigation.navigate('Login');
            }} />
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
)(Home);
