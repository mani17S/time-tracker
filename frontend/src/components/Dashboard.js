import React, { useState, useEffect } from "react";
import TimerCard from "./TimerCard";
import { getTimers, createTimer, deleteTimer } from "../services/api";

function Dashboard({ user, onLogout }) {
  const [timers, setTimers] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const firstName = user.name?.split(" ")[0] || user.name;
  const initials = user.name?.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2) || "U";

  // Fetch timers from backend on load
  useEffect(() => {
    fetchTimers();
  }, []);

  const fetchTimers = async () => {
    try {
      setLoading(true);
      const response = await getTimers();
      setTimers(response.data);
    } catch (err) {
      console.error("Failed to fetch timers:", err);
      setError("Failed to load timers");
    } finally {
      setLoading(false);
    }
  };

  const addTimer = async () => {
  const name = input.trim().toUpperCase();
  
  // Add validation for empty input
  if (!name) {
    setError("Please enter a task name!");
    return;
  }
  
  if (timers.some(t => t.name === name)) {
    setError(`"${name}" already exists!`);
    return;
  }
  
  try {
    const response = await createTimer(name);
    setTimers([...timers, response.data]);
    setInput("");
    setError("");
  } catch (err) {
    setError(err.response?.data?.error || "Failed to create timer");
  }
};

  const handleDeleteTimer = async (id) => {
    try {
      await deleteTimer(id);
      setTimers(timers.filter(t => t.id !== id));
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete timer");
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        Loading timers...
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "960px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <span style={{ fontWeight: "700", fontSize: "1rem", color: "#64748b" }}>
          Hi, {firstName} 👋
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "#1e293b", padding: "6px 14px", borderRadius: "20px", fontSize: "13px" }}>
          <span style={{ background: "#2563eb", borderRadius: "50%", width: 28, height: 28, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: "700" }}>
            {initials}
          </span>
          <span>{user.name}</span>
          <button
            onClick={onLogout}
            style={{ background: "transparent", border: "1px solid #334155", color: "#94a3b8", padding: "4px 10px", borderRadius: "6px", cursor: "pointer", fontSize: "12px" }}
          >
            Logout
          </button>
        </div>
      </div>

      <p style={{ fontSize: "11px", letterSpacing: "2px", color: "#64748b", marginBottom: "1.5rem" }}>ACTIVITIES</p>

      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "0.5rem" }}>
        <input
          placeholder="New task name..."
          value={input}
          onChange={e => { setInput(e.target.value); setError(""); }}
          onKeyDown={e => e.key === "Enter" && addTimer()}
          style={{ padding: "10px 16px", borderRadius: "8px", border: `1px solid ${error ? "#f87171" : "#2d3748"}`, background: "#1e293b", color: "white", fontSize: "14px", width: "260px" }}
        />
        <button
          onClick={addTimer}
          style={{ background: "#3b82f6", border: "none", padding: "10px 20px", borderRadius: "8px", color: "white", fontWeight: "600", cursor: "pointer" }}
        >
          + Add Task
        </button>
      </div>

      {error && <p style={{ color: "#f87171", fontSize: "13px", marginBottom: "1rem" }}>{error}</p>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center", marginTop: "1.5rem" }}>
        {timers.map(t => (
          <TimerCard
            key={t.id}
            id={t.id}
            name={t.name}
            onDelete={() => handleDeleteTimer(t.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;