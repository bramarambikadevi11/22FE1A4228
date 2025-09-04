import React, { useState } from "react";

function URLShortenerForm({ onShorten, onError }) {
  const [original, setOriginal] = useState("");
  const [expiry, setExpiry] = useState(30);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!original) {
      onError("Original URL is required.");
      return;
    }
    // Example: Create a fake shortcode
    const shortcode = Math.random().toString(36).substr(2, 6);
    const newShort =
      window.location.origin + "/s/" + shortcode;

    // Simulate collision: If shortcode has "abc" then error
    if (shortcode.includes("abc")) {
      onError("Collision detected, please try again.");
      return;
    }

    onShorten({
      originalUrl: original,
      shortUrl: newShort,
      expiryMinutes: expiry,
      createdAt: new Date().toISOString(),
      clicks: [],
      shortcode,
    });

    setOriginal("");
    setExpiry(30);
  };

  return (
    <form className="shorten-form" onSubmit={handleSubmit}>
      <input
        type="url"
        required
        placeholder="Enter URL"
        value={original}
        onChange={e => setOriginal(e.target.value)}
      />
      <input
        type="number"
        min={1}
        placeholder="Expiry (min)"
        value={expiry}
        onChange={e => setExpiry(Number(e.target.value))}
      />
      <button type="submit">Shorten URL</button>
    </form>
  );
}

export default URLShortenerForm;
