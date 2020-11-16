import Item from 'antd/lib/list/Item';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Board from './index';

// create a function into global context for Jest
global.console = {
  log: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

const data = [
  [0, 2, 3, 5],
  [3, 1, 4, 5],
  [1, 4, 2, 6],
  [0, 6, 7, 7],
];

let container = null;

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

beforeEach(() => {
  // configurar o elemento do DOM como o alvo da renderização
  container = document.createElement('div');
  document.body.appendChild(container);
  act(() => {
    render(<Board data={data} started={true} />, container);
  });
});

afterEach(() => {
  // Limpar ao sair
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('component must render all pieces hidden at first', () => {
  const numberOfPieces = data.length * data[0].length;
  let pieces = document.getElementsByClassName('piece');

  expect(pieces.length).toBe(numberOfPieces);

  let content = '';

  Array(pieces).forEach((item) => {
    content = content + (item.innerText ? item.innerText : '');
  });

  expect(content).toBe('');
});

it('when clicked, a piece must be turn to visible', () => {
  const pieces = document.getElementsByClassName('piece');
  expect(pieces[0].textContent).toBeFalsy();
  act(() => {
    pieces[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  expect(pieces[0].textContent).toBeTruthy();
});

// it("when two pieces don't match, they will return to be not visible after 1s", () => {
//     jest.useFakeTimers();
//     const onSelect =
// });

it("when two pieces don't match, they will return to be not visible after 1s", () => {
  jest.useFakeTimers();

  const concatenatePiecesContent = (pieces = []) => {
    let content = '';
    pieces.forEach((piece) => {
      content = content + piece.textContent;
    });
    return content;
  };

  let pieces = document.getElementsByClassName('piece');

  // we will be using the first and las piece, both have different values
  let content = concatenatePiecesContent([
    pieces[0],
    pieces[pieces.length - 1],
  ]);
  expect(content).toBeFalsy();

  act(() => {
    pieces[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  act(() => {
    pieces[pieces.length - 1].dispatchEvent(
      new MouseEvent('click', { bubbles: true })
    );
  });

  content = concatenatePiecesContent([pieces[0], pieces[pieces.length - 1]]);
  expect(content).toBeTruthy();

  act(() => {
    jest.advanceTimersByTime(100);
  });

  content = concatenatePiecesContent([pieces[0], pieces[pieces.length - 1]]);
  expect(content).toBeTruthy();

  act(() => {
    jest.advanceTimersByTime(1000);
  });

  content = concatenatePiecesContent([pieces[0], pieces[pieces.length - 1]]);
  expect(content).toBeFalsy();
});

it('deducts 50 points when an wrong pair is selected', () => {
  let pieces = document.getElementsByClassName('piece');
  let points = document.getElementById('points-value');
  expect(points.textContent).toBe('0');
  act(() => {
    pieces[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  act(() => {
    pieces[pieces.length - 1].dispatchEvent(
      new MouseEvent('click', { bubbles: true })
    );
  });
  expect(points.textContent).toBe('-50');
});

it('adds 300 points when an right pair is selected', () => {
  let pieces = document.getElementsByClassName('piece');
  let points = document.getElementById('points-value');
  expect(points.textContent).toBe('0');
  act(() => {
    pieces[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  //position x = 0 and y = 3
  act(() => {
    pieces[12].dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  expect(points.textContent).toBe('300');
});
