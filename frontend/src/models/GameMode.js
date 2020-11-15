function GameMode({
  id,
  name,
  level,
  x,
  y,
  figures,
  pairsPerFigure,
  timeLimit,
  errorLimit,
  type,
}) {
  Object.call(this);
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
}
