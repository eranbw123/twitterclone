import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { TweetsComponent } from "./tweets";

const App = () => {
  return (
    <Router>
      <h1>test</h1>
      <Routes>
        <Route exact path="/" element={<TweetsComponent />} />
        <Route path="/about" element={<TweetsComponent />} />
      </Routes>
    </Router>
  );
};

export default App;
