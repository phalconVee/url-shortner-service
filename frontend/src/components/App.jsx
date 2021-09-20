import React, { useState } from "react";
import ShortnerForm from "./ShortnerForm";
import api from "../services/api";
import "./App.css";

function App() {
  const [stats, setURLStat] = useState({});
  const [error, setError] = useState();

  const handleShortenURL = (longUrl) => {
    const newURL = { longUrl };
    setURLStat({ ...stats, newURL });

    api
      .shorten("/encode", newURL)
      .then((res) => {
        setURLStat(res.data.data);
      })
      .catch((err) => {
        console.lerror(err);
        setError("Could not shorten the URL!");
        setURLStat(stats);
      });
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
          <strong>Long URL:</strong> {stats?.longUrl || ""}
        </div>
        <div className="text">
          <strong>Indicina Short URL:</strong> {""}
          {Object.keys(stats).length > 0 ? (
            <span
              className="linked"
              onClick={() => (window.location.href = stats.shortUrl)}
            >
              {stats.shortUrl}
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="text">
          <strong>URL Code:</strong> {stats?.urlCode || ""}
        </div>
      </div>
    </div>
  );
}

export default App;
