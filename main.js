const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const knex = require('./db/database');
const seedData = require('./db/seeds/seed_data');

const app = express();
app.use(bodyParser.json());

// Middleware for logging requests
app.use((req, res, next) => {
  console.log(`[Main] ${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

// Dynamically load all controllers from services folder
const servicesPath = path.join(__dirname, 'services');

fs.readdirSync(servicesPath).forEach((service) => {
  const controllerPath = path.join(servicesPath, service, 'controller.js');

  if (fs.existsSync(controllerPath)) {
    const controller = require(controllerPath);
    app.use(`/${service}`, controller);
    console.log(`Loaded routes for: /${service}`);
  }
});

// Seed database before starting the API
(async () => {
  try {
    console.log('Running seed script...');
    await seedData(knex);
    console.log('Seeding completed.');

    const MAIN_PORT = 3000;
    app.listen(MAIN_PORT, () => {
      console.log(`Main service running on port ${MAIN_PORT}`);
    });
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
})();
