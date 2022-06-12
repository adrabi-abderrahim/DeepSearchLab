import React from 'react';
import ReactDOM from 'react-dom';
import YoungPeople from './YoungPeople';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<YoungPeople />, div);
  ReactDOM.unmountComponentAtNode(div);
});