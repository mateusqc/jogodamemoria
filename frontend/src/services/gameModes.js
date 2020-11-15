import UrlRouter from '../constants/UrlRouter';
import { paramsObjectToText } from '../utils/utils';

export const getGameModes = (params) => {
  const paramsString = paramsObjectToText(params);
  return fetch(`${UrlRouter.api}/game-modes${paramsString}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
