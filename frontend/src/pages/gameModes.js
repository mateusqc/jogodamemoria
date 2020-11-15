import { Spin, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { getGameModes } from '../services/gameModes';
import { getListWithKey } from '../utils/utils';

function GameModesPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page] = useState();

  const columns = [
    { title: 'Modo de Jogo', dataIndex: 'name', key: 'name' },
    { title: 'Dificuldade', dataIndex: 'level', key: 'level' },
    { title: 'Origem', dataIndex: 'type', key: 'type' },
  ];

  useEffect(() => {
    loadTableData();
  }, [page]);

  const loadTableData = (filterParams = {}) => {
    setLoading(true);
    const params = { order: 'asc' };
    Object.assign(params, filterParams);
    getGameModes(params)
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        setList(getListWithKey(response));
      })
      .catch((error) => {
        console.log(error);
        setList([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <h2>Hiscores</h2>
      {loading ? <Spin /> : <Table columns={columns} dataSource={list} />}
    </>
  );
}

export default GameModesPage;
