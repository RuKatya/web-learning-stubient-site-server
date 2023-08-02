const Joi = require('joi');

const userName = Joi.string().min(2).max(25).required().messages({
    'string.empty': 'Name can not be empty',
    'string.min': 'Name can be maximum 2 symbols',
    'string.max': 'Name can be maximum 25 symbols',
});

const email = Joi.string().email().messages({
    'string.email': 'Incorrect email',
    'string.empty': 'E-mail can not be empty',
});

const password = Joi.string()
    .min(6)
    .pattern(new RegExp('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$'))
    .message({
        'string.pattern.base':
            'Password must include letters and numbers and at least one special character !@#$%^&* and without spaces',
        'string.min': 'Password must be at least 6 sybmols',
    });

const confirmPassword = Joi.string().valid(Joi.ref('password')).messages({
    'any.only': 'Passwords not same',
});

exports.registValidation = Joi.object({
    userName,
    email,
    password,
    confirmPassword,
});

exports.loginValidation = Joi.object({
    email,
    password,
});
