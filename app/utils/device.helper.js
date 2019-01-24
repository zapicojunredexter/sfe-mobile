import { Platform, Dimensions } from 'react-native';

const IPHONE_XR = {
  width: 375,
  height: 812,
  scale: 2,
};

const IPHONE_X_SERIES = {
  width: 375,
  height: 812,
};

// iPhone XR
export const isSpecialIphone = () => {
  const { width, height, scale } = Dimensions.get('window');

  return (
    Platform.OS === 'ios' &&
    (width === IPHONE_XR.width &&
      height === IPHONE_XR.height &&
      scale === IPHONE_XR.scale)
  );
};

export const isIphoneXSeries = () => {
  const { width, height } = Dimensions.get('window');

  return (
    Platform.OS === 'ios' &&
    (width === IPHONE_X_SERIES.width && height === IPHONE_X_SERIES.height)
  );
};
