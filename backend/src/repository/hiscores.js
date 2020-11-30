const list = [
  { id: 0, name: 'Fulano da Silva', points: 1800, level: 0 },
  { id: 1, name: 'Mateus Queiroz Cunha', points: 2000, level: 0 },
  { id: 2, name: 'Adamastor Pitaco', points: 4000, level: 1 },
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

const applySearch = (list = [], searches = []) => {
  return list.filter((item) => {
    let result = false;
    searches.forEach((search) => {
      result =
        result ||
        (item[search.attribute] != null &&
          item[search.attribute] != undefined &&
          item[search.attribute]
            .toString()
            .toLowerCase()
            .includes(search.value.toString().toLowerCase()));
    });
    return result;
  });
};

const applyAdvancedFilter = (list = [], filters = []) => {
  return list.filter((item) => {
    let result = false;
    filters.forEach((filter) => {
      result =
        result ||
        (item[filter.attribute] != null &&
          item[filter.attribute] != undefined &&
          item[filter.attribute].toString() === filter.value.toString());
    });
    return result;
  });
};

module.exports = {
  async getAll(query) {
    let newlist = [...list];

    query.forEach((item) => {
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

  async getAllSearchFilter(query = [], filters = []) {
    console.log(filters);
    let newlist = [...list];
    const remainingQueries = [];

    query.forEach((item) => {
      if (item.attribute !== 'order') {
        remainingQueries.push(item);
      } else {
        newlist = newlist.sort(
          (a, b) => (b.points - a.points) * (item.value === 'asc' ? -1 : 1)
        );
      }
    });

    console.log(newlist);

    if (filters.length > 0) {
      newlist = applyAdvancedFilter(newlist, filters);
    }
    if (remainingQueries.length > 0) {
      newlist = applySearch(newlist, remainingQueries);
    }

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
