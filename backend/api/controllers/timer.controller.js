const db = require('../../db');

exports.createTimer = async (req, res) => {
  try {
    const { name } = req.body;

    const timer = await db('timers')
      .insert({
        name,
        user_id: req.user.userId,
        duration_seconds: 0
      })
      .returning('*');

    res.json(timer[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.startTimer = async (req, res) => {
  try {
    const { id } = req.params;

    const session = await db('sessions')
      .insert({
        user_id: req.user.userId,
        timer_id: id,
        start_time: new Date()
      })
      .returning('*');

    res.json(session[0]);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.pauseTimer = async (req, res) => {
  try {
    const { id } = req.params;

    // get latest active session
    const session = await db('sessions')
      .where({ timer_id: id, user_id: req.user.userId })
      .whereNull('end_time')
      .orderBy('start_time', 'desc')
      .first();

    if (!session) {
      return res.status(400).json({ error: "No active session" });
    }

    const endTime = new Date();
    const duration = Math.floor(
      (endTime - new Date(session.start_time)) / 1000
    );

    const updated = await db('sessions')
      .where({ id: session.id })
      .update({
        end_time: endTime,
        duration_seconds: duration
      })
      .returning('*');

    res.json(updated[0]);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.deleteTimer = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if timer exists and belongs to user
    const timer = await db('timers')
      .where({ 
        id: id, 
        user_id: req.user.userId 
      })
      .first();

    if (!timer) {
      return res.status(404).json({ error: "Timer not found" });
    }

    // Delete all sessions for this timer first
    await db('sessions')
      .where({ timer_id: id })
      .del();

    // Delete the timer
    await db('timers')
      .where({ id: id })
      .del();

    res.json({ message: "Timer deleted successfully" });
  } catch (err) {
    console.error('Error deleting timer:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.resetTimer = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if timer exists and belongs to user
    const timer = await db('timers')
      .where({ 
        id: id, 
        user_id: req.user.userId 
      })
      .first();

    if (!timer) {
      return res.status(404).json({ error: "Timer not found" });
    }

    // If timer is currently running, stop it first
    const activeSession = await db('sessions')
      .where({ timer_id: id, user_id: req.user.userId })
      .whereNull('end_time')
      .first();

    if (activeSession) {
      // Pause the running timer
      const endTime = new Date();
      const duration = Math.floor(
        (endTime - new Date(activeSession.start_time)) / 1000
      );

      await db('sessions')
        .where({ id: activeSession.id })
        .update({
          end_time: endTime,
          duration_seconds: duration
        });
    }

    // Delete all sessions for this timer (resets total time to 0)
    await db('sessions')
      .where({ timer_id: id, user_id: req.user.userId })
      .del();

    // Reset duration_seconds in timers table
    await db('timers')
      .where({ id: id })
      .update({ duration_seconds: 0 });

    res.json({ message: "Timer reset successfully" });
  } catch (err) {
    console.error('Error resetting timer:', err);
    res.status(500).json({ error: err.message });
  }
};
exports.getTotalTime = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db('sessions')
      .where({ timer_id: id, user_id: req.user.userId })
      .sum('duration_seconds as total');

    const totalSeconds = result[0].total || 0;

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    res.json({
      total_seconds: totalSeconds,
      formatted: `${hours}h ${minutes}m ${secs}s`
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTodayTime = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db('sessions')
      .where({ timer_id: id, user_id: req.user.userId })
      .whereRaw('DATE(start_time) = CURRENT_DATE')
      .sum('duration_seconds as total');

    res.json({
      today_seconds: result[0].total || 0
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getWeeklyTime = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db('sessions')
      .where({ timer_id: id, user_id: req.user.userId })
      .whereRaw("start_time >= NOW() - INTERVAL '7 days'")
      .sum('duration_seconds as total');

    res.json({
      weekly_seconds: result[0].total || 0
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getUserTimers = async (req, res) => {
  try {
    const timers = await db('timers')
      .where({ user_id: req.user.userId })
      .select('*')
      .orderBy('created_at', 'desc');
    
    // Always return an array, even if empty
    res.json(timers || []);
  } catch (err) {
    console.error('Error fetching timers:', err);
    res.status(500).json({ error: err.message });
  }
};