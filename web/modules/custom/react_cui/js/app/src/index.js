import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

const Root = () => {
  return (
    <App subreddit="reactjs"/>
  )
}

render(<Root/>, document.querySelector('#main'));