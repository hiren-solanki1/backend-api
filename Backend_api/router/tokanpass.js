const  jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.header('auth-token');
    if(!token) {
        return res.status(403).send('Access denied. No token provided.');

    }
    try{
        const verified  = jet.verified(token,process.env.TOKEN_SECRET);
        req.user = verified;
        next();
        
    }
    catch(e){
        res.status(500).send('Invalid token.');
    }

}