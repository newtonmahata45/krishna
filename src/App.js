import React from 'react';
// import logo from './logo.svg';
import './App.css';
// import './style.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }



class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      showParagraph: false,
    };
  }
  render() {
    console.log(this.state.input);
    return (
      <div>
        <textarea
          value={this.state.input}
          onChange={(e) => this.setState({ input: e.target.value })}
        />
        <br />
        <button
          onClick={() => {
            this.setState({
              showParagraph: !this.state.showParagraph,
            });
          }}
        >
          Display in uppercase
        </button>
        {this.state.showParagraph && <p>{this.state.input.toUpperCase()}</p>}
      </div>
    );
  }
}

// import React, { useState } from "react";

export default App ;
