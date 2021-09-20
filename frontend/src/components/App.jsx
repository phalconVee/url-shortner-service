import React, { useState } from "react";
import ShortnerForm from "./ShortnerForm";
import api from "../services/api";
import "./App.css";

function App() {
  const [stats, setURLStat] = useState([]);
  const [error, setError] = useState();

  //   const fetchURLStat = async (hash) => {
  //     try {
  //       const { data } = await api.get("/statistic/" + hash);
  //       setURLStat(data);
  //     } catch (error) {
  //       setError("Could not fetch the URL stat!");
  //     }
  //   };

  const handleShortenURL = async (longUrl) => {
    try {
      const newURL = { longUrl };
      setURLStat([...stats, newURL]);

      const { data } = await api.create("/encode", newURL);

      setURLStat([...stats, data]);
    } catch (error) {
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
    </div>
  );
}

export default App;
