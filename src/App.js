import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      showParagraph: false,
    };
  }
  render() {
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
