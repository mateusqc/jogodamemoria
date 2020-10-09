const list = [
  { id: 0, name: 'Fulano da Silva', points: 34567, level: 0 },
  { id: 1, name: 'Mateus Queiroz Cunha', points: 45651, level: 0 },
  { id: 2, name: 'Adamastor Pitaco', points: 54231, level: 1 },
];

const paramList = ['name', 'points', 'level'];

const validateHiscore = (obj) => {
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
  async getAll(query) {
    let newlist = [...list];
    console.log(newlist);

    query.forEach((item) => {
      console.log(item);
      if (item.attribute !== 'order') {
        newlist = applyFilter(newlist, item);
      } else {
        newlist = newlist.sort(
          (a, b) => (b.points - a.points) * (item.value === 'asc' ? -1 : 1)
        );
      }
    });

    return newlist;
  },

  async create(hiscore) {
    const errorMsg = validateHiscore(hiscore);
    if (!errorMsg) {
      const newHiscore = hiscore;
      newHiscore.id = list.length;
      list.push(newHiscore);
      return newHiscore;
    } else {
      throw new Error(errorMsg);
    }
  },
};