import { PlusOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Button, Row, Spin, Table } from 'antd';
import Search from 'antd/lib/input/Search';
import React, { useEffect, useState } from 'react';
import { getGameModes } from '../../services/gameModes';
import staticData from '../../services/staticData';
import { gateLabelFromValue, getListWithKey } from '../../utils/utils';

function GameModesPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page] = useState();

  const columnButtons = {
    title: '',
    dataIndex: '',
    key: 'buttons',
    width: '60px',
    render: (row) => (
      <span className='table-buttons'>
        <Button icon={<UnorderedListOutlined />} />
      </span>
    ),
  };

  const columns = [
    { title: 'Modo de Jogo', dataIndex: 'name', key: 'name' },
    {
      title: 'Dificuldade',
      dataIndex: 'level',
      key: 'level',
      render: (value) =>
        gateLabelFromValue(value, staticData.getGameModeLevel()),
    },
    {
      title: 'Tipo',
      dataIndex: 'type',
      key: 'type',
      render: (value) =>
        gateLabelFromValue(value, staticData.getGameModeType()),
    },
    columnButtons,
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
      <h2>Modos de Jogo</h2>
      <Row className={'table-action-top-bar'}>
        <Button type='primary' icon={<PlusOutlined />}>
          Novo
        </Button>
        <Search
          className='search-table-with-button'
          placeholder='Insira sua busca'
          enterButton='Buscar'
        />
      </Row>
      {loading ? (
        <Spin />
      ) : (
        <Table size='middle' columns={columns} dataSource={list} />
      )}
    </>
  );
}

export default GameModesPage;
