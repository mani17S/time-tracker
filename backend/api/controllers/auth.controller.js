const db = require('../../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await db('users')
      .insert({
        name,
        email,
        password_hash: hashedPassword
      })
      .returning('*');

    // ADD DEFAULT TIMERS FOR NEW USER
    const defaultTimers = ['DSA', 'GYM', 'COLLEGE'];
    const timersToInsert = defaultTimers.map(timerName => ({
      name: timerName,
      user_id: user[0].id,
      duration_seconds: 0
    }));

    await db('timers').insert(timersToInsert);

    const { password_hash, ...safeUser } = user[0];
    res.status(201).json(safeUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await db('users')
      .where({ email })
      .first();

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // create token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1h" }
    );

    const { password_hash, ...safeUser } = user;

    res.json({
      user: safeUser,
      token
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};