import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  AppstoreOutlined,
  TrophyOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';

const { Header, Content } = Layout;

function App() {
  // const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    console.log('atualizou');
  });

  return (
    <div className='App'>
      <Layout>
        <Header className='header'>
          <div className='logo' />
          <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['1']}>
            <Menu.Item icon={<AppstoreOutlined />} key='1'>
              Início
            </Menu.Item>
            <Menu.Item icon={<TrophyOutlined />} key='2'>
              Ranking
            </Menu.Item>
            <Menu.Item icon={<InfoCircleOutlined />} key='3'>
              Sobre
            </Menu.Item>
          </Menu>
        </Header>
        <Content className='content'>
          <h2>Content</h2>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
