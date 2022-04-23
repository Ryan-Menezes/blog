// Dependencies
const path = require('path')
const express = require('express')
const handlebars = require('express-handlebars')
const session = require('express-session')
const flash = require('connect-flash')
const mongoose = require('mongoose')
const appConfig = require('./config/app')
const sessionConfig = require('./config/session')
const databaseConfig = require('./config/database')
const paginationConfig = require('./config/pagination')

// Inicialization
const app = express()
const port = process.env.PORT || 3000

const hbs = handlebars.create({
    defaultLayout: 'site',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    },
    helpers: {
        dateFormat(date){
            return date.toLocaleString('pt-BR')
        },
        includes(collection, value){
            if(!Array.isArray(collection)){
                return false
            }

            return collection.find(v => v._id.toString() == value.toString())
        }
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

// Middlewares
app.use(async (req, res, next) => {
    // Global
    req.page = req.query.page || 1
    req.page = ((req.page > 0) ? req.page : 1) - 1

    req.helpers = {
        error_parser: require('./app/helpers/error_parser'),
        server_error: require('./app/helpers/server_error')
    }

    req.config = {
        app: appConfig,
        session: sessionConfig,
        database: databaseConfig,
        pagination: paginationConfig
    }

    // Locals
    res.locals.config = {
        app: appConfig,
        session: sessionConfig,
        database: databaseConfig
    }

    res.locals.messages = {
        successes: req.flash('msg_successes'),
        errors: req.flash('msg_errors')
    }

    next()
})

// Mongoose
mongoose.Promise = global.Promise
mongoose.connect(`mongodb://${databaseConfig.server}/${databaseConfig.name}`)
.then(() => console.log(`MongoDB Connected: mongodb://${databaseConfig.server}/${databaseConfig.name}`))
.catch(error => console.log(error))

// Routes
app.use('/painel', require('./routes/panel/index'))
app.use('/painel/usuarios', require('./routes/panel/users'))
app.use('/painel/postagens', require('./routes/panel/posts'))
app.use('/painel/categorias', require('./routes/panel/categories'))
app.use('/painel/funcoes', require('./routes/panel/roles'))
app.use('/painel/permissoes', require('./routes/panel/permissions'))

// Start Server
app.listen(port, async () => {
    console.log(`Server Started: http://localhost:${port}`)
})