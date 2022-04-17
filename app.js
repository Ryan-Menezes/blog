// Dependencies
const path = require('path')
const express = require('express')
const handlebars = require('express-handlebars')
const session = require('express-session')
const flash = require('connect-flash')
const mongoose = require('mongoose')
const sessionConfig = require('./config/session')
const databaseConfig = require('./config/database')

// Inicialization
const app = express()
const port = process.env.PORT || 3000

const hbs = handlebars.create({
    defaultLayout: 'site',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
})

// Settings
app.use(session(sessionConfig))
app.use(flash())
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'app', 'views'))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static(path.join(__dirname, 'public')))

// Mongoose
mongoose.Promise = global.Promise
mongoose.connect(`mongodb://${databaseConfig.server}/${databaseConfig.name}`)
.then(() => console.log(`MongoDB Connected: mongodb://${databaseConfig.server}/${databaseConfig.name}`))
.catch(error => console.log(error))

// Start Server
app.listen(port, async () => {
    console.log(`Server Started: http://localhost:${port}`)
})