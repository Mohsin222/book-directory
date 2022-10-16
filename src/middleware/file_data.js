
const multer = require("multer");



const uuid = require('uuid')

const FILE_TYPE_MAP = {
    "application/pdf": "pdf",
// "image/jpeg": "jpeg",
//       "image/jpg": "jpg",
  };

const storage =multer.diskStorage({
    destination: function(req, file, cb){
       

        const isValid = FILE_TYPE_MAP[file.mimetype];
       
        let uploadError = new Error("only pdf format file is acceptable");
        if (isValid) {
          uploadError = null;
        }

        cb(uploadError,'uploads/images')
    },
    filename:function(req,file,cb){
        console.log(file.mimetype); 
        const originalName =file.originalname
        const nameArray =originalName.split('.')
     const extension =nameArray[nameArray.length -1]
     //const extension =FILE_TYPE_MAP[file.mimetype]
        const newFileName =uuid.v1()+"."+extension

        cb(null,newFileName)
    }

    
})

const upload =multer({
    storage:storage
})

module.exports=upload