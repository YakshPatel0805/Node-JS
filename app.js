const express = require('express')
const path = require('path')
const UserRoutes = require('./backend/routes/userRoutes')

const app = express()

// Add JSON parser middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'frontend')))

// routes
app.use('/', UserRoutes)

app.listen(3000, ()=> console.log('Server Started on http://localhost:3000'))
