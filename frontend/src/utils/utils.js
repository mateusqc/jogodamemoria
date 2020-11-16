export const getListWithKey = (list = []) =>
  list.map((item, idx) => {
    if (!item.key) {
      item.key = idx;
    }
    return item;
  });

export const paramsObjectToText = (paramsObject = {}) => {
  let paramsString = '?';
  const keysList = Object.keys(paramsObject);
  if (keysList.length > 0) {
    keysList.forEach((key) => {
      paramsString += `${key}=${paramsObject[key]}`;
    });
    return paramsString;
  } else {
    return '';
  }
};

export const gateLabelFromValue = (value, valueList = []) => {
  const filteredList = valueList.filter((item) => item.value === value);
  return filteredList.length === 1 ? filteredList.pop()['label'] : '-';
};
