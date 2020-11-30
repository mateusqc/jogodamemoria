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

export const getHiscoresSearch = (params) => {
  const paramsString = paramsObjectToText(params);
  return fetch(`${UrlRouter.api}/hiscores/search${paramsString}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getHiscoresSearchFilter = (params, filters = []) => {
  const paramsString = paramsObjectToText(params);
  return fetch(`${UrlRouter.api}/hiscores/search-filter${paramsString}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(filters),
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
