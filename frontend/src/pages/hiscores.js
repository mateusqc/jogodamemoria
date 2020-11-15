import { Spin, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { getHiscores } from '../services/hiscores';
import { getListWithKey } from '../utils/utils';

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

  const loadTableData = (filterParams = {}) => {
    setLoading(true);
    const params = { order: 'desc' };
    Object.assign(params, filterParams);
    getHiscores(params)
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
      {loading ? (
        <Spin />
      ) : (
        <Table size='middle' columns={columns} dataSource={list} />
      )}
    </>
  );
}

export default HiscoresPage;
