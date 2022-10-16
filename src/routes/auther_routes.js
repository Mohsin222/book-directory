const express = require('express')
const router = express.Router();
const authorController= require('../controller/author_controller')



//create author
router.post('/',authorController.createAuthor)


//get all authors
router.get('/',authorController.getAllAuthors)

//login author
router.post('/login',authorController.loginAuthor)
module.exports=router