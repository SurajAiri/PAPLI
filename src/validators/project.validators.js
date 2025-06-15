import Joi from 'joi';
import { objectIdValidator } from './utils';


// Project validator schema
const createProject = Joi.object({
    logo: Joi.string().trim().required().messages({
        'string.empty': 'Logo is required',
        'any.required': 'Logo is required'
    }),

    shortDesc: Joi.string().trim().required().messages({
        'string.empty': 'Short description is required',
        'any.required': 'Short description is required'
    }),

    title: Joi.string().trim().required().messages({
        'string.empty': 'Title is required',
        'any.required': 'Title is required'
    }),

    description: Joi.string().trim().required().messages({
        'string.empty': 'Description is required',
        'any.required': 'Description is required'
    }),

    developerId: objectIdValidator.required().messages({
        'any.required': 'Developer ID is required'
    })
});


// Validator for project ID
const projectIdSchema = Joi.object({
    id: objectIdValidator.required().messages({
        'any.required': 'Project ID is required'
    })
});

// update project validator schema
const updateProject = Joi.object({
    logo: Joi.string().trim().optional().messages({
        'string.empty': 'Logo cannot be empty'
    }),

    shortDesc: Joi.string().trim().optional().messages({
        'string.empty': 'Short description cannot be empty'
    }),

    title: Joi.string().trim().optional().messages({
        'string.empty': 'Title cannot be empty'
    }),

    description: Joi.string().trim().optional().messages({
        'string.empty': 'Description cannot be empty'
    }),

    developerId: objectIdValidator.optional().messages({
        'any.required': 'Developer ID is required'
    })
}).min(1).messages({
    'object.min': 'At least one field is required to update'
});
const projectValidator = {
    createProject,
    projectIdSchema,
    updateProject
};

export default projectValidator;