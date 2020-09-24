import React from 'react';
import './App.css';
import { Layout } from 'antd';
import HeaderMenu from './components/HeaderMenu';
import {
  AppstoreOutlined,
  TrophyOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import Index from './pages';

const { Header, Content } = Layout;

function App() {
  const menuItems = [
    { label: 'Início', icon: <AppstoreOutlined /> },
    { label: 'Ranking', icon: <TrophyOutlined /> },
    { label: 'Sobre', icon: <InfoCircleOutlined /> },
  ];

  return (
    <div className='App'>
      <Layout>
        <Header className='header'>
          <div className='logo' />
          <HeaderMenu menuItems={menuItems} />
        </Header>
        <Content className='content'>
          <Index />
        </Content>
      </Layout>
    </div>
  );
}

export default App;
