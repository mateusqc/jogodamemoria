import React, { useState } from 'react';
import Board from '../components/Board';

const initBoardMatrix = [
  [0, 2, 3, 5],
  [3, 1, 4, 5],
  [1, 4, 2, 6],
  [0, 6, 7, 7],
];

function Index() {
  const [boardMatrix, setBoardMatrix] = useState(initBoardMatrix);
  return (
    <>
      <h2>Jogo da Velha!</h2>
      <Board data={boardMatrix} />
    </>
  );
}

export default Index;
