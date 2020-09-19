var express = require('express');
var router = express.Router();

const hiscoresList = [
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

const extractQuery = (query) => {
  const result = [];
  Object.keys(query).forEach((item) => {
    if ([...paramList, 'order'].indexOf(item) >= 0) {
      result.push({ attribute: item, value: query[item] });
    }
  });
  return result;
};

const applyFilter = (list = [], filter) => {
  return list.filter(
    (item) =>
      item[filter.attribute] != null &&
      item[filter.attribute] != undefined &&
      item[filter.attribute].toString() === filter.value.toString()
  );
};

router.get('/', function (req, res, next) {
  const query = extractQuery(req.query);
  let newHiscoresList = hiscoresList;

  query.forEach((item) => {
    if (item.attribute !== 'order') {
      newHiscoresList = applyFilter(newHiscoresList, item);
    } else {
      newHiscoresList = newHiscoresList.sort(
        (a, b) => (b.points - a.points) * (item.value === 'asc' ? -1 : 1)
      );
    }
  });
  res.json(newHiscoresList);
});

router.post('/', (req, res, next) => {
  const errorMsg = validateHiscore(req.body);
  if (!errorMsg) {
    const newHiscore = req.body;
    newHiscore.id = hiscoresList.length;
    hiscoresList.push(newHiscore);
    res.status(201);
    res.json(newHiscore);
  } else {
    res.status(400);
    res.json(errorMsg);
  }
});

module.exports = router;
