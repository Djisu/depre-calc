// Declare the essentials for the application
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const path = require('path')

// Declare the entities needed for the routing
const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const country = require('./routes/api/country')
const department = require('./routes/api/department')
const fixedassets = require('./routes/api/fixedassets')
const insurer = require('./routes/api/insurer')
const location = require('./routes/api/location')
const assettype = require('./routes/api/assettype')

// Assign express to a variable
const app = express()

// Bodyparser Middleware
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

// DB Config: we need the mongoDB keys for connection purposes
const db = require('./config/keys').mongoURI

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('Mongodb connected'))
  .catch(err => console.log(err))

// Passport middleware
app.use(passport.initialize())

// Passport Config
require('./config/passport')(passport)

// Use Routes.NOTE NO FULL STOPS AT THE BEGINNING
app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/country', country)
app.use('/api/department', department)
app.use('/api/fixedassets', fixedassets)
app.use('/api/insurer', insurer)
app.use('/api/location', location)
app.use('/api/assettype', assettype)

// Server static assets if in production
if(process.env.NODE_ENV === 'production'){
  // Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on ${port}`))