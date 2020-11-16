import UrlRouter from '../constants/UrlRouter';
import { paramsObjectToText } from '../utils/utils';

export const getHiscores = (params) => {
  const paramsString = paramsObjectToText(params);
  return fetch(`${UrlRouter.api}/hiscores${paramsString}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const saveHiscore = (obj) => {
  return fetch(`${UrlRouter.api}/hiscores`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });
};
