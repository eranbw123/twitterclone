import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

const loadTweets = (tweetsElement) => {
  const xhr = new XMLHttpRequest();
  const method = "GET";
  const url = "api/tweets";
  const responseType = "json";
  xhr.responseType = responseType;
  xhr.open(method, url);
  xhr.onload = () => {
    const serverResponse = xhr.response;
    const listedItems = serverResponse;
    var finalTweetStr = "";
    var i;
    for (i = 0; i < listedItems.length; i++) {
      var tweetObj = listedItems[i];
      finalTweetStr += formatTweetElement(tweetObj);
    }
    tweetsElement.innerHTML = finalTweetStr;
  };
  xhr.send();
};

const App = () => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const tweetItems = [{ content: "test" }, { content: "hello world" }];
    setTweets(tweetItems);
  }, []);

  console.log(tweets);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>
          {tweets.map((tweet, index) => {
            return <li>{tweet.content}</li>;
          })}
        </p>
      </header>
    </div>
  );
};

export default App;
