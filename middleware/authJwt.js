const jwt = require('jsonwebtoken');
const config = require('../config/authConfig.js');

verifyToken = (request, response, next)=>{
    let token = request.headers['x-access-token'];

    if(!token){
        return response.status(403).send({ message : "No token provided" });
    }

    jwt.verify(token, config.secret, (err, decoded)=>{
        if(err){
            return response.status(401).send({ message: "Unauthorized"});
        }

        request.userId = decoded.id.id;
        request.email = decoded.id.email;
        request.username = decoded.id.username;
        next();
    })
}

const authJwt = {
    verifyToken:verifyToken
}

module.exports = authJwt;