const { v4: uuidv4 } = require('uuid');
const { AuditActions } = require('../services/audit/auditActions'); // Import Enums

/**
 * Sends a JSON-RPC log request to the audit microservice
 * @param {string} action   Type of action being logged (must be from AuditActions enum)
 * @param {Object} data     Data to be logged
 */
async function logAudit(action, data) {
  // Validates if the action param provided is part of the AuditActions enum.
  if (!Object.values(AuditActions).includes(action)) {
    throw new Error(`Invalid audit action: ${action}`);
  }

  const postData = {
    jsonrpc: '2.0',
    method: 'logAction',
    params: { action, data },
    id: uuidv4(),
  };

  try {
    const response = await fetch('http://localhost:4000/json-rpc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    });

    const jsonResponse = await response.json();

    if (jsonResponse.error) {
      console.error('Audit Microservice Error:', jsonResponse.error);
    } else {
      console.log('Audit Log Stored:', jsonResponse.result);
    }
  } catch (error) {
    console.error('Audit Logging Failed:', error);
  }
}

module.exports = logAudit;
