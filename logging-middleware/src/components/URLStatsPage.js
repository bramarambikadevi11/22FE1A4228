import React from "react";
import { Link } from "react-router-dom";

function URLStatsPage({ urls }) {
  return (
    <div className="container">
      <h2>URL Shortener Statistics</h2>
      <Link to="/">Back to Shortener</Link>
      {urls.length === 0 ? (
        <p>No shortened URLs yet.</p>
      ) : (
        <table className="stats-table">
          <thead>
            <tr>
              <th>Short URL</th>
              <th>Original URL</th>
              <th>Created</th>
              <th>Expiry (min)</th>
              <th>Clicks</th>
              <th>Click Details</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((url) => (
              <tr key={url.shortcode}>
                <td><a href={url.shortUrl} target="_blank" rel="noopener noreferrer">{url.shortUrl}</a></td>
                <td>{url.originalUrl}</td>
                <td>{new Date(url.createdAt).toLocaleString()}</td>
                <td>{url.expiryInMinutes}</td>
                <td>{url.clicks.length}</td>
                <td>
                  <ul>
                    {url.clicks.map((click, idx) => (
                      <li key={idx}>
                        {new Date(click.timestamp).toLocaleString()} - {click.source} - {click.geo}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default URLStatsPage;
