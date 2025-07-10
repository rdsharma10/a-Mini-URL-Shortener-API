# 🚀 Mini URL Shortener API

A simple and efficient URL shortening service built with **Node.js**, **Express**, and **MongoDB**. This API allows users to create short links for long URLs and track click statistics in real-time.

---

## ✅ Features

- 🔗 Create short URLs with unique 6-character codes  
- 🎯 Redirect to original URL with click tracking  
- 🔒 Rate limiting: 100 requests per 15 minutes  
- 🧹 URL validation and sanitization  
- 🧠 RESTful API design  
- 📊 Click count tracking  
- 🌐 CORS enabled  
- 🧯 Comprehensive error handling  
- 🗃️ MongoDB integration using Mongoose

---

## 📌 API Endpoints

### 📍 Create Short URL

**POST** `/shorten`  
**Headers**: `Content-Type: application/json`

```json
{
  "url": "https://example.com/very/long/url"
}
```

**Response:**
```json
{
  "shortUrl": "http://localhost:5000/abc123"
}
```

---

### 🔁 Redirect to Original URL

**GET** `/:code`  
Redirects to the original URL and increments the click count.

**Error Responses:**
- `404` – Short URL not found
- `410` – URL has expired

---

## ⚙️ Quick Start

### 🧰 Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)

### 🛠️ Setup

```bash
# Clone the repository
git clone <repository-url>
cd mini-url-shortener

# Install dependencies
npm install

# Setup environment
cp env.example .env
# Edit `.env` with your values

# Start MongoDB (if local)
mongod

# Run the app
npm run dev        # Development
npm start          # Production
```

> The API will be accessible at: `http://localhost:5000`

---

## 🌍 Deployment

Supports deployment on:

- **Railway**
- **Render**
- **Heroku**

### Required Environment Variables

| Key         | Description                      |
|-------------|----------------------------------|
| `NODE_ENV`  | `development` or `production`    |
| `PORT`      | Server port                      |
| `MONGO_URI` | MongoDB connection string        |
| `BASE_URL`  | App domain (e.g. Railway URL)    |

> Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or cloud DB from Railway/Render.

---

## 🧪 Testing the API

### 📬 Using Postman or cURL

#### ✅ Create a Short URL

```bash
curl -X POST http://localhost:5000/shorten   -H "Content-Type: application/json"   -d '{"url": "https://google.com"}'
```

#### 🔄 Redirect to Original

```bash
curl -L http://localhost:5000/abc123
```

#### ❌ Invalid URL

```bash
curl -X POST http://localhost:5000/shorten   -H "Content-Type: application/json"   -d '{"url": "not-a-url"}'
```

---

## 📂 Project Structure

```
mini-url-shortener/
├── src/
│   ├── app.js                  # Express app
│   ├── config/db.js            # MongoDB connection
│   ├── controllers/            # Route handlers
│   ├── models/                 # Mongoose schemas
│   ├── routes/                 # Route definitions
│   ├── middleware/             # Rate limiter, validation
│   └── utils/                  # Short code generator
├── env.example                 # Sample .env file
├── package.json
├── README.md
└── postman_collection.json     # Postman tests
```

---

## 🧾 Database Schema

```js
{
  originalUrl: String,
  shortCode: String,
  createdAt: Date,
  expiryDate: Date,       // optional
  clickCount: Number
}
```

---

## 🚧 Error Handling

| Status | Reason                     |
|--------|----------------------------|
| 400    | Invalid or missing URL     |
| 404    | Short URL not found        |
| 410    | URL expired                |
| 429    | Too many requests          |
| 500    | Internal server error      |

---

## 🧃 Rate Limiting

- 100 requests / IP / 15 minutes  
- Returns `429 Too Many Requests` on exceeding limit

---

## 📜 License

MIT License. Free to use, modify, and contribute.
