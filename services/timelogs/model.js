const db = require('../../db/database');

const timeLogModel = {
  // Fetch all timelogs
  async getAll() {
    return await db('TimeLog')
      .join('User', 'TimeLog.user_id', 'User.idUser')
      .join('Project', 'TimeLog.project_id', 'Project.idProject')
      .select(
        'User.idUser as userId',
        'User.firstName',
        'User.lastName',
        'User.email',
        'Project.idProject as projectId',
        'Project.name as projectName',
        'TimeLog.date',
        'TimeLog.hours'
      );
  },

  // Fetch timelogs based on a date parameter
  async getByDate(date) {
    const formattedDate = new Date(date).toISOString().split('T')[0];

    return await db('TimeLog')
      .join('User', 'TimeLog.user_id', 'User.idUser')
      .join('Project', 'TimeLog.project_id', 'Project.idProject')
      .select(
        'User.idUser as userId',
        'User.firstName',
        'User.lastName',
        'User.email',
        'Project.idProject as projectId',
        'Project.name as projectName',
        'TimeLog.date',
        'TimeLog.hours'
      )
      .where('TimeLog.date', '<', formattedDate);
  },
};

module.exports = timeLogModel;
