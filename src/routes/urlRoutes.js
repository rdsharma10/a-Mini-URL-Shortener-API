const express = require('express');
const router = express.Router();
const { shortenUrl } = require('../controllers/urlController');
const { redirectToOriginal } = require('../controllers/redirectController');
const validateUrl = require('../middleware/validateUrl');
const rateLimiter = require('../middleware/rateLimiter');

// Apply rate limiting to all routes
router.use(rateLimiter);

// POST /shorten - Create shortened URL
router.post('/shorten', validateUrl, shortenUrl);

// GET /:code - Redirect to original URL (this should be the last route)
router.get('/:code', redirectToOriginal);

module.exports = router; 