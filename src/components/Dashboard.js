import React, { useState, useEffect } from "react";
import TimerCard from "./TimerCard";

function Dashboard() {
  const [timers, setTimers] = useState(() => {
    const saved = localStorage.getItem("timers");
    return saved ? JSON.parse(saved) : ["DSA Study", "Gym"];
  });

  const [newTimer, setNewTimer] = useState("");

  useEffect(() => {
    localStorage.setItem("timers", JSON.stringify(timers));
  }, [timers]);

  
  const formatName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const addTimer = () => {
    const trimmed = newTimer.trim();

    if (
      trimmed !== "" &&
      !timers.some((t) => t.toLowerCase() === trimmed.toLowerCase())
    ) {
      setTimers([...timers, formatName(trimmed)]);
    }

    setNewTimer("");
  };

  const deleteTimer = (indexToDelete) => {
    const updated = timers.filter((_, index) => index !== indexToDelete);
    setTimers(updated);
  };

  return (
    <div style={styles.container}>
      <h2>My Timers</h2>

      {/* Simple Input */}
      <div style={styles.inputWrapper}>
        <input
          type="text"
          placeholder="Enter task name"
          value={newTimer}
          onChange={(e) => setNewTimer(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTimer()}
          style={styles.input}
        />

        <button style={styles.addBtn} onClick={addTimer}>
          Add
        </button>
      </div>

      {timers.length === 0 && <p>No timers yet. Add one!</p>}

      <div style={styles.grid}>
        {timers.map((t, index) => (
          <TimerCard
            key={index}
            name={t}
            onDelete={() => deleteTimer(index)}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
  },
  inputWrapper: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px 0 0 6px",
    border: "1px solid #ccc",
    outline: "none",
    width: "200px",
  },
  addBtn: {
    padding: "10px 15px",
    borderRadius: "0 6px 6px 0",
    border: "none",
    background: "#4CAF50",
    color: "white",
    cursor: "pointer",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
};

export default Dashboard;