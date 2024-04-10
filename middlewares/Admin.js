
const jwt = require('jsonwebtoken');
const secretKey = 'itsasecret';

module.exports = (req, res, next) => {
    const token = req?.headers?.authorization?.split(' ')[1];
    if (!token) return res.status(401).send('Access denied. No token provided.');
  
    try {
      const decoded = jwt.verify(token, secretKey);
      if (decoded.user.role !== 'admin') throw new Error();
      next();
    } catch (error) {
      res.status(403).send('Access denied. Invalid token.');
    }
  };

