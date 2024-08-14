const { registerValidator } = require("../middleware")
const AuthController = require("../controllers/AuthController.js");
const { validate, parameterRequest } = require("../validator/AuthValidator.js");


module.exports = function(app){
    app.use(function(request, response, next){
        response.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );

        next();
    })

    app.post('/api/register', [registerValidator.cekEmailUsername, parameterRequest(), validate, AuthController.register]);
    app.post('/api/login', AuthController.login);
    app.post('/api/logout', AuthController.logout);
}