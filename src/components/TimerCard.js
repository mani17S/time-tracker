import React, { useState, useEffect } from "react";

function TimerCard({ name, onDelete }) {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (running) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [running]);

  const formatTime = () => {
    const hrs = String(Math.floor(time / 3600)).padStart(2, "0");
    const mins = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
    const secs = String(time % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };


  const handlePress = (e) => {
    e.currentTarget.style.transform = "scale(0.9)";
  };

  const handleRelease = (e) => {
    e.currentTarget.style.transform = "scale(1)";
  };

  return (
    <div
      style={{
        ...styles.card,
        boxShadow: running
          ? "0 0 15px rgba(76, 175, 80, 0.7)"
          : "0 4px 10px rgba(0,0,0,0.5)",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "scale(1.03)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.transform = "scale(1)")
      }
    >
      <h3 style={styles.title}>{name}</h3>
      <h2 style={styles.time}>{formatTime()}</h2>

      <div style={styles.buttons}>
        {/* ▶ Start */}
        <button
          style={styles.startBtn}
          onClick={() => setRunning(true)}
          disabled={running}
          onMouseDown={handlePress}
          onMouseUp={handleRelease}
        >
          ▶
        </button>

        {/* ⏸ Pause */}
        <button
          style={styles.pauseBtn}
          onClick={() => setRunning(false)}
          disabled={!running}
          onMouseDown={handlePress}
          onMouseUp={handleRelease}
        >
          ⏸
        </button>

        {/* 🔄 Reset */}
        <button
          style={styles.resetBtn}
          onClick={() => {
            setTime(0);
            setRunning(false);
          }}
          onMouseDown={handlePress}
          onMouseUp={handleRelease}
        >
          🔄
        </button>

        {/* ❌ Delete */}
        <button
          style={styles.deleteBtn}
          onClick={onDelete}
          onMouseDown={handlePress}
          onMouseUp={handleRelease}
        >
          ✖
        </button>
      </div>
    </div>
  );
}


const styles = {
  card: {
    background: "#1e1e2f",
    padding: "20px",
    margin: "15px",
    borderRadius: "12px",
    width: "200px",
    textAlign: "center",
    color: "white",
    transition: "0.3s",
  },
  title: {
    color: "#bbb",
  },
  time: {
    margin: "10px 0",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "10px",
  },
  startBtn: {
    background: "#4CAF50",
    border: "none",
    padding: "10px",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
    transition: "0.2s",
  },
  pauseBtn: {
    background: "#555",
    border: "none",
    padding: "10px",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
    transition: "0.2s",
  },
  resetBtn: {
    background: "#3b82f6",
    border: "none",
    padding: "10px",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
    transition: "0.2s",
  },
  deleteBtn: {
    background: "#ef4444",
    border: "none",
    padding: "10px",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
    transition: "0.2s",
  },
};

export default TimerCard;