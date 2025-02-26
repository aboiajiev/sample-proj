const timeLogModel = require('./model');
const logAudit = require('../../utils/auditLogger');
const { AuditActions } = require('../audit/auditActions');

const timeLogService = {
  async getAllTimeLogs() {
    return await timeLogModel.getAll();
  },

  async getTimeLogsByDate(date) {
    const logs = await timeLogModel.getByDate(date);

    if (logs.length === 0) {
      throw new Error(`No time logs found for date: ${date}`);
    }

    logAudit(AuditActions.ACCESS_DATA, logs);

    return logs;
  },
};

module.exports = timeLogService;
