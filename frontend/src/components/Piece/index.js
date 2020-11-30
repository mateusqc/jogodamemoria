import React from 'react';
import PropType from 'prop-types';
import './index.css';
import {
  LaptopOutlined,
  GiftOutlined,
  LockOutlined,
  PhoneOutlined,
  ShoppingCartOutlined,
  ToolOutlined,
  CompassOutlined,
  CarOutlined,
  BugOutlined,
  LikeOutlined,
} from '@ant-design/icons';

function Piece({ flipped, onClick, value, position, style }) {
  const getIcon = () => {
    const iconsObj = {
      laptop: (
        <LaptopOutlined
          style={{ marginTop: '23px', fontSize: '48px', color: style.color }}
        />
      ),
      gift: (
        <GiftOutlined
          style={{ marginTop: '23px', fontSize: '48px', color: style.color }}
        />
      ),
      lock: (
        <LockOutlined
          style={{ marginTop: '23px', fontSize: '48px', color: style.color }}
        />
      ),
      phone: (
        <PhoneOutlined
          style={{ marginTop: '23px', fontSize: '48px', color: style.color }}
        />
      ),
      cart: (
        <ShoppingCartOutlined
          style={{ marginTop: '23px', fontSize: '48px', color: style.color }}
        />
      ),
      tool: (
        <ToolOutlined
          style={{ marginTop: '23px', fontSize: '48px', color: style.color }}
        />
      ),
      compass: (
        <CompassOutlined
          style={{ marginTop: '23px', fontSize: '48px', color: style.color }}
        />
      ),
      car: (
        <CarOutlined
          style={{ marginTop: '23px', fontSize: '48px', color: style.color }}
        />
      ),
      bug: (
        <BugOutlined
          style={{ marginTop: '23px', fontSize: '48px', color: style.color }}
        />
      ),
      like: (
        <LikeOutlined
          style={{ marginTop: '23px', fontSize: '48px', color: style.color }}
        />
      ),
    };

    return iconsObj[style.icon];
  };

  return (
    <div
      className={`piece ${flipped ? 'visible' : 'hidden'} ${value}-pos-${
        position.x
      }-${position.y}`}
      key={`${value}-pos-${position.x}-${position.y}`}
      onClick={onClick}
    >
      {flipped && <>{getIcon()}</>}
    </div>
  );
}

Piece.defaultProps = {
  flipped: false,
  position: { x: null, y: null },
};

Piece.propTypes = {
  value: PropType.number.isRequired,
  position: PropType.object.isRequired,
  flipped: PropType.bool,
  onClock: PropType.func,
  style: PropType.object,
};

export default Piece;
