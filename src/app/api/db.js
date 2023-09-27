const mongoose = require('mongoose')
const name = process.env.name
const pass = process.env.password

const uri = `mongodb+srv://${name}:${pass}@cluster0.eczrsa5.mongodb.net/jobForge` 
const connectToMongo = ()=>{ 
    try {
        mongoose.connect(uri)
        console.log("connected")
    } catch (error) {
        console.log(error)
    }
     
} 

module.exports = connectToMongo
