const Joi = require('joi');
const { objectIdValidator } = require('./utils');

// Validator for creating an API key
const createApiKeyValidator = Joi.object({
    token: Joi.string().required().trim(),
    developerId: objectIdValidator.required().messages({
        'any.required': 'Developer ID is required'
    }),
    projectId: objectIdValidator.required().messages({
        'any.required': 'Project ID is required'
    })
}).messages({
    'string.pattern.base': 'Invalid project ID format',
    'any.required': 'Project ID is required'
});

module.exports = {
    createApiKeyValidator
};