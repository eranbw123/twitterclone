import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { TweetsComponent, TweetDetailComponent } from "./tweets";
import { MainNavbar } from "./home/navbar";
import { RegistrationForm } from "./user/register";

const App = () => {
  return (
    <Router>
      <MainNavbar />
      <Routes>
        <Route exact path="/" element={<TweetsComponent />} />
        <Route path="/tweets/:username" element={<TweetsComponent />} />
        <Route path="/tweet/:tweetId" element={<TweetDetailComponent />} />
        <Route path="/register" element={<RegistrationForm />} />
      </Routes>
    </Router>
  );
};

export default App;
