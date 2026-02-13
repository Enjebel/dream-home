const cloudinary = require('../config/cloudinary');

/**
 * Uploads a file to Cloudinary
 * @param {String} filePath - Path to the temporary file or base64 string
 * @returns {Object} - The Cloudinary upload result (includes URL)
 */
const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'dream-home-properties', // Organizes images in your Cloudinary dashboard
      resource_type: 'auto',
    });
    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    throw new Error('Failed to upload image to Cloudinary');
  }
};

module.exports = { uploadToCloudinary };