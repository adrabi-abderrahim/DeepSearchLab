import React from 'react';
import ReactDOM from 'react-dom';
import WordDetails from './WordDetails';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<WordDetails />, div);
  ReactDOM.unmountComponentAtNode(div);
});