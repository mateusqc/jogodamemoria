import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Layout } from 'antd';
import HeaderMenu from './components/HeaderMenu';
import {
  AppstoreOutlined,
  TrophyOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';

const { Header, Content } = Layout;

function App() {
  // const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { label: 'Início', icon: <AppstoreOutlined /> },
    { label: 'Ranking', icon: <TrophyOutlined /> },
    { label: 'Sobre', icon: <InfoCircleOutlined /> },
  ];

  useEffect(() => {
    console.log('atualizou');
  });

  return (
    <div className='App'>
      <Layout>
        <Header className='header'>
          <div className='logo' />
          <HeaderMenu menuItems={menuItems} />
        </Header>
        <Content className='content'>
          <h2>Content</h2>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
