const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ success: false, message: 'Auth token is not supplied' });
    }

    try {
        const decodedToken = jwt.decode(token);

        if (!decodedToken || !decodedToken.role || !decodedToken.email) {
            return res.status(400).json({ success: false, message: 'Invalid token format' });
        }

        const role = decodedToken.role;
        const email = decodedToken.email;

        let secret;
        if (role === "Admin") {
            secret = process.env.ADMIN_SECRET;
        } else if (role === "Customer") {
            secret = process.env.CUSTOMER_SECRET;
        } else if (role === "Agent") {
            secret = process.env.AGENT_SECRET;
        } else {
            return res.status(403).json({ success: false, message: 'Invalid user role' });
        }

        jwt.verify(token, secret, (err, verified) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'Token is not valid' });
            } else {
                req.user = {
                    email: verified.email,
                    role: verified.role,
                };
                next();
            }
        });

    } catch (error) {
        return res.status(400).json({ success: false, message: 'Token verification failed', error });
    }
};

module.exports = checkToken;
