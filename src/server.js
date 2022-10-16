const express =require('express')
const port =process.env.PORT || 8000
require('./connection/conn')

const app =express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//for static files
app.use(express.static('uploads'))
app.use(express.static('uploads/images'))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.get('/zebra',(req,res)=>{
    res.json({data:"HELLO"})
})

//book route
const bookRoute = require('./routes/book_route')
app.use('/book',bookRoute)

//author route
const authorRoute = require('./routes/auther_routes')
app.use('/author',authorRoute)



app.listen(port,()=>{
    console.log(`Server is running at ${port}`)
})


