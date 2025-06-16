import Joi from 'joi';


// Validator for creating an API key
const create = Joi.object({
    // token: Joi.string().required().trim(),
    // developerId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
    //     'any.required': 'Developer ID is required'
    // }),
    projectId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
        'any.required': 'Project ID is required'
    })
}).messages({
    'string.pattern.base': 'Invalid project ID format',
    'any.required': 'Project ID is required'
});

const apiKeyValidators = {
    create
};

export default apiKeyValidators;