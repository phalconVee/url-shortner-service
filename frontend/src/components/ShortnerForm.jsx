import React, { useState } from "react";
import Input from "./Input";

function ShortnerForm({ onShortenURL }) {
  const [longUrl, setLongURL] = useState("");

  const handleChange = (e) => setLongURL(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!longUrl) return;

    onShortenURL(longUrl);
    setLongURL("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        aria-label="Shorten URL"
        onChange={handleChange}
        placeholder="Add a URL to shorten ..."
        type="text"
        value={longUrl}
      />

      {/* <button type="submit" onClick={handleSubmit}>Shorten</button> */}
    </form>
  );
}

export default ShortnerForm;
