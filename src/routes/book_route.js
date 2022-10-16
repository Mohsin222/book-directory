const express = require('express')
const router = express.Router();
const bookController= require('../controller/book_controller')
const upload =require('../middleware/file_data')
//create book
router.post('/',upload.single('image'),bookController.postBook)

//get all books
router.get('/',bookController.getAllBooks)

//get book by id
router.get('/:bookid',bookController.getBookById)

//delete book with bookid
router.delete('/delete',bookController.deleteBook)

//update book with bookid
router.put('/update',upload.single('image'),bookController.updateBook)
module.exports =router