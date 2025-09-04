import React, { useState } from "react";
import URLShortenerForm from "./components/URLShortenerForm";
import URLStatsList from "./components/URLStatsList";
import "./App.css";

function App() {
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState("");

  // Handler to add new shortened URL
  const handleShorten = (shortened) => {
    setUrls((prev) => [shortened, ...prev].slice(0, 5));
    setError("");
  };

  // Handler for errors
  const handleError = (msg) => setError(msg);

  return (
    <div className="container">
      <h1>React URL Shortener</h1>
      {error && <div className="error">{error}</div>}
      <URLShortenerForm onShorten={handleShorten} onError={handleError} />
      <URLStatsList urls={urls} />
    </div>
  );
}

export default App;
