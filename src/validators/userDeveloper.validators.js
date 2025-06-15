import Joi from 'joi';
import { objectIdValidator } from './utils';

// Validator for creating a user-developer association
const createUserDeveloper = Joi.object({
    devId: objectIdValidator.required().messages({
        'any.required': 'Developer ID is required'
    }),
    userId: objectIdValidator.required().messages({
        'any.required': 'User ID is required'
    }),
    projectId: objectIdValidator.required().messages({
        'any.required': 'Project ID is required'
    })
}).messages({
    'string.pattern.base': 'Invalid ID format'
});

// Validator for updating a user-developer association
const updateUserDeveloper = Joi.object({
    devId: objectIdValidator.optional(),
    userId: objectIdValidator.optional(),
    projectId: objectIdValidator.optional()
}).min(1).messages({
    'string.pattern.base': 'Invalid ID format',
    'object.min': 'At least one field must be provided for update'
});
const userDeveloperValidator = {
    createUserDeveloper,
    updateUserDeveloper
};

export default userDeveloperValidator;
