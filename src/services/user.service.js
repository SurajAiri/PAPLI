const userSchema = require('../models/user.models');

const UserService = {
    async create(userData) {
        return await userSchema.create(userData);
    },

    async updateById(id, updateData) {
        return await userSchema.findByIdAndUpdate(id, updateData, { new: true });
    },

    async deleteById(id) {
        return await userSchema.findByIdAndDelete(id);
    },

    async getById(id) {
        return await userSchema.findById(id);
    },
    
    async getAll(offset = 0, limit = 10, developerId) {
        const query = developerId ? { developerId } : {};
        return await userSchema.find(query)
            .skip(offset)
            .limit(limit);
    },

    async count(developerId) {
        const query = developerId ? { developerId } : {};
        return await userSchema.countDocuments(query);
    },

    async getByEmail(email) {
        return await userSchema.findOne({ email });
    },

    async getByUsername(username) {
        return await userSchema.findOne({ username });
    },

    async getById(id) {
        return await userSchema.findById(id);
    }

};
module.exports = UserService;