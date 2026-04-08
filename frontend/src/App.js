import React, { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

const USERS = {};

function App() {
  const [user, setUser] = useState(null);

  const login = (email, pass) => {
    if (!USERS[email] || USERS[email].pass !== pass) return "Invalid email or password";
    setUser(USERS[email]);
    return null;
  };

  const register = (name, email, pass) => {
    if (USERS[email]) return "Account already exists";
    USERS[email] = {
      name,
      pass,
      timers: ["DSA", "GYM", "COLLEGE"].map((n, i) => ({ id: i+1, name: n, elapsed: 0 })),
      nextId: 4,
    };
    setUser(USERS[email]);
    return null;
  };

  return (
    <div style={{ background: "#0d1117", minHeight: "100vh", color: "white", fontFamily: "sans-serif", padding: "2rem", textAlign: "center" }}>
      <h1 style={{ marginBottom: "1.5rem" }}>⏱ Time Tracker</h1>
      {user
        ? <Dashboard user={user} onLogout={() => setUser(null)} />
        : <Login onLogin={login} onRegister={register} />
      }
    </div>
  );
}

export default App;