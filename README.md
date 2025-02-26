# Sample Project Documentation

## Overview
This project is a microservice-based application that manages users, projects, and time logs. It includes an audit logging service to track user interactions via JSON-RPC.

## Setup Instructions
### 1. Install Dependencies & Setup Database
Run the `setup.sh` script to:
- Install dependencies (`npm install`)
- Run database migrations (`knex migrate:latest`)
- Seed the database (`knex seed:run`)
- Start the microservices (`main.js` & `audit.js`)

```sh
chmod +x setup.sh
./setup.sh
```

## Database
### Migrations
The project uses Knex.js for database schema management. Run migrations manually with:
```sh
npx knex migrate:latest
```
To rollback a migration:
```sh
npx knex migrate:rollback
```

### Seeding the Database
The seed script populates the database with sample data.
Run:
```sh
npx knex seed:run
```

## APIs
This project exposes RESTful APIs for Users, Projects, and Time Logs.

### Endpoints:
#### User API
- `GET /users` - Fetch all users

#### Project API
- `GET /projects` - Fetch all projects

#### Time Log API
- `GET /timelogs` - Fetch all time logs
- `GET /timelogs/by-date?date=YYYY-MM-DD` - Fetch time logs for a specific date and audit logs the result

## Audit Logging
The audit logging microservice captures and stores all relevant actions.
- Uses JSON-RPC for logging actions.
- Logs include user activity, data access, and modifications.

### Audit Logging API (JSON-RPC)
#### Endpoint:
```sh
POST http://localhost:4000/json-rpc
```
#### Request Format:
```json
{
  "jsonrpc": "2.0",
  "method": "logAction",
  "params": { "action": "ACCESS_DATA", "data": { "userId": 123, "resource": "TimeLog" } },
  "id": "unique-id"
}
```
