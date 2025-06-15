// Validator for ObjectId
const objectIdValidator = Joi.string().pattern(/^[0-9a-fA-F]{24}$/).messages({
    'string.pattern.base': 'Invalid ID format'
});


// export
export default {
    objectIdValidator
};