const { JSONRPCServer } = require('json-rpc-2.0');
const AuditModel = require('./model');

const server = new JSONRPCServer();

// Define JSON-RPC method
server.addMethod('logAction', async ({ action, data }) => {
  if (!action || !data) {
    throw new Error('Missing action or data parameters.');
  }

  try {
    return await AuditModel.storeLog(action, data);
  } catch (error) {
    console.error('Error storing log:', error);
    throw new Error('Failed to store audit log.');
  }
});

// JSON-RPC Endpoint Handler
const AuditController = async (req, res) => {
  try {
    const jsonRPCResponse = await server.receive(req.body);
    res.json(jsonRPCResponse);
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = AuditController;
