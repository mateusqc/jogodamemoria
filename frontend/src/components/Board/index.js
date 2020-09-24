import React, { useState, useEffect } from 'react';
import { Row } from 'antd';
import Piece from '../Piece';

const generateFlippedMatrix = (data = [[]]) => {
  const yLen = data.length;
  const xLen = data[0].length;
  const result = [];
  for (let i = 0; i < yLen; i++) {
    result.push(new Array(xLen).fill(false));
  }
  return result;
};

function Board(props) {
  const [flippedMatrix, setFlippedMatrix] = useState(
    generateFlippedMatrix(props.data)
  );
  const [updated, setUpdated] = useState(false);

  const onClick = ({ x, y }) => {
    console.log(`click${y}${x}`);
    const newFlippedMatrix = flippedMatrix;
    newFlippedMatrix[y][x] = !newFlippedMatrix[y][x];
    setFlippedMatrix(newFlippedMatrix);
    setUpdated(!updated);
  };

  const boardList = props.data.map((line, y) => {
    const lineList = line.map((element, x) => {
      return (
        <Piece
          value={element}
          flipped={flippedMatrix[y][x]}
          //   flipped={test}
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
