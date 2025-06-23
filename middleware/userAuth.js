import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not Authorized, Login Again' });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode?.id) {
      req.user = { id: tokenDecode.id };
      next();
    } else {
      return res.status(401).json({ success: false, message: 'Not Authorized, Login Again' });
    }
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or Expired Token' });
  }
};

export default userAuth;