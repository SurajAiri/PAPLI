const apiKeySchema = require('../models/apiKey.models');
const { v4: uuidv4 } = require('uuid');

// create, deleteById, getByToken, getById, getByDevId, getByProjectId

const ApiKeyService = {
    async create(apiKeyData) {
        const apiKey = new apiKeySchema({
            token: uuidv4(),
            developerId: apiKeyData.developerId,
            projectId: apiKeyData.projectId
        });
        return await apiKey.save();
    },
    async deleteById(id) {
        return await apiKeySchema.findByIdAndDelete(id);
    },
    async getByToken(token) {
        return await apiKeySchema.findOne({ token });
    },
    async getById(id) {
        return await apiKeySchema.findById(id);
    },
    async getByDevId(developerId) {
        return await apiKeySchema.find({ developerId });
    },
    async getByProjectId(projectId) {
        return await apiKeySchema.find({ projectId });
    },
    // async getAll(offset = 0, limit = 10) {
    //     return await apiKeySchema.find({})
    //         .skip(offset)
    //         .limit(limit);
    // },
    // async count() {
    //     return await apiKeySchema.countDocuments();
    // }
};

module.exports = ApiKeyService;