const { update } = require('../repository/gameModes');
const gameModesService = require('../service/gameModes');

module.exports = {
  async getAll(req, res, next) {
    try {
      const objList = await gameModesService.getAll(req.query);
      res.status(200);
      res.json(objList);
      console.log(objList);
    } catch (e) {
      res.status(500);
    }
  },

  async create(req, res, next) {
    try {
      const savedObject = await gameModesService.create(req.body);
      res.status(200);
      res.json(savedObject);
    } catch (e) {
      if (e.message && e.message.includes('invalid parameter value of')) {
        res.status(400);
        res.json(e.message);
      } else {
        throw e;
      }
    }
  },

  async update(req, res, next) {
    try {
      const savedObject = await gameModesService.update(req.body);
      res.status(200);
      res.json(savedObject);
    } catch (e) {
      if (e.message && e.message.includes('invalid parameter value of')) {
        res.status(400);
        res.json(e.message);
      } else {
        throw e;
      }
    }
  },
};
