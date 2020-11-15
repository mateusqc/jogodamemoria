function GameMode(obj = {}) {
  const atts = ['id', 'name', 'points', 'level'];

  const newObj = {};

  atts.forEach((att) => {
    newObj[att] = obj[att];
  });

  return newObj;
}

export default GameMode;
