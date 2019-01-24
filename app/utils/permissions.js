import Permissions from 'react-native-permissions';
import { Alert } from 'react-native';

export const checkAndAskPermission = (
  permission: string,
  authorizedCallback: Function,
  alertOptions: Object,
) => {
  Permissions.check(permission).then((response: string) => {
    switch (response) {
      case 'undetermined':
        Permissions.request(permission).then((undeterminedResponse: string) => {
          if (undeterminedResponse === 'authorized') {
            authorizedCallback();
          }
        });
        break;
      case 'authorized':
        authorizedCallback();
        break;
      default:
        if (response !== 'authorized') {
          Alert.alert(
            alertOptions.alertTitle || '',
            alertOptions.alertMessage || '',
            [
              {
                text: 'Deny',
                onPress: () => {},
              },
              { text: 'Open Settings', onPress: Permissions.openSettings },
            ],
          );
        }
    }
  });
};
