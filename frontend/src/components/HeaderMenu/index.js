import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { Link, useHistory } from 'react-router-dom';

function HeaderMenu(props) {
  const [selected, setSelected] = useState('0');
  const history = useHistory();

  useEffect(() => {
    const path = history.location.pathname;
    props.menuItems.forEach((item, idx) => {
      if (item.path === path) {
        setSelected(`${idx}`);
      }
    });
  });

  const onClick = (key, action) => {
    setSelected(`${key}`);
    if (action) {
      action();
    }
  };

  return (
    <Menu theme='dark' mode='horizontal' selectedKeys={selected}>
      {props.menuItems.map((item, idx) => {
        return (
          <Menu.Item
            icon={item.icon}
            onClick={() => onClick(idx, item.action)}
            key={idx}
          >
            <Link to={item.path}>{item.label}</Link>
          </Menu.Item>
        );
      })}
    </Menu>
  );
}

export default HeaderMenu;
