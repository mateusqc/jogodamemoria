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

export const getDiffTimesString = (time1 = new Date(), time2 = new Date()) => {
  const diff = time2.getTime() - time1.getTime();
  console.log(diff);
  const one_minute = 1000 * 60;
  const minutes = Math.floor(diff / one_minute);
  const seconds = Math.floor((diff - minutes * one_minute) / 1000);
  return `${minutes.toString().length > 1 ? minutes : '0' + minutes}:${
    seconds.toString().length > 1 ? seconds : '0' + seconds
  }`;
};
