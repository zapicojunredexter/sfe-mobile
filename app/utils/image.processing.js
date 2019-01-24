import { ImageEditor, CameraRoll } from 'react-native';

// options object should have offset: { x: 0, y: 0}, size: { height: 0, width: 0}
export const cropImage = async (imageUri: string, options: Object) => {
  const resizedUri = await new Promise((resolve, reject) => {
    ImageEditor.cropImage(
      imageUri,
      {
        offset: {
          /* eslint-disable */
          x: options.offset.xOffset,
          y: options.offset.yOffset,
          /* eslint-enable */
        },
        size: options.size,
      },
      result => resolve(result),
      error => reject(error),
    );
  });

  return resizedUri;
};

export const saveToCameraRoll = async (base64String: string) => {
  const result = await new Promise((resolve, reject) => {
    CameraRoll.saveToCameraRoll(base64String, 'photo')
      .then(uri => resolve(uri))
      .catch(error => reject(error));
  });

  return result;
};
