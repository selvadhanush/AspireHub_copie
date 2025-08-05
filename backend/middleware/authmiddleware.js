const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("🛡️ Auth header received:", authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log("❌ No Bearer token in header");
    return res.status(401).json({ message: 'Unauthorized: No token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token decoded successfully:", decoded); // Add this line
    req.user = decoded;
    next();
  } catch (err) {
    console.log("❌ Token verification failed:", err.message); // Add this line
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = requireAuth;
