var cloud_path ='mongodb+srv://mohsin:123@cluster0.xgm3y.mongodb.net/notesdb'
const mongoose =require('mongoose')
var conection = mongoose.connect(cloud_path, {

  })
  .then(result => {
 console.log('Connection successfull');
  }).catch(err =>{
    console.log('Connection ERROR')
  })

  module.exports=conection


  //"mongodb://localhost:27017/book_directory"