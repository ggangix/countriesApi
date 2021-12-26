const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  if (req.path.startsWith('/users')) return next();

  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    try {
      const decoded = jwt.verify(req.token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      if (err.message === 'jwt expired') {
        return res.status(401).json({ message: 'Token expired' });
      }
      return res.status(401).json({ message: 'Token invalid' });
    }
  } else {
    res.status(403).json({ message: 'Forbidden: please log in' });
  }
};

module.exports = verifyToken;
