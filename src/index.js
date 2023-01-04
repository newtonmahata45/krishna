
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import UserfromData from './userForm/userform';



const CurrentTime = () => {
  return (<h4>The Current Time is {new Date().toString().slice(0, 24, "Newton")} </h4>
  )
};
const root = ReactDOM.createRoot(document.getElementById('root'));
setInterval(() => {
  root.render(
    <React.StrictMode>
      <CurrentTime />
     <UserfromData/>
    </React.StrictMode>
  )
}, 1000);