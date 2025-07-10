const Url = require('../models/Url');
const generateCode = require('../utils/generateCode');

/**
 * Create a shortened URL
 * POST /shorten
 */
const shortenUrl = async (req, res) => {
  try {
    const { url } = req.body;
    
    // Check if URL already exists
    const existingUrl = await Url.findOne({ originalUrl: url });
    if (existingUrl) {
      return res.status(200).json({
        shortUrl: `${process.env.BASE_URL}/${existingUrl.shortCode}`
      });
    }
    
    // Generate unique short code
    const shortCode = await generateCode(6);
    
    // Create new URL document
    const newUrl = new Url({
      originalUrl: url,
      shortCode
    });
    
    await newUrl.save();
    
    res.status(201).json({
      shortUrl: `${process.env.BASE_URL}/${shortCode}`
    });
    
  } catch (error) {
    console.error('Error shortening URL:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  shortenUrl
}; 