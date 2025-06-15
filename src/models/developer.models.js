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
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ['admin', 'developer'],
        default: 'developer'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
export default mongoose.model('Developer', developerSchema);
