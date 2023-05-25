const cloudinary = require('cloudinary').v2;
cloudinary.config({
    secure: true
  });

exports.uploadProfileImage = async (img) => {
    try {
        const result = await cloudinary.uploader.upload(img, {
            folder: 'ProfileImage',
            unique_filename: true
        });

        return result;
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errors: [{ error: 'Error in uploadImage' }]
        });
    }
}
