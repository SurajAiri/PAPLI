import mongoose from 'mongoose';

// apiKey: id, token, developerId, projectId, createdAt, 
const apiKeySchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    developerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Developer',
        required: true
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    }
}, { timestamps: true });
export default mongoose.model('ApiKey', apiKeySchema);