const { body } = require('express-validator');
const { validationResult } = require('express-validator');

function validate(request, response, next)
{
    const error = validationResult(request);
    if (error.isEmpty()){
        return next();
    }

    return response.status(400).json({ errors : error.array() });
}

function parameterRequest()
{
    return [
        body('media').notEmpty().withMessage("Media wajib diisi"),
        body('unit').notEmpty().withMessage("Unit wajib diisi"),
        body('application').notEmpty().withMessage("Application wajib diisi"),
        body('type').notEmpty().withMessage("Type wajib diisi"),
        body('detail').notEmpty().withMessage("Detail wajib diisi")
    ];
}

module.exports = {
    validate,
    parameterRequest
}