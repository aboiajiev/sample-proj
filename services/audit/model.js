const db = require('../../db/database');

const AuditModel = {
  async storeLog(action, data) {
    try {
      await db('AuditLog').insert({
        action,
        data: JSON.stringify(data),
      });
      return { success: true };
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to insert log.');
    }
  },
};

module.exports = AuditModel;
