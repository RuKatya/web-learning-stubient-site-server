const Joi = require('joi');

const newName = Joi.string().min(2).max(25).required().messages({
    'string.empty': 'Name can not be empty',
    'string.min': 'Name can be maximum 2 symbols',
    'string.max': 'Name can be maximum 15 symbols',
});

exports.newNameValidation = Joi.object({ newName });
