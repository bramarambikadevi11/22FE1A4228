import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function RedirectHandler({ urls, setUrls }) {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const urlEntry = urls.find((url) => url.shortcode === shortcode);
    if (!urlEntry) {
      alert("Short URL not found.");
      navigate("/", { replace: true });
      return;
    }

    // Check for expiry
    const createdTime = new Date(urlEntry.createdAt).getTime();
    const expiryMs = urlEntry.expiryInMinutes * 60000;
    if (Date.now() > createdTime + expiryMs) {
      alert("This short URL has expired.");
      navigate("/", { replace: true });
      return;
    }

    // Register click
    const newClick = {
      timestamp: new Date().toISOString(),
      source: document.referrer || "direct",
      geo: "unknown" // Geo IP enhancement can be added later
    };

    const updatedUrls = urls.map((url) => {
      if (url.shortcode === shortcode) {
        return { ...url, clicks: [...url.clicks, newClick] };
      }
      return url;
    });

    setUrls(updatedUrls);

    // Redirect to original URL
    window.location.href = urlEntry.originalUrl;
  }, [shortcode, urls, setUrls, navigate]);

  return <div>Redirecting...</div>;
}

export default RedirectHandler;
