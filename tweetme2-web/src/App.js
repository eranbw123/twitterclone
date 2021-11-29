import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { TweetsComponent } from "./tweets";
import { Navbar } from "./home/navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<TweetsComponent />} />
        <Route path="/tweets/:username" element={<TweetsComponent />} />
      </Routes>
    </Router>
  );
};

export default App;
