import React from "react";
import "./App.css";
import { TweetsComponent } from "./tweets";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <TweetsComponent />
        </div>
      </header>
    </div>
  );
};

export default App;
