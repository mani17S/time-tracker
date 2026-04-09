import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { login as apiLogin, register as apiRegister } from "./services/api";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Check for existing session on load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      const response = await apiLogin({ email, password });
      const { user, token } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      return null;
    } catch (err) {
      return err.response?.data?.error || "Login failed";
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (name, email, password) => {
    setLoading(true);
    try {
      // Register user
      await apiRegister({ name, email, password });
      
      // Auto login after registration
      const loginResponse = await apiLogin({ email, password });
      const { user, token } = loginResponse.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      return null;
    } catch (err) {
      return err.response?.data?.error || "Registration failed";
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  if (loading) {
    return (
      <div style={{ background: "#0d1117", minHeight: "100vh", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{ background: "#0d1117", minHeight: "100vh", color: "white", fontFamily: "sans-serif", padding: "2rem", textAlign: "center" }}>
      <h1 style={{ marginBottom: "1.5rem" }}>⏱ Time Tracker</h1>
      {user
        ? <Dashboard user={user} onLogout={handleLogout} />
        : <Login onLogin={handleLogin} onRegister={handleRegister} />
      }
    </div>
  );
}

export default App;