const db = require('../../db/index')
const bcrypt = require('bcrypt')
// Define the security constants for BCrypt
const SALT_ROUNDS = 10


// Description of various objects in this class

/**
 * @typedef {Object} CreateUserData
 * @property {string} email - The email of the user
 * @property {string} password - The password of the user
 * @property {string} name - The name of the user
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} email
 * @property {string} name
 */


class UserModel{
  /**
   * Create a new user in the database.
   * @param {CreateUserData} userData - The data of the user to innerText
   * @returns {Promise<User>} - The newly created user object
  */ 
  static async createUser(userData){
    try{
      const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS)
      const userDataWithHash = { 
        email: userData.email,
      name: userData.name,
      password_hash: hashedPassword
      }
      const [newUser] = await db('users').insert(userDataWithHash).returning(['id', 'email', 'name'])
      return newUser
    }catch(error){
      if(error.code === 'ER_DUP_ENTRY' || error.code === '23505'){
        throw new Error('Email already exists')
      }
      throw error
    }
  }

  /**
   * Compare the hash of the provided password with the stored hash.
   * @param {string} email - The email of the user to compare the password for
   * @param {string} password - The password to compare
   * @returns {Promise<boolean>} - True if the password matches, false otherwise
  */
  static async comparePassword(email, password){
    try{
      const user = await db('users').where({ email }).first()
      if(!user){
        throw new Error('User not found')
      }
      const isMatch = await bcrypt.compare(password, user.password_hash)
      return isMatch
    }catch(error){
      throw error
    }
  }

  /**
   * Get a user by their email.
   * @param {string} email - The email of the user to retrieve
   * @returns {Promise<User | null>} - The user object if found, or null if not found.
   *
   */ 
  static async getUserByEmail(email){
    try{
      const user = await db('users').where({ email }).first('id', 'email', 'name')
      return user || null
    }catch(error){
      throw error
    }
  }
}
module.exports = UserModel;
