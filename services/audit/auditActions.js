// Creates immutable object representing Enum used to define the Audit actions.
const AuditActions = Object.freeze({
  USER_LOGIN: 'USER_LOGIN',
  USER_LOGOUT: 'USER_LOGOUT',
  CREATE_RECORD: 'CREATE_RECORD',
  UPDATE_RECORD: 'UPDATE_RECORD',
  DELETE_RECORD: 'DELETE_RECORD',
  ACCESS_DATA: 'ACCESS_DATA',
});

module.exports = { AuditActions };
