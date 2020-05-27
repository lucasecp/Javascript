const mongoose = require('mongoose')

const TestSchema = new mongoose.Schema({
    name: {type:String,required:true},
    age: Number,
    email:{type:String,required:true}
})

const testModel= mongoose.model('Login',TestSchema)
