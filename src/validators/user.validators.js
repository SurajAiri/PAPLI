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

    username: Joi.string().trim().required().messages({
        'string.empty': 'Username is required',
        'any.required': 'Username is required'
    }),

    isActive: Joi.boolean().default(true).optional(),
    
});


// Update user validator schema
const update = Joi.object({
    name: Joi.string().trim().optional().messages({
        'string.empty': 'Name cannot be empty'
    }),

    username: Joi.string().trim().optional().messages({
        'string.empty': 'Username cannot be empty'
    }),

    isActive: Joi.boolean().optional(),

}).min(1).messages({
    'object.min': 'At least one field is required to update'
});
const userValidators = {
    create,
    update
};

export default userValidators;
