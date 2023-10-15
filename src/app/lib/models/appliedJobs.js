const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'jobs',
    },
    employerId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'employer',
    },
    seekerId: {
        type: mongoose.Types.ObjectId,
        require: true,
        ref:'seeker'
    },
    date: {
        type: Date,
        default: Date.now()
    },
    proposal:{
        type: String,
        require:true
    },
    status:{
        type: String,
        default : 'pending', 
    },
    jobStatus:{
        type: String,
        require: true
    },
    resume:{
        type: Boolean,
        require: true,
    },
    interviewDate:{
        type:Date,
    }
}, {
    collection: "AppliedJobs"
})

module.exports = mongoose.models.appliedJobs || mongoose.model('appliedJobs', UserSchema);