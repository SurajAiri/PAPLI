// userDeveloper.models.js: devId, userId, permissions, projectId

import mongoose from 'mongoose';

const userDeveloperSchema = new mongoose.Schema({
    devId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Developer',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // permissions: {
    //     type: [String],
    //     enum: ['read', 'write', 'admin'],
    //     default: ['read']
    // },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    }
},
 { timestamps: true });

export default mongoose.model('UserDeveloper', userDeveloperSchema);