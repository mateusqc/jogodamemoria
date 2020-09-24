import React from 'react';
import { Menu } from 'antd';

function HeaderMenu(props) {
  return (
    <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['0']}>
      {props.menuItems.map((item, idx) => {
        return (
          <Menu.Item icon={item.icon} key={idx}>
            {item.label}
          </Menu.Item>
        );
      })}
    </Menu>
  );
}

export default HeaderMenu;
