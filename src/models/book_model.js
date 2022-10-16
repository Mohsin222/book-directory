const mongoose =require('mongoose')
const uuid =require('uuid')
const bookSchema = new mongoose.Schema({
  
    title: { type: String,required:true},

      publistDate: { type: Date,default:Date.now},

      status:{type:String,default:"Publish"},

      pageCount:{type:Number,default:0},

      bookfile:{type:String, },

      author:{type:mongoose.Schema.Types.ObjectId, ref:"Author"},

      category:{type:String,required:true ,default:''},

      bookid:{type:String,unique:true,default:uuid.v1()},
})
module.exports = mongoose.model('Book', bookSchema);