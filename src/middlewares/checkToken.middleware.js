import Token from '../models/blacklisttoken.model.js';

const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization")?.split(' ')[1];
    // console.log(token);

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    // Check if the token is blacklisted
    const blacklisted = await Token.findOne({ token });
    if (blacklisted) {
        return res.status(403).json({ message: "Token is invalid, please login again" });
    }

    // const decoded = jwt.verify(token, SECRET_KEY);
    // req.user = decoded;
    req.token = token;

    next();
};

export default authMiddleware;
