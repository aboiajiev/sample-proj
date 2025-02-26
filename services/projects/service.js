const projectModel = require('./model');

async function getAllProjects() {
  return await projectModel.getAll();
}

module.exports = { getAllProjects };
