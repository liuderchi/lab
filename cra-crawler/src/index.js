import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import './styles.css';
import useInterval from './useInterval';
import notify from './notify';
import mockListProps from './mockListProps';

const URL =
  'https://rent.591.com.tw/?kind=1&region=1&section=3,5,7,4&rentprice=10000,40000&patternMore=3&area=20,60&hasimg=1&not_cover=1&order=posttime&orderType=desc';

const crawlerFetch = () => {
  // TODO DOM Script
  fetch(URL)
    .then(resp => resp.json())
    .then(data => console.log({ data }));
};

const domScript = () => {
  [...document.querySelectorAll('ul.listInfo')].map(el => {
    const title = el.children[1].children[0].textContent.replace(/\s+/g, '');
    const price = el.children[2].textContent.replace(/\s+/g, '');
    const url = el.children[1].children[0].children[0].href;
    const id = /\d{7}/g.exec(url)[0];
    return { id, title, price, url };
  });
};

const App = () => {
  const [targetUrl, setTargetUrl] = useState(URL);
  const [intervalSec, setIntevalSec] = useState(2);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useInterval(() => {
    crawlerFetch();
    setLastUpdate(new Date());
  }, intervalSec * 1000);

  return (
    <div className="App">
      <div>
        {`It Fetches from `}
        <textarea
          disabled
          value={targetUrl}
          onChange={e => setTargetUrl(e.target.value)}
        />
      </div>
      <div>
        {`Every `}
        <input
          type="number"
          value={intervalSec}
          onChange={e => {
            if (e.target.value > 0) {
              setIntevalSec(e.target.value);
            }
          }}
        />
        {` Seconds`}
      </div>
      <br />
      <button
        onClick={() => notify('✅ You haved enabled browser notification')}
      >
        {`🔔 Enable Chrome Notification`}
      </button>
      <br />
      <p>last update: {lastUpdate.toLocaleString()}</p>
      <ul>
        {mockListProps.map(rent => {
          return (
            <li key={rent.id}>
              {`${rent.title}, ${rent.price}`}
              <a href={rent.url} target="_blank" rel="noopener noreferrer">
                link
              </a>
            </li>
          );
        })}
      </ul>

      <pre>
        {JSON.stringify(
          { intervalSec, lastUpdate: lastUpdate.toLocaleString() },
          null,
          2,
        )}
      </pre>
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
