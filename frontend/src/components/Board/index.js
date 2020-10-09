import React, { useState } from 'react';
import { Button, Row } from 'antd';
import Piece from '../Piece';
import './index.css';

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
  const [lastFlipped, setLastFlipped] = useState(null);
  const [locked, setLocked] = useState(false);
  const [points, setPoints] = useState(0);
  const [gameTime, setgameTime] = useState();
  const [started, setStarted] = useState();

  const onClick = ({ x, y }) => {
    console.log(`click${y}${x}`);
    if (!locked && !flippedMatrix[y][x]) {
      const newFlippedMatrix = [...flippedMatrix];
      newFlippedMatrix[y][x] = !newFlippedMatrix[y][x];
      setFlippedMatrix(newFlippedMatrix);
      changeLastFlipped({ x, y });
    }
  };

  const changeLastFlipped = ({ x, y }) => {
    const allFlipped = {};
    if (!lastFlipped) {
      allFlipped.first = { x, y };
      setLastFlipped({ x, y });
    } else {
      allFlipped.first = {};
      Object.assign(allFlipped.first, lastFlipped);
      allFlipped.second = { x, y };
    }

    if (allFlipped.first && allFlipped.second) {
      const valid = validatePair(allFlipped.first, allFlipped.second);
      if (!valid) {
        setLocked(true);
        setTimeout(() => {
          setLastFlipped(null);
          unflipPositions([allFlipped.first, allFlipped.second]);
          setLocked(false);
        }, 1000);
        setPoints(points - 50);
      } else {
        setPoints(points + 300);
        setLastFlipped(null);
      }
    }
  };

  const unflipPositions = (positions = []) => {
    const newFlippedMatrix = [...flippedMatrix];
    positions.forEach((position) => {
      newFlippedMatrix[position.y][position.x] = false;
    });
    setFlippedMatrix(newFlippedMatrix);
  };

  const validatePair = (first, second) => {
    return props.data[first.y][first.x] === props.data[second.y][second.x];
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

  return (
    <div className='board-grid'>
      <div>
        <Button className='board-button' disabled={started}>
          Iniciar
        </Button>
        <Button className='board-button' disabled={!started}>
          Resetar
        </Button>
      </div>
      <div>
        <h2>
          Pontuação: <b>{points}</b>
        </h2>
        {boardList}
      </div>
    </div>
  );
}

export default Board;
