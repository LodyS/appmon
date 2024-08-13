const db = require("../models");
const User = db.user;

cekEmailUsername = (request, response, next)=>{
    User.findOne({
        where: {
            username : request.body.username
        }
    }).then(user=>{
        if(user){
            response.status(400).send({ message: 'Failed! username already use'});
            return;
        }

        User.findOne({
            where: {
                email : request.body.email
            }
        }).then(user=>{
            if(user){
                response.status(400).send({ message : 'Failed! email already use'});
                return;
            }

            next();
        });
    });
};


const registerValidator = {
    cekEmailUsername:cekEmailUsername
}

module.exports = registerValidator;

