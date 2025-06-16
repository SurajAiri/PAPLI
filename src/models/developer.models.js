import mongoose from 'mongoose';


// developer: id, name, email, password, role, createdAt, google id
const developerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    authProvider: {
        type: String,
        enum: ['google'],
        default: 'google'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
export default mongoose.model('Developer', developerSchema);
