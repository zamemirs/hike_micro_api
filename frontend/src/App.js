import React, { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error("API error:", err));
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      setIsLoggedIn(true);
    } else {
      alert("Please enter username and password");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Frontend App</h1>
      <p>Message from Backend: {message}</p>

      {!isLoggedIn ? (
        <form onSubmit={handleLogin} style={{ marginBottom: "20px" }}>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ margin: "5px" }}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ margin: "5px" }}
          />
          <br />
          <button type="submit">Login</button>
        </form>
      ) : (
        <div>
          <h2>Welcome, {username} 🎉</h2>
          <button onClick={handleLogout} style={{ margin: "5px" }}>
            Logout
          </button>

          <div style={{ margin: "20px 0" }}>
            <label>Select an option: </label>
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="">--Choose--</option>
              <option value="profile">Profile</option>
              <option value="settings">Settings</option>
              <option value="help">Help</option>
            </select>
            {selectedOption && <p>You selected: {selectedOption}</p>}
          </div>

          <div>
            <button style={{ margin: "5px" }}>Action 1</button>
            <button style={{ margin: "5px" }}>Action 2</button>
            <button style={{ margin: "5px" }}>Action 3</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
