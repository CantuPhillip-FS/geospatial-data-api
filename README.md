# Geospatial Data API – Sunrise/Sunset

> **Full Sail University – Web Development Degree**  
> **Student:** Phillip Cantu  
> **ID:** 0005394162  
> **Email:** <pvcantu@student.fullsail.edu>

## 📌 Project Overview

This project is a **Node.js** + **TypeScript**, **Express.js**, and **MongoDB + Mongoose** application that integrates with the **[Sunrise‑Sunset Geospatial API](https://sunrise-sunset.org/api)** to fetch solar timing data (sunrise, sunset, etc.) for a given latitude and longitude. The application stores this data in a **MongoDB** database and exposes **RESTful** endpoints for **fetching**, **filtering**, **sorting**, **retrieving** records by ID, and **creating** new data.

This was built for **Full Sail University – Server-Side Languages** (Assignment 3.3).

## 🚀 Features

- Fetch geospatial solar data via the public Sunrise–Sunset API
- Save fetched data into MongoDB via POST with Body
- Prevent duplicate entries using lat/lng matching
- Retrieve all stored data
- Retrieve filtered data using:
  - `select` (specify fields)
  - `sort` (sort results)
- Retrieve a specific entry by MongoDB ObjectId
- Fully typed with TypeScript
- Includes error handling and validation
- Uses Mongoose for MongoDB schema and model
- Automatically constructs the exact API request URL used to fetch the data

## 📁 Project Structure

```text
app/
 ├── api/
 │    └── sunrise-sunset-api.ts
 ├── controller/
 │    └── sunController.ts
 ├── db/
 │    └── config.ts
 ├── models/
 │    └── Sun.ts
 ├── routes/
 │    ├── sunRoutes.ts
 │    └── index.ts
 ├── utils/
 │    ├── checkExistingData.ts
 │    └── createUrl.ts
 ├── index.ts
server.ts
tsconfig.json
package.json
package-lock.json
README.md
.gitignore
.env
```

## 🛰️ Geospatial API Used

### **Sunrise–Sunset API (No API key required)**

Documentation: <https://sunrise-sunset.org/api>

Example Request:

```text
<https://api.sunrise-sunset.org/json?lat=35.68&lng=139.75>
```

## 🔧 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/CantuPhillip-FS/geospatial-data-api.git
cd geospatial-data-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Update environment variable file

Update, if needed, the `.env` file:

```text
PORT=5001
MONGODB_URI=mongodb://127.0.0.1:27017/geospatial
SUNSET_RISE_URL=https://api.sunrise-sunset.org/json?
```

### 4. Start the development server

```bash
npm run dev
```

Unless `.env` edited, Server runs on:

```text
http://localhost:5001
```

## 📌 Endpoints

### **1. GET – Fetch data using query params (lat, lng)**

Fetch live data _without saving it_:

```js
GET /api/v1/geo-data?lat=14.56&lng=-90.73
```

### **2. GET – Retrieve all stored data**

```js
GET / api / v1 / geo - data;
```

### Optional Query Parameters

| Query    | Example                                  | Description          |
| -------- | ---------------------------------------- | -------------------- |
| `select` | `/api/v1/geo-data?select=sunrise,sunset` | Pick specific fields |
| `sort`   | `/api/v1/geo-data?sort=latitude`         | Sort by field        |

---

### **3. POST – Create and save new document**

```js
POST / api / v1 / geo - data;
```

Example body:

```json
{
  "sunrise": "9:15:07 PM",
  "sunset": "7:38:54 AM",
  "latitude": "35.526",
  "longitude": "139.31"
}
```

### **4. GET – Retrieve by MongoDB ObjectId**

```js
GET /api/v1/geo-data/:id
```

## 🧩 Mongoose Schema (Sun Model)

The schema validates:

- Sunrise time (regex validated HH:MM:SS AM/PM) **required**
- Sunset time (regex validated HH:MM:SS AM/PM) **required**
- Latitude & longitude **required**
- The exact API request URL used _self-constucted by app_

Timestamps (`createdAt`, `updatedAt`) enabled.

## 🛡 Error Handling

The API handles:

- Invalid/missing lat & lng
- Invalid ObjectId format
- Duplicate requests (lat/lng combo already exists)
- Failed API fetches
- Database errors

## 🧪 Testing

Tested using **Postman** with successful results for:

- GET all documents
- GET using lat/lng fetch logic
- POST new document
- GET by ID
- Select filtering
- Sort filtering
  _pm.\* APIs tests have not been created_

## 📄 Notes

- No API key is required for Sunrise–Sunset API
- Rate limiting not implemented (optional)
- Fully commented for clarity

## 🎓 Full Sail Requirement Checklist

✔ API Integration  
✔ Fetch implementation  
✔ MongoDB + Mongoose schema  
✔ Required REST endpoints  
✔ Error handling  
✔ Query filtering support  
✔ Code organization into controller/routes/model/config  
✔ Fully commented  
✔ README file
