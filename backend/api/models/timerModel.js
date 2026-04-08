const db = require('../../db/index');


/**
  * @typedef {Object} Timer
  * @property {string} id - The unique identifier of the timer
  * @property {string} user_id - The ID of the user who owns the timer
  * @property {string} name - The name of the timer
  * @property {number} duration_seconds - The duration of the timer in seconds
  */

/**
  * @typedef {Object} CreateTimerData
  * @property {string} user_id - The ID of the user who owns the timer
  * @property {string} name - The name of the timer
  */

class TimerModel{
  /**
   * Create a new timer in the database.
   * @param {CreateTimerData} timerData - The data of the timer to create
   * @returns {Promise<Timer>} - The newly created timer object
   */
  static async createTimer(timerData){
    try{
      const newTimer = await db('timers').insert(timerData).returning('*')
      return newTimer
    }catch(error){
      if(error.code === 'ER_DUP_ENTRY' || error.code === '23505'){
        throw new Error('Timer name already exists for this user')
      }
      throw error
    }
  }
  
  /**
   * Get all timers for a specific user.
   * @param {string} user_id - The ID of the user to get timers for
   * @returns {Promise<Timer[]>} - An array of timer objects for the user
   */
  static async getTimersByUserId(user_id){
    try{
      const timers = await db('timers').where({ user_id })
      return timers
    }catch(error){
      throw error
    }
  } 
}
module.exports = TimerModel;
