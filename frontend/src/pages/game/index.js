import { Button, message, Select, Spin } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import Board from '../../components/Board';
import { getRandomBoard } from '../../services/board';
import { UserContext } from '../../context/userContext';
import { getGameModes } from '../../services/gameModes';
import { getListWithKey } from '../../utils/utils';
import { generateFigures } from '../../utils/boardStyleGenerator';
import GameMode from '../../models/GameMode';
import './index.css';
import Icon, { MessageOutlined } from '@ant-design/icons';
import gameRules from '../../constants/gameRules';
import { saveHiscore } from '../../services/hiscores';

function Index() {
  const [boardMatrix, setBoardMatrix] = useState([[]]);
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [gameModesList, setGameModesList] = useState([]);
  const [selectedGameMode, setSelectedGameMode] = useState(null);
  const [selectedGameModeStyle, setSelectedGameModeStyle] = useState(null);
  const [page] = useState();
  const userContext = useContext(UserContext);

  useEffect(() => {
    loadGameModes();
  }, [page]);

  const defineGameMode = (gameModeKey) => {
    setSelectedGameMode(gameModeKey);
    const gameMode = gameModesList.filter((item) => item.key === gameModeKey);
    const style = generateFigures(gameMode[0].figures);
    setSelectedGameModeStyle(style);
    console.log(style);
  };

  const loadGameModes = () => {
    setLoading(true);
    const params = { order: 'asc' };
    getGameModes(params)
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        setGameModesList(getListWithKey(response));
        if (gameModesList.length > 0) {
          defineGameMode(new GameMode(gameModesList[0]).id);
        }
      })
      .catch((error) => {
        setGameModesList([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const loadBoard = (gameModeId) => {
    setLoading(true);
    getRandomBoard(gameModeId)
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        setBoardMatrix(response);
      })
      .catch((error) => {
        console.log(error);
        setBoardMatrix([[]]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const addMatchToLoggedUser = (points) => {
    if (userContext.user) {
      const newUser = {};
      Object.assign(newUser, userContext.user);
      newUser.matchesPlayed = newUser.matchesPlayed + 1;
      userContext.setUser(newUser);
      persistNewHiscore({
        points,
        level: selectedGameMode,
        name: newUser.name,
      });
    } else {
      message.warning('Partida não gravada, não há usuário logado.');
    }
  };

  const persistNewHiscore = (hiscore) => {
    saveHiscore(hiscore)
      .then((response) => {
        if (response.status === 200) {
          message.success('Partida gravada nos Hiscores!');
        } else {
          message.error('Erro ao gravar partida nos Hiscores.');
        }
      })
      .catch((error) => {
        console.log(error);
        message.error('Erro ao gravar partida nos Hiscores.');
      });
  };

  const matchCallback = (points) => {
    setStarted(false);
    setFinished(true);
    addMatchToLoggedUser(points);
  };

  const resetGame = () => {
    setStarted(false);
    setFinished(false);
    setSelectedGameMode(null);
    setBoardMatrix([[]]);
  };

  const startGame = () => {
    if (selectedGameMode === null) {
      message.warning('Selecione um modo de jogo para iniciar');
    } else {
      setStarted(true);
    }
  };

  return (
    <div className='grid-container'>
      <div className='col1'>
        <h2>Jogo da Memória</h2>
        <div className='instructions'>
          {gameRules.map((item) => {
            return (
              <div>
                <b>{item.label}: </b>
                {item.text}
              </div>
            );
          })}
        </div>
        <div style={{ marginBottom: '20px', width: '200px' }}>
          <h4>Modo de Jogo</h4>
          <Select
            style={{ width: '100%' }}
            placeholder={'Selecione'}
            value={selectedGameMode}
            onChange={(value) => {
              defineGameMode(value);
              loadBoard(value);
            }}
            disabled={started || finished}
          >
            {gameModesList.map((item) => (
              <Select.Option value={item.id}>{item.name}</Select.Option>
            ))}
          </Select>
        </div>
        <div>
          <Button
            className='board-button'
            onClick={startGame}
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
      </div>
      {loading ? (
        <Spin></Spin>
      ) : (
        (started || finished) && (
          <div
            className='col2'
            style={{ borderLeft: 'solid 1px black', paddingLeft: '15px' }}
          >
            <Board
              data={boardMatrix}
              matchCallback={matchCallback}
              started={started}
              finished={finished}
              style={selectedGameModeStyle}
            />
          </div>
        )
      )}
    </div>
  );
}

export default Index;
