export const generateFlippedMatrix = (data = [[]]) => {
  const yLen = data.length;
  const xLen = data[0].length;
  const result = Array.from({ length: yLen }, () =>
    Array.from({ length: xLen }, () => false)
  );

  return result;
};

export const validatePair = (first, second, data) => {
  return data[first.y][first.x] === data[second.y][second.x];
};
