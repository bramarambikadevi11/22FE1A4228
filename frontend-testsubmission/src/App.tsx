import { Link, NavLink, Route, Routes } from 'react-router-dom';
return (
<div className="container">
<header className="header">
<Link to="/" className="brand" style={{ textDecoration: 'none', color: 'white' }}>✂️ URL Shortener</Link>
<nav className="nav">
<NavLink to="/" className={({isActive}) => `link ${isActive ? 'active' : ''}`}>Shorten</NavLink>
<NavLink to="/stats" className={({isActive}) => `link ${isActive ? 'active' : ''}`}>Statistics</NavLink>
</nav>
</header>


<Routes>
<Route path="/" element={<ShortenForm />} />
<Route path="/stats" element={<StatsPage />} />
</Routes>


<footer style={{marginTop: 24, color: '#9ca3af', fontSize: 13}}>
Backend endpoints expected:
<code> POST /api/shorten</code>,
<code> GET /api/urls</code>,
<code> GET /api/urls/:code/stats</code> ·
Logging endpoint: <code>POST /api/logs</code>
</footer>
</div>
);
}


// ===============================
// src/main.tsx
// ===============================
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
<React.StrictMode>
<BrowserRouter>
<App />
</BrowserRouter>
</React.StrictMode>,
)