import React, { useState } from 'react';
import { Row } from 'antd';
import Piece from '../Piece';

const generateFlippedMatrix = (data = [[]]) => {
  const yLen = data.length;
  const xLen = data[0].length;
  const result = Array.from({ length: yLen }, () =>
    Array.from({ length: xLen }, () => false)
  );

  return result;
};

function Board(props) {
  const [flippedMatrix, setFlippedMatrix] = useState(
    generateFlippedMatrix(props.data)
  );

  const onClick = ({ x, y }) => {
    console.log(`click${y}${x}`);
    const newFlippedMatrix = [...flippedMatrix];
    // if (!newFlippedMatrix[y][x]) {
    newFlippedMatrix[y][x] = !newFlippedMatrix[y][x];
    setFlippedMatrix(newFlippedMatrix);
    // }
  };

  const boardList = props.data.map((line, y) => {
    const lineList = line.map((element, x) => {
      return (
        <Piece
          value={element}
          flipped={flippedMatrix[y][x]}
          onClick={() => onClick({ x, y })}
          position={{ x, y }}
          key={`element-${y}-${x}`}
        />
      );
    });
    return <Row key={`row-${y}`}>{lineList}</Row>;
  });

  return boardList;
}

export default Board;
