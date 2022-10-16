const mongoose =require('mongoose')
const uuid =require('uuid')

const authorSchema = new mongoose.Schema({

    name:{type:String,  required: [true, "name required."],},
    email:{type:String,required:true ,unique:true},
    password:{type:String, required:true},
    userid:{type:String,required:true,default:uuid.v1()}
})

module.exports = mongoose.model('Author', authorSchema);