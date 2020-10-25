import React, { useContext, useState } from 'react';
import { Button, Descriptions, Popover } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';

import './index.css';
import { UserContext, defaultUser } from '../../context/userContext';

function UserBox(props) {
  const userContext = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  //TODO: Transpor lógica de load do usuário a partir da API para App.js

  const randomTimeOnClick = (value) => {
    setLoading(true);
    const time = Math.random() * 2000;
    setTimeout(() => {
      onClick(value);
      setLoading(false);
    }, time);
  };

  const onClick = (value) => {
    userContext.setUser(value);
  };

  const getPopContent = () => {
    if (userContext.user && userContext.user.name) {
      return (
        <div>
          <div>
            <b>Usuário: </b>
            {userContext.user.name}
          </div>
          <div>
            <b>Partidas Jogadas: </b>
            {userContext.user.matchesPlayed}
          </div>
          <br />
          <Button
            type='primary'
            onClick={() => {
              randomTimeOnClick(null);
            }}
            loading={loading}
          >
            Logout
          </Button>
        </div>
      );
    } else {
      return (
        <Button
          type='primary'
          loading={loading}
          onClick={() => {
            randomTimeOnClick(defaultUser);
          }}
        >
          Login
        </Button>
      );
    }
  };

  return (
    <div className='user-box-container'>
      <Popover
        placement='bottomRight'
        title={userContext.user ? 'Informações do Usuário' : null}
        content={getPopContent()}
        trigger='click'
      >
        {userContext.user ? (
          <Avatar
            className='avatar-icon'
            size='large'
            style={{ backgroundColor: '#00a2ae' }}
          >
            {userContext.user.name[0]}
          </Avatar>
        ) : (
          <Avatar
            className='avatar-icon'
            size='large'
            icon={<UserOutlined />}
          />
        )}
      </Popover>
    </div>
  );
}

export default UserBox;
