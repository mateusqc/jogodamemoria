const { generateBoard } = require('../utils/board');
const gameModesRepository = require('../repository/gameModes');

module.exports = {
  async getRandomBoard(query) {
    console.log(query);
    const gameModeId = query['gameMode'];
    let gameMode = null;
    if (gameModeId) {
      gameMode = await gameModesRepository.getAll([
        { attribute: 'id', value: gameModeId },
      ]);
    }
    const randomBoard = generateBoard(gameMode.length > 0 ? gameMode[0] : null);
    return randomBoard;
  },
};
