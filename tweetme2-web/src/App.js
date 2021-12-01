import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { TweetsComponent, TweetDetailComponent } from "./tweets";
import { MainNavbar } from "./home/navbar";
import { RegistrationForm } from "./user/";
import { Login } from "./user";

const App = () => {
  return (
    <Router>
      <MainNavbar />
      <Routes>
        <Route exact path="/" element={<TweetsComponent />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tweets/:username" element={<TweetsComponent />} />
        <Route path="/tweet/:tweetId" element={<TweetDetailComponent />} />
      </Routes>
    </Router>
  );
};

export default App;
