import Joi from 'joi';

// Validator for creating a user-developer association
const create = Joi.object({
    devId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
        'any.required': 'Developer ID is required'
    }),
    userId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
        'any.required': 'User ID is required'
    }),
    projectId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
        'any.required': 'Project ID is required'
    })
}).messages({
    'string.pattern.base': 'Invalid ID format'
});

// Validator for updating a user-developer association
const update = Joi.object({
    devId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).optional(),
    userId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).optional(),
    projectId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).optional()
}).min(1).messages({
    'string.pattern.base': 'Invalid ID format',
    'object.min': 'At least one field must be provided for update'
});
const userDeveloperValidator = {
    create,
    update
};

export default userDeveloperValidator;
