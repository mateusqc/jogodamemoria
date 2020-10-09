import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import Board from '../components/Board';

function Index() {
  const [boardMatrix, setBoardMatrix] = useState([[]]);
  const [loading, setLoading] = useState(false);
  const [page] = useState();

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:8000/boards/random', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
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
