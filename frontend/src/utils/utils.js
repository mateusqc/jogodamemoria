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
      paramsString += `${key}=${paramsObject[key]}&`;
    });
    return paramsString.slice(0, -1);
  } else {
    return '';
  }
};

export const gateLabelFromValue = (
  value,
  valueList = [],
  valueAtt = 'value',
  labelAtt = 'label'
) => {
  const filteredList = valueList.filter((item) => item[valueAtt] === value);
  return filteredList.length === 1 ? filteredList.pop()[labelAtt] : '-';
};
