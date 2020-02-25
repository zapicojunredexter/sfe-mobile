import { Alert, PermissionsAndroid} from 'react-native';

export const getLocationPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        )
        console.log('granted', granted);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        }
        else {
            alert("Location permission denied")
        }
    }
    catch (err) {
        console.warn(err)
    }
}

export const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {

        navigator.geolocation.getCurrentPosition((position) => {
            const currentLocation = position.coords;
            resolve(currentLocation);
            // this.setState({position: {longitude: position.longitude, latitude: position.latitude}});
        }, reject, {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000
        });
    });
}

// export const checkAndAskPermission = (
//   permission: string,
//   authorizedCallback: Function,
//   alertOptions: Object,
// ) => {
//   Permissions.check(permission).then((response: string) => {
//     switch (response) {
//       case 'undetermined':
//         Permissions.request(permission).then((undeterminedResponse: string) => {
//           if (undeterminedResponse === 'authorized') {
//             authorizedCallback();
//           }
//         });
//         break;
//       case 'authorized':
//         authorizedCallback();
//         break;
//       default:
//         if (response !== 'authorized') {
//           Alert.alert(
//             alertOptions.alertTitle || '',
//             alertOptions.alertMessage || '',
//             [
//               {
//                 text: 'Deny',
//                 onPress: () => {},
//               },
//               { text: 'Open Settings', onPress: Permissions.openSettings },
//             ],
//           );
//         }
//     }
//   });
// };
