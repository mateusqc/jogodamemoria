const boardsService = require('../service/boards');

module.exports = {
  async getRandomBoard(req, res, next) {
    try {
      const board = await boardsService.getRandomBoard(req.query);
      res.status(200);
      res.json(board);
    } catch (e) {
      res.status(500);
    }
  },
};
