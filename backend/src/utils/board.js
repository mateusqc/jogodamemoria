const defaultBoardLevel = { x: 4, y: 4, figures: 8, pairsPerFigure: 1 };

const generateBoard = (level = null) => {
  console.log(level);
  const levelToGenerate = level ? level : defaultBoardLevel;
  const pairs = {};

  console.log(levelToGenerate);

  const board = [];
  for (let i = 0; i < levelToGenerate.y; i++) {
    board.push([]);
    for (let j = 0; j < levelToGenerate.x; j++) {
      let numberToAdd = getRandomFromFigNumber(levelToGenerate.figures);
      while (
        pairs[numberToAdd] &&
        pairs[numberToAdd] >= levelToGenerate.pairsPerFigure * 2
      ) {
        numberToAdd = getRandomFromFigNumber(levelToGenerate.figures);
      }
      if (pairs[numberToAdd]) {
        pairs[numberToAdd]++;
      } else {
        pairs[numberToAdd] = 1;
      }
      board[i].push(numberToAdd);
    }
  }

  return board;
};

const getRandomFromFigNumber = (figures) => {
  const multiplier = Math.floor(figures / 10) + 1;
  const randomNum = Math.floor(
    (Math.random() * Math.pow(10, multiplier)) % figures
  );
  return randomNum;
};

module.exports = {
  generateBoard,
};
