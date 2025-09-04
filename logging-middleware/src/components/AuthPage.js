import React, { useState } from "react";

function AuthPage({ setToken }) {
  const [form, setForm] = useState({
    email: "",
    name: "",
    rollNo: "",
    accessCode: "",
    clientID: "",
    clientSecret: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://20.244.56.144/evaluation-service/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (!res.ok) {
        throw new Error("Authentication failed");
      }
      const data = await res.json();
      setToken(data.access_token);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h2>Login to URL Shortener App</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit} className="auth-form">
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input type="text" name="rollNo" placeholder="Roll No" value={form.rollNo} onChange={handleChange} required />
        <input type="text" name="accessCode" placeholder="Access Code" value={form.accessCode} onChange={handleChange} required />
        <input type="text" name="clientID" placeholder="Client ID" value={form.clientID} onChange={handleChange} required />
        <input type="password" name="clientSecret" placeholder="Client Secret" value={form.clientSecret} onChange={handleChange} required />
        <button type="submit">Authenticate</button>
      </form>
    </div>
  );
}

export default AuthPage;
