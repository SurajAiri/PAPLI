import commandSchema from '../models/command.models.js';

// todo: reconfigure this service properly in next version
const CommandService = {
    async create(commandData) {
        const command = new commandSchema(commandData);
        return await command.save();
    },

    async deleteById(id) {
        return await commandSchema.findByIdAndDelete(id);
    },

    async getById(id) {
        return await commandSchema.findById(id);
    },

    async getAllByProjectId(projectId, offset = 0, limit = 10,status= 'created') {
        return await commandSchema.find({ projectId,status })
            .skip(offset)
            .limit(limit);
    },
    
    async getAllByUserId(userId, offset = 0, limit = 10,status= 'created') {
        return await commandSchema.find({ userId,status })
            .skip(offset)
            .limit(limit);
    },

    async count(filters = {}) {
        return await commandSchema.countDocuments(filters);
    },

    async updateStatus(id, status) {
        return await commandSchema.findByIdAndUpdate(id, { status }, { new: true });
    },
};

export default CommandService;