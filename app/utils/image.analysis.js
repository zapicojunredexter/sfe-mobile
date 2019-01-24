import {
  MEMO_PAD_RATIO,
  EXPECTED_DOUBLE_RATIO,
  ACCEPTED_RATIO_THRESHOLD,
  TAG_LIST,
  STANDARD_DEVIATION_LIST,
} from '../assets/constants';
import { standardDeviation } from './computations';

export const checkValidJibunMemo = (width: number, height: number) => {
  let validity = { isFullMemo: false, isValid: false };
  const imageRatio = width / height;

  if (
    imageRatio <= MEMO_PAD_RATIO + ACCEPTED_RATIO_THRESHOLD &&
    imageRatio >= MEMO_PAD_RATIO - ACCEPTED_RATIO_THRESHOLD
  ) {
    validity = { ...validity, isValid: true };
  }
  // check if picture includes entire notebook
  if (!validity.isValid) {
    if (
      imageRatio <= EXPECTED_DOUBLE_RATIO + ACCEPTED_RATIO_THRESHOLD &&
      imageRatio >= EXPECTED_DOUBLE_RATIO - ACCEPTED_RATIO_THRESHOLD
    ) {
      validity = { isFullMemo: true, isValid: true };
    }
  }

  return validity;
};

export const getShadedTags = (
  greyScaleArray: Array<number>,
  height: number,
  width: number,
) => {
  const tagsHeight = width * (height / 16);
  let filters = {};

  for (let index = 1; index < 15; index += 1) {
    const arraySubset = greyScaleArray.slice(
      Math.floor(index * tagsHeight),
      Math.floor((index + 1) * tagsHeight),
    );

    // console.log(standardDeviation(arraySubset));
    if (
      Math.abs(
        STANDARD_DEVIATION_LIST[index - 1] - standardDeviation(arraySubset),
      ) < 20
    ) {
      filters = {
        ...filters,
        [TAG_LIST[index - 1]]: false,
      };
    } else {
      filters = {
        ...filters,
        [TAG_LIST[index - 1]]: true,
      };
    }
  }

  return filters;
};
