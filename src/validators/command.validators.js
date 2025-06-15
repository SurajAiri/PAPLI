import Joi from 'joi';
import { objectIdValidator } from './utils';

// Validator for creating a command
const createCommand = Joi.object({
    apiKeyId: objectIdValidator.required().messages({
        'any.required': 'API Key ID is required'
    }),
    projectId: objectIdValidator.required().messages({
        'any.required': 'Project ID is required'
    }),
    userId: objectIdValidator.required().messages({
        'any.required': 'User ID is required'
    }),
    payload: Joi.object().required().messages({
        'any.required': 'Payload is required'
    }),
    status: Joi.string()
        .valid('created', 'queued', 'delivered', 'failed', 'completed')
        .default('created')
});

// Validator for updating a command
const updateCommand = Joi.object({
    apiKeyId: objectIdValidator,
    projectId: objectIdValidator,
    userId: objectIdValidator,
    payload: Joi.object(),
    status: Joi.string().valid('created', 'queued', 'delivered', 'failed', 'completed')
}).min(1).messages({
    'object.min': 'At least one field is required for update'
});

// Validator for updating only the status of a command
const updateCommandStatus = Joi.object({
    status: Joi.string()
        .valid('created', 'queued', 'delivered', 'failed', 'completed')
        .required()
        .messages({
            'any.required': 'Status is required',
            'any.only': 'Status must be one of: created, queued, delivered, failed, completed'
        })
});

const commandValidators = {
    createCommand,
    updateCommand,
    updateCommandStatus
};

export default commandValidators;