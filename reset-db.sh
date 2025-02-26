#!/bin/bash

# Script used for testing to drop and re-create the database using knex.
echo "Dropping and recreating the database..."
knex migrate:rollback --all
knex migrate:latest

echo "Database reset complete!"

sleep infinity