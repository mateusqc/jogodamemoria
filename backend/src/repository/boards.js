const { generateBoard } = require('../utils/board');

const initBoardMatrix = [
  [0, 2, 3, 5],
  [3, 1, 4, 5],
  [1, 4, 2, 6],
  [0, 6, 7, 7],
];

module.exports = {
  async getRandomBoard() {
    // return initBoardMatrix;
    const randomBoard = generateBoard();
    return randomBoard;
  },
};
