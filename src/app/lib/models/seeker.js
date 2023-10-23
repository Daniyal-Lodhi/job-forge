const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        default: () => new mongoose.Types.ObjectId().toString()
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    avatar_Pid: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now()
    },
    description: {
        type: String,
    },

    resume_Pid: {
        type: String,
    },
    country:{
        type: String
    },
    address:{
        type: String
    },
    skills:{
        type:Array
    },
    profession:{
        type:String,
    }
}, {
    collection: "Seeker"
})

module.exports = mongoose.models.seeker || mongoose.model('seeker', UserSchema);