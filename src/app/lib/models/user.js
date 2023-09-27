const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  _id:{
    type:mongoose.Schema.Types.ObjectId,
<<<<<<< HEAD
    unique:true,
    default : () => new mongoose.Types.ObjectId().toString()
=======
    unique:true
>>>>>>> ddcbfc825883fcc7f8cedef879d2c7630873c650
  },
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
<<<<<<< HEAD
    avatar_Pid:{
        type:String,
    },
=======
>>>>>>> ddcbfc825883fcc7f8cedef879d2c7630873c650
    date:{
        type:Date,
        default : Date.now()
    },
    description:{
        type:String,
    },
<<<<<<< HEAD
    resume_Pid:{
        type:String,
=======
    resume:{
        type:Blob,
>>>>>>> ddcbfc825883fcc7f8cedef879d2c7630873c650
    }
},{
  collection:"Seeker"
})

module.exports = mongoose.models.user || mongoose.model('user',UserSchema) ;