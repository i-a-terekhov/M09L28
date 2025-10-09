const mongoose = require('mongoose');
const config = require("../config/config");

const FreelancerSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    avatar: String,
    email: {
        type: String,
        required: 'e-mail is required',
        unique: 'this e-mail already exist',
    },
    education: String,
    location: String,
    skills: String,
    info: String,
    level: {
        type: String,
        enum: [config.freelancerLevels.junior, config.freelancerLevels.middle, config.freelancerLevels.senior],
        default: config.freelancerLevels.junior
    },
}, {
    timestamps: true,
});

const FreelancerModel = mongoose.model('Freelancer', FreelancerSchema);

module.exports = FreelancerModel;