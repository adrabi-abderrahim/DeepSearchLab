import React from 'react';
import ReactDOM from 'react-dom';
import KnowledgeGraph from './KnowledgeGraph';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<KnowledgeGraph />, div);
  ReactDOM.unmountComponentAtNode(div);
});