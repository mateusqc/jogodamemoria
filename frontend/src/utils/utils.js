export const getListWithKey = (list = []) =>
  list.map((item, idx) => {
    if (!item.key) {
      item.key = idx;
    }
    return item;
  });

export const validatePair = (first, second, data) => {
  return data[first.y][first.x] === data[second.y][second.x];
};
