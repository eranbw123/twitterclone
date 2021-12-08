import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { TweetsComponent, TweetDetailComponent } from "./tweets";
import { MainNavbar } from "./home/navbar";
import { RegistrationForm, Login, UpdateProfile, Profile } from "./user";

const App = () => {
  return (
    <Router>
      <MainNavbar />
      <Routes>
        <Route exact path="/" element={<TweetsComponent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/profile" element={<UpdateProfile />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/tweet/:tweetId" element={<TweetDetailComponent />} />
      </Routes>
    </Router>
  );
};

export default App;
