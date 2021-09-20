import * as React from 'react'; // import all to use type def from react
import { useState } from 'react';
import { render } from 'react-dom';

import './styles.css';

function App() {
  const [count, setCount] = useState<number>(5);
  // Test with type annotation
  const testRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <span>
        {count}
        <button onClick={() => setCount(c => c + 1)}>+1</button>
      </span>
      <div ref={testRef} />
    </div>
  );
}

const rootElement = document.getElementById('root');
render(<App />, rootElement);
