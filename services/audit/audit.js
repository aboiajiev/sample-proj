const express = require('express');
const AuditController = require('./controller');

const app = express();

// Increase payload size limit
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Use the controller for JSON-RPC requests
app.post('/json-rpc', AuditController);

const PORT = 4000;
app.listen(PORT, () => console.log(`Audit Logger running on port ${PORT}`));
