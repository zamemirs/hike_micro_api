import React, { useState, useEffect } from "react";

function App() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });

  useEffect(() => {
    fetch("http://localhost:5000/customers")
      .then(res => res.json())
      .then(data => setCustomers(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    }).then(() => window.location.reload());
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🎥 Video + Customers App</h1>

      <video width="400" controls>
        <source src="sample.mp4" type="video/mp4" />
        Your browser does not support video.
      </video>

      <h2>Add Customer</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
        <button type="submit">Add</button>
      </form>

      <h2>Customer List</h2>
      <ul>
        {customers.map(c => (
          <li key={c.id}>{c.name} ({c.email})</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
