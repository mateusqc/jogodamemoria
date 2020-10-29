import React, { useState } from 'react';
import './App.css';
import { Layout } from 'antd';
import HeaderMenu from './components/HeaderMenu';
import {
  AppstoreOutlined,
  TrophyOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import Index from './pages';
import UserBox from './components/UserBox';
import { UserContext } from './context/userContext';

const { Header, Content } = Layout;

function App() {
  const [user, setUser] = useState(null);
  const menuItems = [
    { label: 'Início', icon: <AppstoreOutlined /> },
    { label: 'Ranking', icon: <TrophyOutlined /> },
    { label: 'Sobre', icon: <InfoCircleOutlined /> },
  ];

  return (
    <div className='App'>
      <UserContext.Provider value={{ user, setUser }}>
        <Layout>
          <Header className='header'>
            {/* <div className='logo' /> */}
            <HeaderMenu menuItems={menuItems} />
            <UserBox />
          </Header>
          <Content className='content'>
            <Index />
          </Content>
        </Layout>
      </UserContext.Provider>
    </div>
  );
}

export default App;
