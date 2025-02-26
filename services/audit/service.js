const AuditModel = require('./model');

const LoggingService = {
  async processLogs(logs) {
    if (!Array.isArray(logs)) {
      throw new Error('Invalid log format, expected an array.');
    }

    // Additional business logic (if needed)
    return await AuditModel.storeLog(logs);
  },
};

module.exports = LoggingService;
