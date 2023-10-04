const mongoose = require('mongoose')


const EmployerSchema = new mongoose.Schema({
    _id:{
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        default : ()=> new mongoose.Types.ObjectId().toString() 
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

    companyName: {
        type: String,
    }
},
{
    collection:"Employer"
}) 

module.exports = mongoose.models.employer || mongoose.model('employer',EmployerSchema)