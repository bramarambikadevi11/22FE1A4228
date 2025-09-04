import React from "react";

function URLStatsList({ urls }) {
  if (urls.length === 0) return <p>No shortened URLs yet.</p>;
  return (
    <div>
      <h2>Shortened URLs</h2>
      <table className="stats-table">
        <thead>
          <tr>
            <th>Short URL</th>
            <th>Original URL</th>
            <th>Created</th>
            <th>Expires (min)</th>
            <th>Clicks</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url, idx) => (
            <tr key={idx}>
              <td>
                <a href={url.shortUrl} target="_blank" rel="noopener noreferrer">
                  {url.shortUrl}
                </a>
              </td>
              <td>{url.originalUrl}</td>
              <td>{new Date(url.createdAt).toLocaleString()}</td>
              <td>{url.expiryMinutes}</td>
              <td>{url.clicks.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default URLStatsList;
