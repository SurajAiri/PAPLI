import projectSchema from '../models/project.model.js';

const ProjectService = {
    async create(projectData) {
        return await projectSchema.create(projectData);
    },

    async updateById(id, updateData) {
        return await projectSchema.findByIdAndUpdate(id, updateData, { new: true });
    },

    async deleteById(id) {
        return await projectSchema.findByIdAndDelete(id);
    },

    async getById(id) {
        return await projectSchema.findById(id);
    },

    async getAll(offset = 0, limit = 10, developerId) {
        const query = developerId ? { developerId } : {};
        return await projectSchema.find(query)
            .skip(offset)
            .limit(limit);
    },

    async count(developerId) {
        const query = developerId ? { developerId } : {};
        return await projectSchema.countDocuments(query);
    }
};

export default ProjectService;