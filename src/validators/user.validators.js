import Joi from 'joi';


// User validator schema for creation
const create = Joi.object({
    name: Joi.string().trim().required().messages({
        'string.empty': 'Name is required',
        'any.required': 'Name is required'
    }),

    email: Joi.string().trim().email().required().messages({
        'string.empty': 'Email is required',
        'string.email': 'Please provide a valid email',
        'any.required': 'Email is required'
    }),

    password: Joi.string().min(6).required().messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 6 characters long',
        'any.required': 'Password is required'
    }),

    role: Joi.string().valid('admin', 'user').default('user').messages({
        'string.empty': 'Role cannot be empty',
        'any.only': 'Role must be either "admin" or "user"'
    }),

    googleId: Joi.string().allow(null, '').optional()
});


// Update user validator schema
const update = Joi.object({
    name: Joi.string().trim().optional().messages({
        'string.empty': 'Name cannot be empty'
    }),

    email: Joi.string().trim().email().optional().messages({
        'string.empty': 'Email cannot be empty',
        'string.email': 'Please provide a valid email'
    }),

    password: Joi.string().min(6).optional().messages({
        'string.empty': 'Password cannot be empty',
        'string.min': 'Password must be at least 6 characters long'
    }),

    role: Joi.string().valid('admin', 'user').optional().messages({
        'string.empty': 'Role cannot be empty',
        'any.only': 'Role must be either "admin" or "user"'
    }),

    googleId: Joi.string().allow(null, '').optional()
}).min(1).messages({
    'object.min': 'At least one field is required to update'
});
const userValidators = {
    create,
    update
};

export default userValidators;
