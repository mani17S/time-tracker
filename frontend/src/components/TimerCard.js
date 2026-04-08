import React, { useState, useEffect } from "react";

function TimerCard({ name, onDelete }) {
  const [secs, setSecs]       = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setSecs(s => s + 1), 1000);
    return () => clearInterval(t);
  }, [running]);

  const fmt = s =>
    [Math.floor(s / 3600), Math.floor((s % 3600) / 60), s % 60]
      .map(n => String(n).padStart(2, "0")).join(":");

  const btn = (label, color, hoverColor, onClick, icon) => (
    <button
      onClick={onClick}
      title={label}
      onMouseOver={e => e.currentTarget.style.background = hoverColor}
      onMouseOut={e  => e.currentTarget.style.background = color}
      style={{ width: 36, height: 36, background: color, border: "none", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {icon}
    </button>
  );

  return (
    <div style={{
      background: "#1a2130",
      borderRadius: "16px",
      padding: "1.5rem 1rem 1rem",
      width: "190px",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "12px",
      border: running ? "1px solid #10b981" : "1px solid #1e293b",
      transition: "border-color 0.3s"
    }}>

      <p style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "1.5px", color: "#94a3b8" }}>
        {name}
      </p>

      <h2 style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: "22px",
        letterSpacing: "2px",
        color: running ? "#10b981" : "white",
        transition: "color 0.3s"
      }}>
        {fmt(secs)}
      </h2>

      <div style={{ display: "flex", gap: "7px" }}>
        {btn(running ? "Pause" : "Play", running ? "#6b7280" : "#16a34a", running ? "#4b5563" : "#15803d", () => setRunning(!running),
          running
            ? <svg width="15" height="15" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
            : <svg width="15" height="15" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21"/></svg>
        )}
        {btn("Reset", "#2563eb", "#1d4ed8", () => { setRunning(false); setSecs(0); },
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
        )}
        {btn("Delete", "#dc2626", "#b91c1c", onDelete,
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        )}
      </div>

    </div>
  );
}

export default TimerCard;