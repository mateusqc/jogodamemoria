import React, { useContext, useState } from 'react';
import { Button, Row } from 'antd';
import Piece from '../Piece';
import './index.css';
import { validatePair } from '../../utils/utils';

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
  // const [gameTime, setgameTime] = useState();
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

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
      const valid = validatePair(
        allFlipped.first,
        allFlipped.second,
        props.data
      );

      if (!valid) {
        setLocked(true);
        setTimeout(() => {
          setLastFlipped(null);
          unflipPositions([allFlipped.first, allFlipped.second]);
          setLocked(false);
          checkEndGame();
        }, 1000);
        setPoints(points - 50);
      } else {
        setPoints(points + 300);
        setLastFlipped(null);
        checkEndGame();
      }
    }
  };

  const checkEndGame = () => {
    let result = true;
    flippedMatrix.forEach((line) => {
      line.forEach((piece) => {
        result = result && piece;
      });
    });

    if (result) {
      setStarted(false);
      setFinished(true);
      if (props.matchCallback) {
        props.matchCallback();
      }
      //TODO: fazer de forma ao resultado ser enviado à API para entrar
      //      na lista de hiscores.
    }
  };

  const unflipPositions = (positions = []) => {
    const newFlippedMatrix = [...flippedMatrix];
    positions.forEach((position) => {
      newFlippedMatrix[position.y][position.x] = false;
    });
    setFlippedMatrix(newFlippedMatrix);
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

  const resetGame = () => {
    setStarted(false);
    setFinished(false);
    setPoints(0);
    setFlippedMatrix(generateFlippedMatrix(props.data));
  };

  return (
    <div className='board-grid'>
      <div>
        <Button
          className='board-button'
          onClick={() => setStarted(true)}
          disabled={started || finished}
        >
          Iniciar
        </Button>
        <Button
          className='board-button'
          onClick={resetGame}
          disabled={!started && !finished}
        >
          Resetar
        </Button>
      </div>
      {(started || (!started && finished)) && (
        <div className='points-container'>
          <h2>
            Pontuação: <b id='points-value'>{points}</b>
          </h2>
          {boardList}
        </div>
      )}
    </div>
  );
}

export default Board;
