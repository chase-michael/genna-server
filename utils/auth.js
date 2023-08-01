const jwt = require('jsonwebtoken');

exports.getJWT = (_id, displayName, email, profileImage, bio, slug) => {
   try {
      const payload = {
         _id,
         displayName,
         email,
         profileImage,
         bio,
         slug
      }
      return jwt.sign(payload, process.env.TOKEN_SECRET);
   } catch (err) {
      console.error('Error in createJWT:', err);
   }
};
