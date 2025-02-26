const userModel = require('./model');

async function getAllUsers() {
  return await userModel.getAll();
}

module.exports = { getAllUsers };
