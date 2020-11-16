const { param } = require('../routes');

const list = [
  {
    id: 0,
    name: 'Iniciante',
    level: 0,
    x: 4,
    y: 4,
    figures: 8,
    pairsPerFigure: 1,
    timeLimit: 0,
    errorLimit: 0,
    type: 'o',
    userName: null,
  },
  {
    id: 1,
    name: 'Intermediário',
    level: 1,
    x: 6,
    y: 6,
    figures: 18,
    pairsPerFigure: 1,
    timeLimit: 0,
    errorLimit: 8,
    type: 'o',
    userName: null,
  },
  {
    id: 2,
    name: 'Experiente',
    level: 2,
    x: 8,
    y: 8,
    figures: 16,
    pairsPerFigure: 2,
    timeLimit: 0,
    errorLimit: 4,
    type: 'o',
    userName: null,
  },
];

const paramList = [
  'name',
  'level',
  'x',
  'y',
  'figures',
  'pairsPerFigure',
  'timeLimit',
  'errorLimit',
  'type',
  'userName',
];

const validate = (obj) => {
  console.log(obj);
  let error = null;
  if (obj) {
    paramList.forEach((item) => {
      if (obj[item] === null || obj[item] === undefined) {
        error = `invalid parameter value of ${item}`;
      }
    });
  } else {
    error = 'invalid object';
  }

  return error;
};

const applyFilter = (list = [], filter) => {
  return list.filter(
    (item) =>
      item[filter.attribute] != null &&
      item[filter.attribute] != undefined &&
      item[filter.attribute].toString() === filter.value.toString()
  );
};

module.exports = {
  paramList,
  async getAll(query) {
    console.log(query);
    let newlist = [...list];

    query.forEach((item) => {
      if (item.attribute !== 'order') {
        newlist = applyFilter(newlist, item);
      } else {
        newlist = newlist.sort(
          (a, b) => (b.level - a.level) * (item.value === 'asc' ? -1 : 1)
        );
      }
    });

    return newlist;
  },
  async create(obj) {
    const errorMsg = validate(obj);
    if (!errorMsg) {
      const newObj = obj;
      newObj.id = list.length;
      list.push(newObj);
      return newObj;
    } else {
      throw new Error(errorMsg);
    }
  },
};
