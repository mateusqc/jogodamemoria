const { getAllSearchFilter } = require('../repository/hiscores');
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

  async getAllSearch(rawQuery) {
    const query = extractQuery(rawQuery);
    const data = await hiscoresRepository.getAllSearchFilter(query);
    return data;
  },

  async getAllSearchFilter(rawQuery, filters) {
    const query = extractQuery(rawQuery);
    const data = await hiscoresRepository.getAllSearchFilter(query, filters);
    return data;
  },

  async create(object) {
    return await hiscoresRepository.create(object);
  },
};
