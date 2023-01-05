import React, { useState } from 'react';

import './App.css';

function App() {
  const [Counter, SetCounter] = useState(0);
  const incHandeler = () => { SetCounter((count) => count + 1) }
  const decHandeler = () => { SetCounter((count) => count - 1) }
  return <div className='app' >
    <h1 > Counter App</h1>
    <div className='box' >
      <button onClick={incHandeler} >Increment</button>
      <h2 >{Counter} </h2>
      <button onClick={decHandeler}>Decrement</button>
    </div>
  </div>
}

export default App;
