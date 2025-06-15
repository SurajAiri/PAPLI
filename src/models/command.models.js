// command.models.js: apiKeyId, projectId, userId, payload, status, createdAt, updatedAt

const { mongoose } = require('mongoose');


const commandSchema = new mongoose.Schema({
    apiKeyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ApiKey',
        required: true
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    payload: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        enum: ['created','queued','delivered','failed','completed'],
        default: 'created'
    }
}, { timestamps: true });
export default mongoose.model('Command', commandSchema);

