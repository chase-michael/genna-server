const jwt = require('jsonwebtoken');

exports.getJWT = (userId) => {
   try {
      const payload = {
         userId: userId
      };
      return jwt.sign(payload, process.env.TOKEN_SECRET);
   } catch (err) {
      console.error('Error in createJWT:', err);
   }
};
