const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        default: () => new mongoose.Types.ObjectId().toString()
    },
    name: {
        type: String,
        required: true,
        default:"Your nameprofess here"

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
        default:"Your description here"

    },

    resume_Pid: {
        type: String,
    },
    country:{
        type: String,
        default:"Your country here"

    },
    address:{
        type: String,
        default:"Your address here"

    },
    skills:{
        type:Array
    },
    profession:{
        type:String,
        default:"Your profession here"
    }
}, {
    collection: "Seeker"
})

module.exports = mongoose.models.seeker || mongoose.model('seeker', UserSchema);