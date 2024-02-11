import jwt from 'jsonwebtoken';

export const authenticateJWT = (req, res, next) => {
  const token = req.access_token;

  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized!' });
    }

    // If token is valid, save user ID for use in other routes
    req.userId = decoded.id;
    next();
  });
};