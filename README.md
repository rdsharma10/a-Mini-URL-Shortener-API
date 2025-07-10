# Mini URL Shortener API

A simple and efficient URL shortening service built with Node.js, Express, and MongoDB. This API allows you to create short URLs and track click statistics.

## Features

- ✅ Create shortened URLs with unique 6-character codes
- ✅ Track click count for each shortened URL
- ✅ Rate limiting (100 requests per 15 minutes)
- ✅ URL validation and sanitization
- ✅ MongoDB integration with Mongoose
- ✅ RESTful API design
- ✅ Comprehensive error handling
- ✅ CORS support

## API Endpoints

### Create Short URL
```
POST /shorten
Content-Type: application/json

{
  "url": "https://example.com/very-long-url"
}
```

**Response:**
```json
{
  "shortUrl": "http://localhost:5000/abc123"
}
```

### Redirect to Original URL
```
GET /:code
```
Redirects to the original URL and increments the click counter.

**Error Responses:**
- `404` - URL not found
- `410` - URL has expired

## Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB (local or cloud)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mini-url-shortener
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Start MongoDB** (if running locally)
   ```bash
   # Using MongoDB Community Edition
   mongod
   
   # Or using MongoDB Atlas (cloud)
   # Update MONGO_URI in .env
   ```

5. **Run the application**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

The API will be available at `http://localhost:5000`

## 🚀 Deployment

### Option 1: Railway (Recommended)

**Railway** is the easiest platform for Node.js deployment with built-in MongoDB support.

#### Step 1: Prepare Your Repository
```bash
# Make sure your code is committed to GitHub
git add .
git commit -m "Prepare for deployment"
git push origin main
```

#### Step 2: Deploy to Railway
1. Go to [railway.app](https://railway.app)
2. Sign up with your GitHub account
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will automatically detect it's a Node.js app

#### Step 3: Set Environment Variables
In your Railway project dashboard:
1. Go to "Variables" tab
2. Add these environment variables:
   ```
   NODE_ENV=production
   MONGO_URI=your_mongodb_connection_string
   BASE_URL=https://your-app-name.railway.app
   ```

#### Step 4: Add MongoDB Database
1. In Railway dashboard, click "New" → "Database" → "MongoDB"
2. Copy the connection string
3. Update your `MONGO_URI` variable with this string

#### Step 5: Deploy
- Railway will automatically deploy your app
- Your API will be available at `https://your-app-name.railway.app`

### Option 2: Render

**Render** offers a generous free tier for web services.

#### Step 1: Prepare Your Repository
```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

#### Step 2: Deploy to Render
1. Go to [render.com](https://render.com)
2. Sign up with your GitHub account
3. Click "New" → "Web Service"
4. Connect your GitHub repository
5. Configure the service:
   - **Name**: `mini-url-shortener`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

#### Step 3: Set Environment Variables
In your Render service dashboard:
1. Go to "Environment" tab
2. Add these variables:
   ```
   NODE_ENV=production
   MONGO_URI=your_mongodb_connection_string
   BASE_URL=https://your-app-name.onrender.com
   ```

#### Step 4: Deploy
- Click "Create Web Service"
- Render will build and deploy your app
- Your API will be available at `https://your-app-name.onrender.com`

### Option 3: Heroku

**Heroku** is a well-established platform (paid plans only).

#### Step 1: Install Heroku CLI
```bash
# Download from https://devcenter.heroku.com/articles/heroku-cli
# Or use npm
npm install -g heroku
```

#### Step 2: Login and Create App
```bash
heroku login
heroku create your-app-name
```

#### Step 3: Add MongoDB
```bash
# Add MongoDB addon (requires credit card)
heroku addons:create mongolab:sandbox
```

#### Step 4: Set Environment Variables
```bash
heroku config:set NODE_ENV=production
heroku config:set BASE_URL=https://your-app-name.herokuapp.com
```

#### Step 5: Deploy
```bash
git push heroku main
```

### MongoDB Setup for Production

#### Option A: MongoDB Atlas (Recommended)
1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create free account
3. Create new cluster
4. Get connection string
5. Add to your deployment environment variables

#### Option B: Railway MongoDB
- Use Railway's built-in MongoDB service
- Automatically managed and scaled

#### Option C: Render MongoDB
- Use Render's MongoDB service
- Integrated with your web service

### Environment Variables for Production

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment | `production` |
| `PORT` | Server port | `3000` (auto-set by platform) |
| `MONGO_URI` | MongoDB connection | `mongodb+srv://user:pass@cluster.mongodb.net/urlshortener` |
| `BASE_URL` | Your app URL | `https://your-app.railway.app` |

### Post-Deployment Verification

1. **Test API Endpoints:**
   ```bash
   # Test your deployed API
   curl -X POST https://your-app.railway.app/shorten \
     -H "Content-Type: application/json" \
     -d '{"url": "https://google.com"}'
   ```

2. **Update Postman Collection:**
   - Change `baseUrl` variable to your deployed URL
   - Run the test suite

3. **Check Logs:**
   - Railway: Dashboard → "Deployments" → View logs
   - Render: Dashboard → "Logs" tab
   - Heroku: `heroku logs --tail`

### Custom Domain (Optional)

#### Railway
1. Go to project settings
2. Add custom domain
3. Update DNS records
4. Update `BASE_URL` environment variable

#### Render
1. Go to service settings
2. Add custom domain
3. Update DNS records
4. Update `BASE_URL` environment variable

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/urlshortener` |
| `BASE_URL` | Base URL for short links | `http://localhost:5000` |

## Project Structure

```
mini-url-shortener/
├── src/
│   ├── config/
│   │   └── db.js                 # MongoDB connection setup
│   ├── controllers/
│   │   ├── urlController.js      # POST /shorten logic
│   │   └── redirectController.js # GET /:code logic
│   ├── models/
│   │   └── Url.js                # Mongoose schema
│   ├── routes/
│   │   └── urlRoutes.js          # Express Router
│   ├── middleware/
│   │   ├── rateLimiter.js        # Rate limiting
│   │   └── validateUrl.js        # URL validation
│   ├── utils/
│   │   └── generateCode.js       # Short code generator
│   └── app.js                    # Express app setup
├── env.example                   # Environment template
├── postman_collection.json       # API testing collection
├── package.json
├── Procfile                      # Heroku deployment
├── render.yaml                   # Render deployment
└── README.md
```

## Database Schema

```javascript
{
  originalUrl: String,    // The original long URL
  shortCode: String,      // Unique 6-character code
  createdAt: Date,        // Creation timestamp
  expiryDate: Date,       // Optional expiration date
  clickCount: Number      // Number of times accessed
}
```

## 🧪 API Testing

### Using Postman

1. **Import the Collection:**
   - Open Postman
   - Click "Import" → "File" → Select `postman_collection.json`
   - The collection includes comprehensive test cases with assertions

2. **Set Environment Variables:**
   - `baseUrl`: `http://localhost:5000` (or your server URL)
   - `shortCode`: Will be automatically set by tests
   - `originalUrl`: Will be automatically set by tests

3. **Run Test Suite:**
   - The collection is organized into test categories:
     - ✅ **Success Tests**: Valid URL creation and redirection
     - ❌ **Error Tests**: Invalid inputs and edge cases
     - 🔄 **Rate Limiting Tests**: Rate limit verification
     - 📊 **Database Verification**: MongoDB data validation

### Manual Testing with cURL

#### Create Short URL
```bash
curl -X POST http://localhost:5000/shorten \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com/very/long/link"}'
```

**Expected Response:**
```json
{
  "shortUrl": "http://localhost:5000/abc123"
}
```

#### Test Redirection
```bash
# Replace 'abc123' with the actual short code from above
curl -L http://localhost:5000/abc123
```

#### Test Invalid URL
```bash
curl -X POST http://localhost:5000/shorten \
  -H "Content-Type: application/json" \
  -d '{"url": "not-a-valid-url"}'
```

**Expected Response:**
```json
{
  "success": false,
  "message": "Please provide a valid URL"
}
```

#### Test Missing URL
```bash
curl -X POST http://localhost:5000/shorten \
  -H "Content-Type: application/json" \
  -d '{"otherField": "value"}'
```

**Expected Response:**
```json
{
  "success": false,
  "message": "URL is required"
}
```

#### Test Unknown Short Code
```bash
curl http://localhost:5000/invalid-code
```

**Expected Response:**
```json
{
  "success": false,
  "message": "URL not found"
}
```

### Response Format Examples

#### ✅ Success Responses

**Create Short URL:**
```json
{
  "shortUrl": "http://localhost:5000/abc123"
}
```

**Redirect Response:**
- Status: `302 Found`
- Headers: `Location: https://example.com/very/long/link`

#### ❌ Error Responses

**Invalid URL:**
```json
{
  "success": false,
  "message": "Please provide a valid URL"
}
```

**Missing URL:**
```json
{
  "success": false,
  "message": "URL is required"
}
```

**Short Code Not Found:**
```json
{
  "success": false,
  "message": "URL not found"
}
```

**Expired Link:**
```json
{
  "success": false,
  "message": "This URL has expired"
}
```

**Rate Limit Exceeded:**
```json
{
  "success": false,
  "message": "Too many requests from this IP, please try again later."
}
```

### MongoDB Verification

#### Connect to MongoDB
```bash
# Using MongoDB shell
mongosh mongodb://localhost:27017/urlshortener

# Or using MongoDB Compass
# Connect to: mongodb://localhost:27017/urlshortener
```

#### Check Stored URLs
```javascript
// View all shortened URLs
db.urls.find().pretty()

// Find specific URL by short code
db.urls.findOne({ shortCode: "abc123" })

// Check click count for a URL
db.urls.findOne({ shortCode: "abc123" }, { clickCount: 1 })

// View URLs created today
db.urls.find({
  createdAt: {
    $gte: new Date(new Date().setHours(0,0,0,0))
  }
})
```

#### Verify Click Tracking
1. Create a short URL using the API
2. Note the `clickCount` in MongoDB
3. Visit the short URL multiple times
4. Check that `clickCount` increases in MongoDB

### Browser Testing

1. **Create Short URL:**
   - Open browser developer tools
   - Go to Network tab
   - Send POST request to `/shorten`
   - Copy the returned short URL

2. **Test Redirection:**
   - Paste the short URL in browser address bar
   - Should redirect to original URL
   - Check Network tab for 302 redirect

3. **Test Error Cases:**
   - Try invalid short codes
   - Should see JSON error response

### Testing Checklist

- [ ] ✅ Create short URL with valid URL
- [ ] ✅ Create short URL without protocol (auto-adds https://)
- [ ] ✅ Redirect to original URL
- [ ] ✅ Click count increments on redirect
- [ ] ✅ Duplicate URLs return existing short URL
- [ ] ✅ Invalid URL returns 400 error
- [ ] ✅ Missing URL returns 400 error
- [ ] ✅ Unknown short code returns 404 error
- [ ] ✅ Rate limiting works (100 requests per 15 min)
- [ ] ✅ MongoDB stores data correctly
- [ ] ✅ Expired URLs return 410 error (if expiry is set)

### Rate Limiting Test

To test rate limiting, run this command multiple times quickly:

```bash
for i in {1..110}; do
  curl -X POST http://localhost:5000/shorten \
    -H "Content-Type: application/json" \
    -d '{"url": "https://test-rate-limit.com"}'
  echo "Request $i"
done
```

After 100 requests, you should see:
```json
{
  "success": false,
  "message": "Too many requests from this IP, please try again later."
}
```

## Features in Detail

### URL Shortening
- Generates unique 6-character codes using nanoid
- Validates and sanitizes input URLs
- Automatically adds HTTPS protocol if missing
- Prevents duplicate URLs (returns existing short URL)

### Click Tracking
- Increments counter on each redirect
- Tracks creation and expiration dates

### Rate Limiting
- 100 requests per IP address per 15 minutes
- Returns HTTP 429 status codes when exceeded

### URL Expiration
- Optional expiration dates for URLs
- Automatic validation of expired URLs
- Returns HTTP 410 for expired URLs

### Error Handling
- `400` - Invalid URL format
- `404` - Short code not found
- `410` - URL has expired
- `429` - Rate limit exceeded
- `500` - Server error

## Dependencies

### Production
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `express-rate-limit` - Rate limiting
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variables
- `nanoid` - Unique ID generation

### Development
- `nodemon` - Auto-restart on file changes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License 