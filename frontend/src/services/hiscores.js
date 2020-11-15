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
