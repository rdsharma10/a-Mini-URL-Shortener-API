const Url = require('../models/Url');

/**
 * Redirect to original URL
 * GET /:code
 */
const redirectToOriginal = async (req, res) => {
  try {
    const { code } = req.params;
    
    // Find URL by short code
    const url = await Url.findOne({ shortCode: code });
    
    if (!url) {
      return res.status(404).json({
        success: false,
        message: 'URL not found'
      });
    }
    
    // Check if URL is expired
    if (Url.isExpired(url.expiryDate)) {
      return res.status(410).json({
        success: false,
        message: 'This URL has expired'
      });
    }
    
    // Increment click count
    await url.incrementClicks();
    
    // Redirect to original URL
    res.redirect(url.originalUrl);
    
  } catch (error) {
    console.error('Error redirecting URL:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  redirectToOriginal
}; 