const express = require('express')
const router = require('./routes/routes')
const mongoose = require('mongoose')
const errorMiddleware = require('./middlewares/errorMiddleware')
require('dotenv').config()

const PORT = process.env.PROT || 4040
const URI = process.env.DB

const app = express()
app.use(express.json())
app.get('/', (req, res)=>{
    res.json({
        success: true, 
        message: "Hello from the server."
    })
})

app.use('/api',router)

mongoose.connect(URI).then(()=> console.log('Database connected successfully.')).catch(err=>console.log(err))

app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))
app.use(errorMiddleware)