const mongoose = require('mongoose')


const EmployerSchema = new mongoose.Schema({
    _id:{
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        default : ()=> new mongoose.Types.ObjectId().toString() 
    },
    name: {
        type: String,
        required: true,
        default:"your name here"
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
        default:"your intro here"

    },

    companyName: {
        type: String,
        default:"your company name here"
    },
    companyAddress : {
        type: String,
        default:"Company address here"
    }
},
{
    collection:"Employer"
}) 

module.exports = mongoose.models.employer || mongoose.model('employer',EmployerSchema)