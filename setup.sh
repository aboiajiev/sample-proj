#!/bin/bash

# Exit immediately if a command fails
set -e

echo "Setting up the project..."

# Install dependencies
echo "Installing Node.js dependencies..."
npm install

# Run database migrations
echo "Running database migrations..."
npx knex migrate:latest

echo "Project setup complete!"

# Keep script running for debugging
sleep infinity
