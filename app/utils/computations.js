export const standardDeviation = (values: Array<number>) => {
  const avg = average(values);
  const squareDiffs = values.map((value: number) => {
    const diff = value - avg;
    const sqrDiff = diff * diff;

    return sqrDiff;
  });
  const avgSquareDiff = average(squareDiffs);
  const stdDev = Math.sqrt(avgSquareDiff);

  return stdDev;
};

export const average = (data: Array<number>) => {
  const sum = data.reduce((iterator, value) => iterator + value, 0);

  const avg = sum / data.length;

  return avg;
};
