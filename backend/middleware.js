const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
    const token = req.headers['authorization'] || req.headers['Authorization'];

    if (!token) {
        return res.status(401).json({ success: false, message: 'Auth token is not supplied' });
    }

    try {
        // Extract decoded token (just to get role, for selecting secret)
        const decodedToken = jwt.decode(token);
        if (!decodedToken || !decodedToken.role) {
            return res.status(400).json({ success: false, message: 'Invalid token format' });
        }

        const role = decodedToken.role;

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

        // Now verify the token with selected secret
        jwt.verify(token, secret, (err, verified) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'Token is not valid' });
            } else {
                req.user = {
                    email: verified.email,
                    role: verified.role,
                    id: verified.id // if needed
                };
                next();
            }
        });

    } catch (error) {
        return res.status(400).json({ success: false, message: 'Token verification failed', error });
    }
};

const checkIfAdmin = (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'User not authenticated' });
        }

        if (req.user.role === "Admin") {
            next();
        } else {
            return res.status(403).json({ success: false, message: 'Invalid admin' });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: 'Token verification failed', error });
    }
    next()
}

module.exports = checkToken;
module.exports = checkIfAdmin;
