const hiscoresService = require('../service/hiscores');

module.exports = {
  async getAll(req, res, next) {
    try {
      console.log('hit cont');
      const hiscoresList = await hiscoresService.getAll(req.query);
      res.status(200);
      res.json(hiscoresList);
      console.log(hiscoresList);
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
        res.json(errorMsg);
      } else {
        throw e;
      }
    }
  },
};
