import { Row, Spin, Table } from 'antd';
import Search from 'antd/lib/input/Search';
import React, { useEffect, useState } from 'react';
import { getHiscores, getHiscoresSearch } from '../../services/hiscores';
import { getListWithKey } from '../../utils/utils';

function HiscoresPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page] = useState();

  const columns = [
    { title: 'Nome', dataIndex: 'name', key: 'name' },
    { title: 'Pontos', dataIndex: 'points', key: 'points' },
    { title: 'Nível', dataIndex: 'level', key: 'level' },
  ];

  useEffect(() => {
    loadTableData();
  }, [page]);

  const loadTableData = (filterParams = {}, search = false) => {
    setLoading(true);
    const params = { order: 'desc' };
    Object.assign(params, filterParams);

    const funcToUse = search ? getHiscoresSearch : getHiscores;

    funcToUse(params)
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
        <Search
          className='search-table'
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
