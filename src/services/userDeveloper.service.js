import userDeveloperSchema from '../models/userDeveloper.model.js';

const UserDeveloperService = {
    async create(userDeveloperData) {
        return await userDeveloperSchema.create(userDeveloperData);
    },

    async updateById(id, updateData) {
        return await userDeveloperSchema.findByIdAndUpdate(id, updateData, { new: true });
    },

    async deleteById(id) {
        return await userDeveloperSchema.findByIdAndDelete(id);
    },

    async getById(id) {
        return await userDeveloperSchema.findById(id);
    },

    async getAll(offset = 0, limit = 10, query = {}) {
        return await userDeveloperSchema.find(query)
            .skip(offset)
            .limit(limit);
    },

    // differ for user and developer
    async count(query = {}) {
        return await userDeveloperSchema.countDocuments(query);
    }
};

export default UserDeveloperService;