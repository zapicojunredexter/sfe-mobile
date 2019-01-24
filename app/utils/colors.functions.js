export const getGrayScale = (color: number) => {
  /* eslint no-bitwise: ["error", { "allow": ["&"] }] */
  const hexString = `#${`000000${(color & 0xffffff).toString(16)}`.slice(-6)}`;
  const blue = parseInt(hexString.slice(1, 3), 16);
  const green = parseInt(hexString.slice(3, 5), 16);
  const red = parseInt(hexString.slice(5, 7), 16);
  const gray = (blue + green + red) / 3;

  return gray;
};
