/**
 * Middleware to validate URL format
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const validateUrl = (req, res, next) => {
  const { url } = req.body;
  
  if (!url) {
    return res.status(400).json({
      success: false,
      message: 'URL is required'
    });
  }
  
  // URL validation regex pattern
  const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  
  if (!urlPattern.test(url)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid URL'
    });
  }
  
  // Ensure URL has protocol
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    req.body.url = `https://${url}`;
  }
  
  next();
};

module.exports = validateUrl; 