import Joi from 'joi';

// Developer registration validation schema
const create = Joi.object({
    name: Joi.string().required().trim().messages({
        'string.empty': 'Name is required',
        'any.required': 'Name is required'
    }),
    email: Joi.string().email().required().trim().messages({
        'string.empty': 'Email is required',
        'string.email': 'Please provide a valid email',
        'any.required': 'Email is required'
    }),
    password: Joi.string().min(6).required().messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 6 characters',
        'any.required': 'Password is required'
    }),
    role: Joi.string().valid('admin', 'developer').default('developer').messages({
        'any.only': 'Role must be either admin or developer'
    })
});


// Developer update validation schema
const update = Joi.object({
    name: Joi.string().trim(),
    email: Joi.string().email().trim(),
    password: Joi.string().min(6),
    role: Joi.string().valid('admin', 'developer')
}).min(1).messages({
    'object.min': 'At least one field is required to update'
});

const developerValidator = {
    create,
    update
};

export default developerValidator;