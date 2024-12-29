
const jwt = require('jsonwebtoken');
const checkToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token) {
        jwt.verify(token, process.env.ADMIN_SECRET, (err, decoded) => {
            if (err) {
                return res.json({ success: false, message: 'Token is not valid' });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.json({ success: false, message: 'Auth token is not supplied' });
    }
}
module.exports = checkToken;