const { getRandomBoard } = require('../repository/boards');
const boardsRepository = require('../repository/boards');

module.exports = {
  async getRandomBoard() {
    return await boardsRepository.getRandomBoard();
  },
};
