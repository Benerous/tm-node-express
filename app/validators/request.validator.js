const { validationResult } = require('express-validator');

const reqValidationHandler = (req) => {
    const errors = validationResult(req);
    const errorObject = errors.array()[0]
    if (!errors.isEmpty()) {
        return { errors: `${errorObject.msg} '${errorObject.param}' in ${errorObject.location}` };
    }
}

module.exports = reqValidationHandler;