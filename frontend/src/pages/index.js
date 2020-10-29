import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import Board from '../components/Board';
import BoardService from '../services/board';

function Index() {
  const [boardMatrix, setBoardMatrix] = useState([[]]);
  const [loading, setLoading] = useState(false);
  const [page] = useState();

  useEffect(() => {
    setLoading(true);
    BoardService.getRandomBoard()
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((response) => {
        console.log(response);
        setBoardMatrix(response);
      })
      .catch((error) => {
        console.log(error);
        setBoardMatrix([[]]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page]);

  return (
    <>
      <h2>Jogo da Velha!</h2>
      {loading ? <Spin></Spin> : <Board data={boardMatrix} />}
    </>
  );
}

export default Index;
