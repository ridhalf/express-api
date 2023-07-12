const express = require ('express')
const cors = require('cors')
const mysql = require('mysql2')
const port = 3000

const sequelize = require('./db.config')
sequelize.sync().then(()=>{
    console.log('Database Ready!')})
//
const userRoute = require('./Routes/users')
const presenceRoute = require('./Routes/presence')


const app = express()
app.use(cors())
app.use(express.json())

//
app.use('/users',userRoute)
app.use('/presences',presenceRoute)

app.listen(port,()=>{
    console.log(`Running listen Port ${port}`)})