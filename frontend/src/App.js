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
    <div style={styles.container}>
      <h1 style={styles.title}>🚀 Frontend App</h1>
      <p style={styles.message}>Message from Backend: {message}</p>

      {!isLoggedIn ? (
        <form onSubmit={handleLogin} style={styles.card}>
          <h2 style={styles.subtitle}>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.buttonPrimary}>
            Login
          </button>
        </form>
      ) : (
        <div style={styles.card}>
          <h2 style={styles.subtitle}>Welcome, {username} 🎉</h2>
          <button onClick={handleLogout} style={styles.buttonDanger}>
            Logout
          </button>

          <div style={{ margin: "20px 0" }}>
            <label style={styles.label}>Select an option: </label>
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              style={styles.dropdown}
            >
              <option value="">--Choose--</option>
              <option value="profile">Profile</option>
              <option value="settings">Settings</option>
              <option value="help">Help</option>
            </select>
            {selectedOption && (
              <p style={styles.selection}>✅ You selected: {selectedOption}</p>
            )}
          </div>

          <div style={styles.actions}>
            <button style={styles.buttonSecondary}>Action 1</button>
            <button style={styles.buttonSecondary}>Action 2</button>
            <button style={styles.buttonSecondary}>Action 3</button>
          </div>
        </div>
      )}
    </div>
  );
}

// Simple styled components
const styles = {
  container: {
    padding: "30px",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f4f7fa",
    minHeight: "100vh",
  },
  title: {
    textAlign: "center",
    color: "#2c3e50",
  },
  subtitle: {
    marginBottom: "15px",
    color: "#34495e",
  },
  message: {
    textAlign: "center",
    color: "#7f8c8d",
  },
  card: {
    maxWidth: "400px",
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  input: {
    display: "block",
    width: "90%",
    margin: "10px auto",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  buttonPrimary: {
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  buttonSecondary: {
    backgroundColor: "#2ecc71",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "5px",
  },
  buttonDanger: {
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "10px 0",
  },
  dropdown: {
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginLeft: "10px",
  },
  label: {
    fontWeight: "bold",
    color: "#2c3e50",
  },
  selection: {
    marginTop: "10px",
    color: "#27ae60",
  },
  actions: {
    marginTop: "15px",
  },
};

export default App;
