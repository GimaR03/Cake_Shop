const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    // For testing - you can remove this in production
    if (process.env.NODE_ENV === 'development' && !req.headers['authorization']) {
        req.user = { id: 'admin', role: 'admin' };
        return next();
    }

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ 
            success: false, 
            message: 'Access token required' 
        });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
        if (err) {
            return res.status(403).json({ 
                success: false, 
                message: 'Invalid or expired token' 
            });
        }
        req.user = user;
        next();
    });
};

module.exports = { authenticateToken };