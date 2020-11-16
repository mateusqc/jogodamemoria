function GameMode({
  id,
  name,
  level,
  x,
  y,
  figures,
  pairsPerFigure,
  timeLimit = 0,
  errorLimit = 0,
  type = 'u',
  userName = null,
}) {
  this.id = id;
  this.name = name;
  this.level = level;
  this.x = x;
  this.y = y;
  this.figures = figures;
  this.pairsPerFigure = pairsPerFigure;
  this.timeLimit = timeLimit;
  this.errorLimit = errorLimit;
  this.type = type;
  this.userName = userName;

  function validate() {
    let validation = true;
    validation = validation && this.name;
    validation = validation && this.level >= 0 && this.level <= 2;
    validation = validation && this.x >= 2;
    validation = validation && this.y >= 2;
    validation = validation && this.figures >= (this.x * this.y) / 2;
    validation = validation && this.pairsPerFigure >= 1;
    validation = validation && this.timeLimit >= 0;
    validation = validation && this.errorLimit >= 0;
    validation = validation && ['o', 'u'].indexOf(this.type) >= 0;
    validation = validation && this.userName !== null && this.type === 'u';
    return validation;
  }

  this.validate = validate;
}

export default GameMode;
