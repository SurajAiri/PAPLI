// project: id, logo, short desc, title, description, developerId
const { mongoose } = require('mongoose');

const projectSchema = new mongoose.Schema({
    logo: {
        type: String,
        required: true,
        trim: true
    },
    shortDesc: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    developerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Developer',
        required: true
    }
}, { timestamps: true });
export default mongoose.model('Project', projectSchema);