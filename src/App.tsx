import React from "react";
import "./App.css";
import { Card }  from './component/card-component';

function App() {
  return (
    <div className="App">
      <header role="heading" aria-level={1} className="App-header">
        <p>
          Emerson React Coding Challenge
        </p>
      </header>
      <div>
        <Card></Card>
        {
          /*
            Please add your custom component(s) here
          */
        }
      </div>
    </div>
  );
}

export default App;
