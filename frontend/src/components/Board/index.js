import React, { useState } from 'react';
import { Row } from 'antd';
import Piece from '../Piece';
import './index.css';
import {
  validatePair,
  generateFlippedMatrix,
  getFlippedPositionsObject,
} from './boardLogic';
import { getDiffTimesString } from '../../utils/utils';

function Board({ data, matchCallback, started, finished, style }) {
  const [flippedMatrix, setFlippedMatrix] = useState(
    generateFlippedMatrix(data)
  );
  const [lastFlipped, setLastFlipped] = useState(null);
  const [locked, setLocked] = useState(false);
  const [points, setPoints] = useState(0);
  const [startTime] = useState(new Date());
  const [finalTime, setFinalTime] = useState();
  const [wrongPlays, setWrongPlays] = useState(0);

  const onClick = ({ x, y }) => {
    if (!locked && !flippedMatrix[y][x]) {
      const newFlippedMatrix = [...flippedMatrix];
      newFlippedMatrix[y][x] = !newFlippedMatrix[y][x];
      setFlippedMatrix(newFlippedMatrix);
      changeLastFlipped({ x, y });
    }
  };

  const changeLastFlipped = ({ x, y }) => {
    const allFlipped = getFlippedPositionsObject({ x, y }, lastFlipped);
    setLastFlipped({ x, y });

    if (allFlipped.first && allFlipped.second) {
      const valid = validatePair(allFlipped.first, allFlipped.second, data);

      if (!valid) {
        setLocked(true);
        wrongSelectionAction([allFlipped.first, allFlipped.second]);
        setPoints(points - 50);
        setWrongPlays(wrongPlays + 1);
      } else {
        setPoints(points + 300);
        setLastFlipped(null);
        checkEndGame();
      }
    }
  };

  const wrongSelectionAction = (positionsList) => {
    setTimeout(() => {
      setLastFlipped(null);
      unflipPositions(positionsList);
      setLocked(false);
      checkEndGame();
    }, 1000);
  };

  const checkEndGame = () => {
    const finalDate = new Date();
    let result = true;
    flippedMatrix.forEach((line) => {
      line.forEach((piece) => {
        result = result && piece;
      });
    });

    if (result) {
      setFinalTime(finalDate);
      retrievePointsFromTime(finalDate);
      if (matchCallback) {
        matchCallback(points);
      }
    }
  };

  const retrievePointsFromTime = (finalDate) => {
    const dif = finalDate.getTime() - startTime.getTime();
    const pointsToRemove = Math.floor(dif / 1000) * 3;
    setPoints(points - pointsToRemove);
  };

  const unflipPositions = (positions = []) => {
    const newFlippedMatrix = [...flippedMatrix];
    positions.forEach((position) => {
      newFlippedMatrix[position.y][position.x] = false;
    });
    setFlippedMatrix(newFlippedMatrix);
  };

  const boardList = data.map((line, y) => {
    const lineList = line.map((element, x) => {
      return (
        <Piece
          value={element}
          style={style[element]}
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
    <div className={`board-grid${finalTime ? ' finished' : ''}`}>
      {finalTime && (
        <>
          <h2 className='end-title'>Partida Finalizada</h2>
          <h2 className='time-title'>
            Duração:{' '}
            <b id='points-value'>{getDiffTimesString(startTime, finalTime)}</b>
          </h2>
          <h2 className='time-title'>
            Jogadas Erradas: <b id='points-value'>{wrongPlays}</b>
          </h2>
        </>
      )}
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
