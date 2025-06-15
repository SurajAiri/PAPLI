import Joi from 'joi';
import { objectIdValidator } from './utils';

// Validator for creating an API key
const createApiKey = Joi.object({
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

const apiKeyValidators = {
    createApiKey
};

export default apiKeyValidators;