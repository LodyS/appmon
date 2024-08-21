const RequestUserController = require("../controllers/RequestUserController.js");
const { validate, parameterRequest } = require("../validator/RequestUserValidator.js");
const { authJwt } = require("../middleware");

module.exports = (app)=>{
    app.get('/api/request-user', RequestUserController.index);
    app.get('/api/request-user/:id', RequestUserController.show);
    app.post('/api/request-user', [parameterRequest(), validate], RequestUserController.store);
    app.put('/api/request-user/:id', [authJwt.verifyToken], RequestUserController.update);
    app.put('/api/done-task/:id', [authJwt.verifyToken, RequestUserController.doneTask]);
    app.post('/api/request-user-filter', RequestUserController.search);
}