// @flow
import React from 'react';

import { AppState, BackHandler } from 'react-native';

type Props = {
  navigation: {
    navigate: Function,
  },
};

type State = {
  appState: Object,
};
class Listeners extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
    };

    AppState.addEventListener('change', this.handleAppStateChange);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleBackButton = () => { alert('OKS');return true};

  handleAppStateChange = (nextAppState: { match: Function }) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      // it is called when the app become active
    } else if (
      this.state.appState === 'active' &&
      nextAppState.match(/inactive|background/)
    ) {
      // it is called when the app become inactive or background
      this.props.navigation.navigate('Home');
    }
    this.setState({ appState: nextAppState });
  };

  render() {
    return null;
  }
}

export default Listeners;
