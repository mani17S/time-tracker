import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div style={styles.app}>
      <h1>⏱ Time-Tracker</h1>
      <Dashboard />
    </div>
  );
}

const styles = {
  app: {
    background: "#121212",
    minHeight: "100vh",
    color: "white",
    padding: "20px",
    textAlign: "center",
  },
};

export default App;