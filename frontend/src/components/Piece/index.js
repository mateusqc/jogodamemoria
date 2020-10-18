import React from 'react';
import PropType from 'prop-types';
import './index.css';

function Piece(props) {
  return (
    <div
      className={'piece ' + (props.flipped ? 'visible' : 'hidden')}
      onClick={props.onClick}
    >
      {props.flipped && (
        <>
          <h2>{props.value}</h2>
          <h2>
            {props.position.x} {props.position.y}
          </h2>
        </>
      )}
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
};

export default Piece;
