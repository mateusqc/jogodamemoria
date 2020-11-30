import { Button, Row, Select, Spin, Table } from 'antd';
import Search from 'antd/lib/input/Search';
import React, { useEffect, useState } from 'react';
import { getGameModes } from '../../services/gameModes';
import { getHiscoresSearchFilter } from '../../services/hiscores';
import { gateLabelFromValue, getListWithKey } from '../../utils/utils';

function HiscoresPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedGameMode, setSelectedGameMode] = useState(0);
  const [gameModesList, setGameModesList] = useState([]);
  const [page] = useState();

  const columns = [
    { title: 'Nome', dataIndex: 'name', key: 'name' },
    { title: 'Pontos', dataIndex: 'points', key: 'points' },
    {
      title: 'Modo de Jogo',
      dataIndex: 'level',
      key: 'level',
      render: (value) => gateLabelFromValue(value, gameModesList, 'id', 'name'),
    },
  ];

  useEffect(() => {
    loadTableData();
    loadGameModes();
  }, [page]);

  const loadGameModes = () => {
    setLoading(true);
    const params = { order: 'asc' };
    getGameModes(params)
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        setGameModesList(getListWithKey(response));
      })
      .catch((error) => {
        setGameModesList([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const loadTableData = (filterParams = {}, search = false) => {
    setLoading(true);
    const params = { order: 'desc' };
    Object.assign(params, filterParams);

    getHiscoresSearchFilter(params, [
      { attribute: 'level', value: selectedGameMode },
    ])
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

  const onSearch = (query) => {
    if (query) {
      const attList = ['name', 'points'];
      const params = {};
      attList.forEach((att) => {
        params[att] = query;
      });
      loadTableData(params, true);
    } else {
      loadTableData();
    }
  };

  return (
    <>
      <h2>Hiscores</h2>
      <Row className={'table-action-top-bar'}>
        {/* <Button type='primary'>Novo</Button> */}
        <div className='search-table-filter'>
          <Select
            style={{ width: '100%' }}
            placeholder={'Selecione'}
            value={selectedGameMode}
            onChange={(value) => {
              setSelectedGameMode(value);
              // loadBoard(value);
            }}
          >
            {gameModesList.map((item) => (
              <Select.Option value={item.id}>{item.name}</Select.Option>
            ))}
          </Select>
        </div>
        <Search
          className='search-table-with-filter'
          placeholder='Insira sua busca'
          enterButton='Buscar'
          onSearch={onSearch}
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

export default HiscoresPage;
