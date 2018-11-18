import React from 'react';
import ReactDOM from 'react-dom';

const App = () => (
  <div>
    <h3><%- `${num} ${name}` %></h3>
    <ol>
      <li>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://leetcode.com/problems/<%- nameSlug %>/description/"
        >
          Problem Description
        </a>
      </li>
      <li>
        Edit <code>solution.js</code>
      </li>
      <li>
        Check out <strong>Tests</strong> Tab below for results.{' '}
        <a href="https://codesandbox.io/docs/tests#how-to-use-jest-in-codesandbox">
          More about Jest Test
        </a>
      </li>
    </ol>
  </div>
);

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
