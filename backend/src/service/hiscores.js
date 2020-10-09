const hiscoresRepository = require('../repository/hiscores');

const paramList = ['name', 'points', 'level'];

const extractQuery = (query) => {
  const result = [];
  Object.keys(query).forEach((item) => {
    if ([...paramList, 'order'].indexOf(item) >= 0) {
      result.push({ attribute: item, value: query[item] });
    }
  });
  return result;
};

module.exports = {
  async getAll(rawQuery) {
    const query = extractQuery(rawQuery);
    const data = await hiscoresRepository.getAll(query);
    return data;
  },

  async create(object) {
    return await hiscoresRepository.create(object);
  },
};
