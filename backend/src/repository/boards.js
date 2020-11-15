const { generateBoard } = require('../utils/board');

module.exports = {
  async getRandomBoard() {
    const randomBoard = generateBoard();
    return randomBoard;
  },
};
