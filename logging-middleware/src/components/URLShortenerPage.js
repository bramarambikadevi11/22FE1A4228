import React, { useState } from "react";
import { Link } from "react-router-dom";

function URLShortenerPage({ token, urls, setUrls }) {
  const [original, setOriginal] = useState("");
  const [expiry, setExpiry] = useState(30);
  const [customShortcode, setCustomShortcode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Validate custom shortcode
  const validateShortcode = (code) => /^[a-zA-Z0-9]{3,15}$/.test(code);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!original) {
      setError("Original URL is required");
      return;
    }
    if (customShortcode && !validateShortcode(customShortcode)) {
      setError("Custom shortcode must be alphanumeric and 3-15 chars");
      return;
    }
    if (urls.length >= 5) {
      setError("Maximum of 5 concurrent shortened URLs allowed");
      return;
    }

    setLoading(true);
    try {
      const body = {
        originalUrl: original,
        expiryInMinutes: expiry > 0 ? expiry : 30
      };
      if (customShortcode.trim() !== "") {
        body.customShortcode = customShortcode.trim();
      }
      const response = await fetch("http://20.244.56.144/evaluation-service/shorten", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Failed to shorten URL");
        setLoading(false);
        return;
      }

      // Add new short URL to the list
      setUrls((prev) => {
        const updated = [data, ...prev].slice(0, 5);
        sessionStorage.setItem("urls", JSON.stringify(updated));
        return updated;
      });
      setOriginal("");
      setExpiry(30);
      setCustomShortcode("");
    } catch {
      setError("Network or server error");
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h2>URL Shortener</h2>
      <Link to="/stats">View Statistics</Link>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit} className="shorten-form">
        <input type="url" placeholder="Original URL" value={original} onChange={e => setOriginal(e.target.value)} required />
        <input type="number" min="1" placeholder="Expiry time (min)" value={expiry} onChange={e => setExpiry(Number(e.target.value))} />
        <input type="text" placeholder="Custom shortcode (optional)" value={customShortcode} onChange={e => setCustomShortcode(e.target.value)} />
        <button type="submit" disabled={loading}>{loading ? "Shortening..." : "Shorten URL"}</button>
      </form>

      <h3>Shortened URLs</h3>
      <ul>
        {urls.map((url) => (
          <li key={url.shortcode}>
            <a href={url.shortUrl} target="_blank" rel="noopener noreferrer">{url.shortUrl}</a> - expires in {url.expiryInMinutes} min
          </li>
        ))}
      </ul>
    </div>
  );
}

export default URLShortenerPage;
