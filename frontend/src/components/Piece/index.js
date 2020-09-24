import React, { useEffect, useState } from 'react';
import './index.css';

function Piece(props) {
  return (
    <div
      className={props.flipped ? 'piece' : 'hidden-piece'}
      onClick={props.onClick}
    >
      {/* {flipped && ( */}
      <>
        <h2>{props.value}</h2>
        <h2>
          {props.position.x} {props.position.y}
        </h2>
      </>
      {/* )} */}
    </div>
  );
}

export default Piece;