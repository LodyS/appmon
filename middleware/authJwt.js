const jwt = require('jsonwebtoken');
const config = require('../config/authConfig.js');

verifyToken = (request, response, next)=>{
    let token = request.headers['x-access-token'];

    if(!token){
        return response.status(403).send({ message : "No token provided" });
    }

    jwt.verify(token, config.secret, (err, decode)=>{
        if(err){
            return response.status(401).send({ message: "Unauthorized"});
        }

        request.userId = decode.index;
        next();
    })
}

const authJwt = {
    jwt:jwt
}

module.exports = authJwt;