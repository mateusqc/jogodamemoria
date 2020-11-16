const { getRandomBoard } = require('../repository/boards');
const boardsRepository = require('../repository/boards');

module.exports = {
  async getRandomBoard(query) {
    return await boardsRepository.getRandomBoard(query);
  },
};
