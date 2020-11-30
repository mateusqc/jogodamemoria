const iconLabelList = [
  'laptop',
  'gift',
  'lock',
  'phone',
  'cart',
  'tool',
  'compass',
  'car',
  'bug',
  'like',
];

const colors = [
  '#4287f5',
  '#32cd32',
  '#6a5acd',
  '#ffd700',
  '#48d1cc',
  '#dc143c',
  '#ff8c00',
  '#ff69b4',
  '#808080',
  '#000',
];

export function generateFigures(figuresNum) {
  const result = [];

  let colorIdx = 0;
  for (let i = 0; i < figuresNum; i++) {
    const fig = {};
    while (true) {
      if (colorIdx >= 10) {
        colorIdx = 0;
      }
      const iconIdx = Math.floor(Math.random() * 10);
      fig.icon = iconLabelList[iconIdx];
      fig.color = colors[colorIdx];
      if (elementNotInList(fig, result)) {
        break;
      }
      colorIdx += 1;
    }
    colorIdx += 1;
    result.push(fig);
  }
  return result;
}

const elementNotInList = ({ icon, color }, list = []) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i].icon === icon && list[i].color === color) {
      return false;
    }
  }
  return true;
};
