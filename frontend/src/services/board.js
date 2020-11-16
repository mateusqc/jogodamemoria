import UrlRouter from '../constants/UrlRouter';

export const getRandomBoard = (gameModeId = '') =>
  fetch(
    `${UrlRouter.api}/boards/random${
      gameModeId !== null || gameModeId !== undefined
        ? '?gameMode=' + gameModeId
        : ''
    }`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
