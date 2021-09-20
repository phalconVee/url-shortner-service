import React, { useState } from "react";
import ShortnerForm from "./ShortnerForm";
import api from "../services/api";
import "./App.css";

function App() {
  const [stats, setURLStat] = useState({});
  const [error, setError] = useState();

  const handleShortenURL = async (longUrl) => {
    try {
      const newURL = { longUrl };
      setURLStat([...stats, newURL]);

      const { data } = await api.shorten("/encode", newURL);

      setURLStat([...stats, data]);
    } catch (error) {
      console.log(JSON.stringify(error));
      setError("Could not shorten the URL!");
      setURLStat(stats);
    }
  };

  return (
    <div className="App">
      <h1 data-testid="title">Indicina URL Shortener</h1>

      <ShortnerForm onShortenURL={handleShortenURL} />
      {error && (
        <p role="alert" className="Error">
          {error}
        </p>
      )}

      <br />
      <div className="URLItem">
        <div className="text" data-testid="longURL">
          Long URL: {stats?.longUrl || ""}
        </div>
        <div className="text">Indicina Short URL: {stats?.shortUrl || ""}</div>
        <div className="text">URL Code: {stats?.urlCode || ""}</div>
      </div>

      {/* {Object.keys(stats).length > 0 && (
        <div className="URLItem">
          <div className="text" data-testid="longURL">
            Long URL: {stats.longUrl}
          </div>
          <div className="text">Indicina Short URL: {stats.shortUrl}</div>
          <div className="text">URL Code: {stats.urlCode}</div>
        </div>
      )} */}
    </div>
  );
}

export default App;
