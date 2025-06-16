import { get } from 'mongoose';
import developerSchema from '../models/developer.models.js';

// create, updateById, deleteById, getById, getAll, count
const DeveloperService = {
    async create(developerData) {
        console.log("Creating developer with data:", developerData);
        return await developerSchema.create(developerData);
    },

    async updateById(id, updateData) {
        return await developerSchema.findByIdAndUpdate(id, updateData, { new: true });
    },

    async deleteById(id) {
        return await developerSchema.findByIdAndDelete(id);
    },

    async getById(id) {
        return await developerSchema.findById(id);
    },

    async getByEmail(email) {
        return await developerSchema.findOne({ email });
    },

    async getAll(offset = 0, limit = 10) {
        return await developerSchema.find({})
            .skip(offset)
            .limit(limit);
    },

    async count() {
        return await developerSchema.countDocuments();
    }
};

export default DeveloperService;
