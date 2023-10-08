const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    employerId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'employer',
    },
    jobTitle: {
        type: String,
        require: true
    },
    jobDescription: {
        type: String,
    },
    companyName: {
        type: String,
    },
    education: {
        type: String,
    },
    skillsrequire: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now()
    },
    location: {
        type: String,
        require:true
    },
    contactInfo :{
        type:String,
        require:true
    },
    contractType: {
        type: String,
    },
    workType: {
        type: String,
    },
    response:{
        type: String,
        require:true
    },
    status:{
        type: String,
        default : 'active', 
    }

}, {
    collection: "Jobs"
})

module.exports = mongoose.models.job || mongoose.model('job', UserSchema);