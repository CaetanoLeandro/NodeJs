const jwt = require("jsonwebtoken");
const { promisify } = require('util');

module.exports = {
    eAdmin: async function (req, res, next){
        const authHeaders = req.headers.authorization;
        if(!authHeaders){
            return res.status(400).json({
            error: true,
            message:"Invalid token!" 
            });
        }

        const [, token] = authHeader.split(' ');
        if(!token){
            return res.status(400).json({
            error: true,
            message:"Invalid token!" 
            });
        }

        //Verifica se o token não expirou
        try {
        const decode = await promisify(jwt.verify)(token, "LO#RE5FD#@$@%$OJUJU%$@");
        req.useuserId = decode.id;
        return next();
        } catch (error) {
        return res.status(400).json({
        error: true,
        message:"Expired token!" 
        });
        }
    }
} 