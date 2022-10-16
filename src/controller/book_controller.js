const { find } = require('../models/author_model')
const bookModel = require('../models/book_model')
const fs = require('fs')
exports.postBook = async (req, res) => {
    const file = req.file


    const data = req.body



    const book = await bookModel({
        bookid: data.bookid,
        title: data.title,
        category: data.category,
        author: data.author,
        bookfile: "http://localhost:8000/" + file.filename
    })
    try {

        await book.save(function (err) {
            if (err) {
                res.status(400).json({ success: false, error: err })
                return
            }
            res.status(200).json({ success: true, data: book })

        })


    } catch (error) {
        res.status(400).send({ err: error })
    }
}

//get all books
exports.getAllBooks = async (req, res) => {
    const books = await bookModel.find().populate('author')

    if (!books) {
        res.status(400).json({ success: false, error: 'not found' })
      //  return
    }
    res.status(200).json({ success: true, results: books.length, data: books, })
    return
}

//get book by id
exports.getBookById = async (req, res) => {
    try {
        const bookid = req.params.bookid
        const book = await bookModel.findOne({ bookid: bookid }).populate('author')




        if (!book) {
            res.status(400).json({ success: false, error: 'not found' })
       //     return
        }
        res.status(200).json({ success: true, data: book })
    } catch (error) {
        console.log(error)
    }
}


//delete book
exports.deleteBook = async (req, res) => {
    const data = req.body
    const bookid = data.bookid


    const findBook = await bookModel.findOne({ bookid: bookid }).populate('author');


    if (!findBook) {
        res.json({ success: false, err: 'not found' })
        return
    }
    if (data.userid === findBook.author.userid) {
        const file_name =findBook.bookfile.split('/')
       
     try {
        const path = `./uploads/images/${file_name[file_name.length -1]}` 
       
        fs.unlinkSync(path);
     } catch (error) {
        res.json({success:false,error:error})
        return
     }

        await findBook.deleteOne();
        res.json({ success: true, data: 'deleted successfully' });
    } else {
        res.json({ success: false, err: 'Only Book author delete this ' });
        return
    }
}



exports.updateBook =async(req,res)=>{
//is ma agr file send karege to oldfilepath ka zarya purani file delete kar de ge

    const data = req.body
    const bookid = data.bookid
    const oldfilePath =data.bookfile
    const file = req.file
    const findBook = await bookModel.findOne({ bookid: bookid }).populate('author');

    if (!findBook) {
        res.json({ success: false, err: 'not found' })
        return
    }else{
        if (data.userid === findBook.author.userid){

            if(!file){
                await bookModel.findOneAndUpdate({bookid:findBook.bookid},data,{new:true})
                res.json({ success: true, data: findBook });
            }else{
            const newFile =     "http://localhost:8000/" + file.filename
            data.bookfile=newFile
                await findBook.updateOne({bookid:findBook.bookid},data,{new:true})
                try {
                    const oldfilePath =oldfilePath.split('/')
           
                    const path = `./uploads/images/${oldfilePath[oldfilePath.length -1]}` 
                     
                    fs.unlinkSync(path);
                } catch (error) {
                    console.log(error)
                }
          
    
                res.json({ success: true, data: findBook });
            }
    
        }
    }
  

}