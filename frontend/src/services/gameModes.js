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

export const saveGameMode = (obj) => {
  return fetch(`${UrlRouter.api}/game-modes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });
};

export const updateGameMode = (obj) => {
  return fetch(`${UrlRouter.api}/game-modes`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });
};
