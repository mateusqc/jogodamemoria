const hiscoresService = require('../service/hiscores');

module.exports = {
  async getAll(req, res, next) {
    try {
      const objList = await hiscoresService.getAll(req.query);
      res.status(200);
      res.json(objList);
      console.log(objList);
    } catch (e) {
      res.status(500);
    }
  },

  async getAllSearch(req, res, next) {
    try {
      const objList = await hiscoresService.getAllSearch(req.query);
      res.status(200);
      res.json(objList);
      console.log(objList);
    } catch (e) {
      res.status(500);
    }
  },

  async getAllSearchFilter(req, res, next) {
    try {
      const objList = await hiscoresService.getAllSearchFilter(
        req.query,
        req.body
      );
      res.status(200);
      res.json(objList);
      console.log(objList);
    } catch (e) {
      res.status(500);
    }
  },

  async create(req, res, next) {
    try {
      const savedObject = await hiscoresService.create(req.body);
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
