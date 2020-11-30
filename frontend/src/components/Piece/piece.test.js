import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Piece from './index';

// create a function into global context for Jest
global.console = {
  log: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

const style = { icon: 'laptop', color: '#4287f5' };

let container = null;
beforeEach(() => {
  // configurar o elemento do DOM como o alvo da renderização
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // Limpar ao sair
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders with the correct value', () => {
  act(() => {
    render(
      <Piece
        flipped={true}
        value={1}
        style={style}
        position={{ x: 0, y: 0 }}
      />,
      container
    );
  });
  expect(container.children[0].className).toBe('piece visible 1-pos-0-0');
  expect(container.children[0].children.length > 0).toBeTruthy();

  act(() => {
    render(
      <Piece
        flipped={true}
        value={3}
        style={style}
        position={{ x: 4, y: 5 }}
      />,
      container
    );
  });
  expect(container.children[0].className).toBe('piece visible 3-pos-4-5');
  expect(container.children[0].children.length > 0).toBeTruthy();
});

it('renders and hides content when flipped is set', () => {
  act(() => {
    render(
      <Piece
        flipped={true}
        value={1}
        style={style}
        position={{ x: 0, y: 0 }}
      />,
      container
    );
  });

  expect(container.children[0].className).toBe('piece visible 1-pos-0-0');
  expect(container.children[0].children.length > 0).toBeTruthy();

  act(() => {
    render(
      <Piece
        flipped={false}
        value={1}
        style={style}
        position={{ x: 0, y: 0 }}
      />,
      container
    );
  });
  expect(container.children[0].className).toBe('piece hidden 1-pos-0-0');
  expect(container.children[0].children.length === 0).toBeTruthy();
});

it('component outputs console error when value is not set', () => {
  act(() => {
    render(
      <Piece flipped={true} style={style} position={{ x: 0, y: 0 }} />,
      container
    );
  });
  expect(global.console.error).toHaveBeenCalled();
});

it('component should call onClick when clicked', () => {
  const onClick = jest.fn();
  act(() => {
    render(
      <Piece
        flipped={true}
        value={1}
        style={style}
        position={{ x: 0, y: 0 }}
        onClick={onClick}
      />,
      container
    );
  });
  const component = document.getElementsByClassName('piece')[0];
  act(() => {
    component.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  expect(onClick).toHaveBeenCalled();
});
