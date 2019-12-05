import React, { PropTypes } from 'react';

const App = ({ isMobile }) => {
  return (
    <div>
      <h1>hello world {isMobile ? 'mobile' : 'desktop'}</h1>
    </div>
  );
};

App.propTypes = {
  isMobile: PropTypes.bool.isRequired,
};

export default App;
