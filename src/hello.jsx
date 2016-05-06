import React from 'react';
import ReactDOM from 'react-dom';

export const Hello = React.createClass({
  render() {
    return <div>Hello World</div>;
  }
});

ReactDOM.render(<Hello />, document.getElementById('app-container'));
