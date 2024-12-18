# Alerting System for Monitoring Failed POST Requests


---

## Overview
This project is a Node.js and Express-based application designed to monitor and store failed API requests and send e-mail alerts for excessive failed requests from a single IP
---

## Features

---

## Tech Stack
- **Node.js** for server-side scripting.
- **Express** for building RESTful APIs.
- **MongoDB** for database storage.
- **Nodemailer** for sending email alerts.

---

## Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/ichbinprashant/alert-system-monitoring.git
   cd alert-system-monitoring
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
4. **Generate Auth Token**
    Since the authentication is JWT based, to interact with the authenticated endpoints, you need a valid token. Use the `jwtService.js` utility to generate a token. Run generateToken.js and copy the token to put into header. 
    ```bash
    node generateToken.js
    ```
    
3. **Setup Environment Variables**
   Create a `.env` file in the root directory and configure the following:
   ```env
   PORT=3000
   MONGODB_URI=< MongoDB connection string>
   SMTP_EMAIL=<Your email address>
   SMTP_PASSWORD=<Your email password>
   ALERT_THRESHOLD=5
   ALERT_TIME_WINDOW=10  # in minutes
   ```

4. **Start the Application**
   ```bash
   npm start
   ```
   The server will run at `http://localhost:3000` by default.

---


### Monitor Failed Requests
The API monitors failed requests to `/api/submit`. 

- **Endpoint**: `POST /api/submit`
- **Headers**:
  - `Authorization: <JWT Token>`
- **Sample Payload**:
  ```json
  {
      "data": "example"
  }
  ```
- **Behavior**:
  - If the token is invalid or missing, the request logs an entry to the database (`FailedRequest` collection).
  - Alerts are sent via email when an IP exceeds the failed request threshold within the time window defined in `.env`.

---

### View Metrics

This feature fetches all logged failed requests.

- **Endpoint**: `GET /api/metrics`

## Scaling the System

To scale the application for production environments:

1. **Database Optimization:**
   - MongoDB makes it fairly easy to scale horizontally since it's design offers sharding and replication. And it also provides flexibility to work with semi-structured data.

2. **Distributed Deployment:**
   - Use containerization tools like Docker for deployment consistency.

3. **Redis Integration:**
   - Use Redis for caching failed request data instead of an in-memory object.
     - This allows the system to handle higher traffic and distribute load across multiple servers.
     




