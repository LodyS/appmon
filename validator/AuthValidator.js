const { body } = require('express-validator');
const { validationResult } = require('express-validator');

function validate(request, response, next)
{
    const error = validationResult(request);

    if(error.isEmpty()){
        return next();
    }

    return response.status(400).json({ errors : error.array() });
}

function parameterRequest()
{
    return [
        body('name').notEmpty().withMessage("Wajib diisi"),
        body('email').notEmpty().withMessage("Wajib diisi"),
        body('username').notEmpty().withMessage("Wajib diisi"),
        body('password').notEmpty().withMessage("Wajib diisi"),
    ];
}

module.exports = {
    validate,
    parameterRequest
}