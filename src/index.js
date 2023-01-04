import React from 'react'
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

const CurrentTime = () => {
  return (<h4>The Current Time is {new Date().toString().slice(0, 24, "Newton")} </h4>
  )
};

setInterval(() => {
  root.render(
    <React.StrictMode>
      <CurrentTime />
      <div >Newton </div>
      <h2> Hare Krishna </h2>
      <App />
    </React.StrictMode>
  )
}, 1000)
