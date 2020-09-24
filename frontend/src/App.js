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
          <Menu
            theme='dark'
            style={{ height: '15px' }}
            mode='horizontal'
            defaultSelectedKeys={['0']}
          >
            {menuItems.map((item, idx) => {
              return (
                <Menu.Item icon={item.icon} key={idx}>
                  {item.label}
                </Menu.Item>
              );
            })}
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
