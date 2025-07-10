const { nanoid } = require('nanoid');
const Url = require('../models/Url');

/**
 * Generates a unique short code for URL shortening
 * @param {number} length - Length of the short code (default: 6)
 * @returns {Promise<string>} - Unique short code
 */
const generateCode = async (length = 6) => {
  let shortCode;
  let isUnique = false;
  
  // Keep generating until we get a unique code
  while (!isUnique) {
    shortCode = nanoid(length);
    
    // Check if the code already exists in the database
    const existingUrl = await Url.findOne({ shortCode });
    if (!existingUrl) {
      isUnique = true;
    }
  }
  
  return shortCode;
};

module.exports = generateCode; 