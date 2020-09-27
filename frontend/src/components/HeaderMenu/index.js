import React, { useState } from 'react';
import { Menu } from 'antd';

function HeaderMenu(props) {
  const [selected, setSelected] = useState('0');

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
            {item.label}
          </Menu.Item>
        );
      })}
    </Menu>
  );
}

export default HeaderMenu;
