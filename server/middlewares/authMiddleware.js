import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt; // Ensure the token is retrieved from cookies
    if (!token) {
        return res.status(401).send("Access Denied: No Token Provided");
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = verified.userId; // Attach the user ID to the request object
        next();
    } catch (error) {
        return res.status(401).send("Access Denied: Invalid Token");
    }
};

export default verifyToken;