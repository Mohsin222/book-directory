const authorModel = require('../models/author_model')

exports.createAuthor =async(req,res)=>{

    const data= req.body
    const authorData =await authorModel(data)

    await authorData.save( function(err){
        if(err){
            res.status(400).json({success:false,error:err})
            return 
        }
        res.status(200).json({success:true,data:authorData})
    })
}

//login author
exports.loginAuthor=async(req,res)=>{
    const data =req.body

    const findUser= await authorModel.findOne({email:data.email})
    if(!findUser){
        res.status(400).json({success:false,error:'User not found'})
        return 
    }
    if(findUser.password != data.password){
        res.status(400).json({success:false,error:'password not correct'})
        return 
    }
    res.status(200).json({success:true,data:findUser})

 
}

//get all author
exports.getAllAuthors =async(req,res)=>{
    const authors =await authorModel.find()

    if(!authors){
        res.status(400).json({success:false,error:'not found'})
        return 
    }
    res.status(200).json({success:true,results:authors.length,data:authors,})
    return 
}