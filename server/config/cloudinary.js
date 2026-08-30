const cloudinary = require('cloudinary').v2;

const isConfigured = () => {
  return (
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_CLOUD_NAME !== 'demo_cloud_name' &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
};

if (isConfigured()) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

/**
 * Upload a buffer or local file to Cloudinary
 * @param {Buffer} buffer - File buffer
 * @param {string} folder - Destination folder in Cloudinary
 * @returns {Promise<string>} - Cloudinary Secure URL or data URI fallback
 */
const uploadStream = (buffer, folder = 'noman_portfolio') => {
  return new Promise((resolve, reject) => {
    if (!isConfigured()) {
      // Fallback: create base64 data URI if Cloudinary credentials are not set yet
      const base64 = buffer.toString('base64');
      const dataUri = `data:image/jpeg;base64,${base64}`;
      return resolve(dataUri);
    }

    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto',
        transformation: [{ quality: 'auto', fetch_format: 'auto' }],
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return reject(error);
        }
        resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });
};

module.exports = {
  cloudinary,
  uploadStream,
  isConfigured,
};
