import { message, Spin } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import Board from '../components/Board';
import { UserContext } from '../context/userContext';

function Index() {
  const [boardMatrix, setBoardMatrix] = useState([[]]);
  const [loading, setLoading] = useState(false);
  const [page] = useState();
  const userContext = useContext(UserContext);

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

  const addMatchToLoggedUser = () => {
    if (userContext.user) {
      const newUser = {};
      Object.assign(newUser, userContext.user);
      newUser.matchesPlayed = newUser.matchesPlayed + 1;
      userContext.setUser(newUser);
    } else {
      message.warning('Partida não gravada, não há usuário logado.');
    }
  };

  return (
    <>
      <h2>Jogo da Velha!</h2>
      {loading ? (
        <Spin></Spin>
      ) : (
        <Board data={boardMatrix} matchCallback={addMatchToLoggedUser} />
      )}
    </>
  );
}

export default Index;
