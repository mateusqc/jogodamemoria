import React from 'react';
import { Layout } from 'antd';
import HeaderMenu from '../components/HeaderMenu';
import {
  AppstoreOutlined,
  TrophyOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import UserBox from '../components/UserBox';
import UrlRouter from '../constants/UrlRouter';

const { Header, Content } = Layout;

const History = (props) => {
  const menuItems = [
    { label: 'Início', icon: <AppstoreOutlined />, path: UrlRouter.index },
    {
      label: 'Modos de Jogo',
      icon: <AppstoreOutlined />,
      path: UrlRouter.gameModes,
    },
    { label: 'Hiscores', icon: <TrophyOutlined />, path: UrlRouter.hiscores },
    { label: 'Sobre', icon: <InfoCircleOutlined />, path: '' },
  ];

  return (
    <div className='template'>
      <Layout>
        <Header className='header'>
          <HeaderMenu menuItems={menuItems} />
          <UserBox />
        </Header>
        <Content className='content'>{props.children}</Content>
      </Layout>
    </div>
  );
};

export default History;
