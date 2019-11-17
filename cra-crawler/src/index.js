import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { parse } from 'node-html-parser';

import './styles.css';
import useInterval from './useInterval';
import notify from './notify';

const URL =
  'https://rent.591.com.tw/?kind=1&region=1&section=3,5,7,4&rentprice=10000,40000&patternMore=3&area=20,60&hasimg=1&not_cover=1&order=posttime&orderType=desc';

const crawlerFetch = url => {
  return fetch(url)
    .then(resp => resp.text())
    .then(body => {
      const rootDom = parse(body);
      const resultList = rootDom.querySelectorAll('ul.listInfo').map(el => {
        const title = el.childNodes[3].childNodes[1].text.replace(/\s+/g, '');
        const price = el.childNodes[5].text.replace(/\s+/g, '');
        const link = `https:${el.childNodes[3].childNodes[1].childNodes[1].attributes.href}`;
        const id = /\d{7}/g.exec(link)[0];
        const updateAt = (el.childNodes[3].childNodes[7].childNodes[3] || {})[
          'text'
        ];
        console.log({ updateAt });
        return { id, title, price, link, updateAt };
      });
      return resultList;
    })
    .catch(err => console.error(err));
};

// POC of JS Valina
// const domScript = () => {
//   [...document.querySelectorAll('ul.listInfo')].map(el => {
//     const title = el.children[1].children[0].textContent.replace(/\s+/g, '');
//     const price = el.children[2].textContent.replace(/\s+/g, '');
//     const link = el.children[1].children[0].children[0].href;
//     const id = /\d{7}/g.exec(link)[0];
//     return { id, title, price, link };
//   });
// };

const App = () => {
  const [targetUrl, setTargetUrl] = useState(URL);
  const [intervalSec, setIntevalSec] = useState(30);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [bucket, setBucket] = useState(
    {},
    // db
  );

  const tick = useCallback(async () => {
    try {
      let newRentCount = 0;
      const rents = await crawlerFetch(targetUrl);
      const rentsMap = {};
      rents.forEach(rent => {
        rentsMap[rent.id] = {
          id: rent.id,
          title: rent.title,
          price: rent.price,
          updateAt: rent.updateAt,
          link: rent.link,
        };
        if (!bucket[rent.id]) newRentCount++;
      });
      if (newRentCount) notify(`🔔 You have new ${newRentCount} rents`);

      setBucket(prev => ({ ...prev, ...rentsMap }));
      setLastUpdate(new Date());
    } catch (error) {
      notify(`🛑 ${error}`);
    }
  }, [crawlerFetch, targetUrl, bucket, setBucket, setLastUpdate]);

  useInterval(tick, intervalSec * 1000);

  return (
    <div className="App">
      <h3>⚠️ NEVER LOGIN ANY SITE IN THIS BROWSER!</h3>
      {window.Notification && Notification.permission !== 'granted' && (
        <button
          onClick={() => notify('✅ You haved enabled browser notification')}
        >
          {`🔔 Enable Chrome Notification`}
        </button>
      )}
      <br />
      <br />
      <div>
        {`It Fetches from `}
        <textarea
          value={targetUrl}
          onChange={e => setTargetUrl(e.target.value)}
        />
        <a href={targetUrl} target="_blank" rel="noopener noreferrer">
          {`🔗`}
        </a>
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
      <div>last update: {lastUpdate.toLocaleString()}</div>
      <br />
      <button onClick={() => tick()}>{`⬇️  fetch now`}</button>
      <ul>
        {Object.keys(bucket)
          .sort((a, b) => b - a)
          .map(id => bucket[id])
          .map(rent => {
            return (
              <li key={rent.id}>
                <span className="title">{`${rent.title} `}</span>
                <span className="price">{`💰 ${rent.price} `}</span>
                <span className="updateAt">{`⏱ ${rent.updateAt} `}</span>
                <a href={rent.link} target="_blank" rel="noopener noreferrer">
                  {`🔗 #${rent.id}`}
                </a>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
