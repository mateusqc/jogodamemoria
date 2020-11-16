const { update } = require('../repository/gameModes');
const gameModesRepository = require('../repository/gameModes');

const extractQuery = (query) => {
  const result = [];
  Object.keys(query).forEach((item) => {
    if ([...gameModesRepository.paramList, 'order'].indexOf(item) >= 0) {
      result.push({ attribute: item, value: query[item] });
    }
  });
  return result;
};

module.exports = {
  async getAll(rawQuery) {
    const query = extractQuery(rawQuery);
    const data = await gameModesRepository.getAll(query);
    return data;
  },

  async create(object) {
    return await gameModesRepository.create(object);
  },

  async update(object) {
    return await gameModesRepository.update(object);
  },
};
