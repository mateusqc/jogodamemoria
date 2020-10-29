const paramsObjectToText = (paramsObject = {}) => {
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

export default {
  getHiscores: (params) => {
    const paramsString = paramsObjectToText(params);
    return fetch(`http://localhost:8000/hiscores${paramsString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};
