import {
  EditOutlined,
  PlusOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { Button, message, Row, Spin, Table } from 'antd';
import Search from 'antd/lib/input/Search';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/userContext';
import { getGameModes } from '../../services/gameModes';
import staticData from '../../services/staticData';
import { gateLabelFromValue, getListWithKey } from '../../utils/utils';
import DetailsDrawer from './detailsDrawer';
import FormModal from './formModal';

function GameModesPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page] = useState();
  const [detailedRow, setDetailedRow] = useState(null);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const userContext = useContext(UserContext);

  const columnButtons = {
    title: '',
    dataIndex: '',
    key: 'buttons',
    width: '110px',
    render: (row) => (
      <span className='table-buttons' style={{ float: 'right' }}>
        {userContext.user && userContext.user.name === row.userName && (
          <Button
            icon={<EditOutlined />}
            style={{ marginRight: '5px' }}
            onClick={() => {
              setRowToEdit(row);
              setIsModalVisible(true);
            }}
          />
        )}
        <Button
          icon={<UnorderedListOutlined />}
          onClick={() => setDetailedRow(row)}
        />
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

  const onClickNovo = () => {
    if (userContext.user) {
      setIsModalVisible(true);
    } else {
      message.error('É necessário estar logado para criar novos modos de jogo');
    }
  };

  return (
    <>
      <h2>Modos de Jogo</h2>
      <Row className={'table-action-top-bar'}>
        <Button type='primary' icon={<PlusOutlined />} onClick={onClickNovo}>
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
      <DetailsDrawer data={detailedRow} onClose={() => setDetailedRow(null)} />
      <FormModal
        visible={isModalVisible}
        contentToEdit={rowToEdit}
        onClose={() => {
          setIsModalVisible(false);
          loadTableData();
        }}
      />
    </>
  );
}

export default GameModesPage;
