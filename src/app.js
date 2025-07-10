const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const net = require('net');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json({ limit: '10mb' })); // Parse JSON bodies
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Parse URL-encoded bodies

// Routes
app.use('/', require('./routes/urlRoutes'));

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// Function to check if a port is available
const isPortAvailable = (port) => {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(port, () => {
      server.once('close', () => {
        resolve(true);
      });
      server.close();
    });
    server.on('error', () => {
      resolve(false);
    });
  });
};

// Function to find an available port starting from the desired port
const findAvailablePort = async (startPort) => {
  let port = startPort;
  while (!(await isPortAvailable(port))) {
    port++;
    if (port > startPort + 100) {
      throw new Error('No available ports found in range');
    }
  }
  return port;
};

// Start server with dynamic port selection
const startServer = async () => {
  try {
    const desiredPort = parseInt(process.env.PORT) || 5000;
    const PORT = await findAvailablePort(desiredPort);
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      if (PORT !== desiredPort) {
        console.log(`Note: Original port ${desiredPort} was in use, using port ${PORT} instead`);
      }
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();

module.exports = app; 