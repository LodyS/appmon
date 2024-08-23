const jwt = require('jsonwebtoken');
const config = require('../config/authConfig.js');
const db = require("../models");
const tokenBlacklist = db.tokenBlacklist;

verifyToken = (request, response, next)=>{
    let token = request.headers['x-access-token'];

    if(!token){
        return response.status(403).send({ message : "Token tidak valid coy" });
    }

    jwt.verify(token, config.secret, async(err, decoded)=>{
        if(err){
            return response.status(401).send({ message: "Unauthorized"});
        }

        const isBlackListToken = await tokenBlacklist.findOne({
            where : {
                token : token
            }
        })

        if(!isBlackListToken){
            return response.status(401).send({ message : "Token sudah tidak berlaku"});
        }

        request.userId = decoded.id.id;
        request.email = decoded.id.email;
        request.username = decoded.id.username;
        next();
    })
}

const authJwt = {
    verifyToken:verifyToken,
}

module.exports = authJwt;