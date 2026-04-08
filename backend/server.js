const cors = require('cors');
const express = require("express");
const db = require("./db");

const app = express();
app.use(cors());

app.use(express.json());

// Test route
app.get("/test-db", async (req, res) => {
  try {
    const result = await db("users").select("*");
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

const authRoutes = require('./api/routes/auth.routes');

app.use('/auth', authRoutes);

const timerRoutes = require('./api/routes/timer.routes');

app.use('/timers', timerRoutes);