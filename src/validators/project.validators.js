import Joi from 'joi';


// Project validator schema
const create = Joi.object({
    logo: Joi.string().trim().optional().messages({
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
});


// update project validator schema
const update = Joi.object({
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

}).min(1).messages({
    'object.min': 'At least one field is required to update'
});
const projectValidator = {
    create,
    update
};

export default projectValidator;