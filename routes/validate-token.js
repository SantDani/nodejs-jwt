'use strict'

const HTTP_UNAUTHORIZED = 401;
const jwt = require('jsonwebtoken');

// middleware to valite token (protected routes)

const verificationToken = (req, res, next) => {
    const token = req.header('auth-token');

    if(!token) {
        return res.status(HTTP_UNAUTHORIZED).json({'error': 'Unauthorized'});
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);

        req.user = verified;
        console.log('user verified');
        next();
    } catch (e) {
        console.error({e, error: 'token not valid'});
    }
}

module.exports = verificationToken;