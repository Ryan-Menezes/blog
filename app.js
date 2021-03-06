// Dependencies
const path = require('path')
const express = require('express')
const passport = require('passport')
const handlebars = require('express-handlebars')
const session = require('express-session')
const flash = require('connect-flash')
const mongoose = require('mongoose')
const appConfig = require('./config/app')
const sessionConfig = require('./config/session')
const databaseConfig = require('./config/database')
const paginationConfig = require('./config/pagination')
const passwordConfig = require('./config/password')

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
        equals(val1, val2){
            return val1.toString() === val2.toString()
        },
        includes(collection, value){
            if(!Array.isArray(collection)){
                return false
            }

            return collection.find(v => v._id.toString() == value.toString())
        },
        for(from, to, incr, block) {
            var accum = ''

            for(var i = from; i <= to; i += incr)
                accum += block.fn(i)

            return accum;
        },
        validPages(pages){
            return pages && pages > 1
        }
    }
})

// Settings
app.use(session(sessionConfig))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
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

// require('./database/seeders/create_permissions')

// Middlewares
app.use(async (req, res, next) => {
    // Global
    req.page = req.query.page || 1
    req.page = (((req.page > 0) ? req.page : 1) - 1) * paginationConfig.limit

    req.helpers = {
        can: require('./app/helpers/can')(req),
        error_parser: require('./app/helpers/error_parser'),
        server_error: require('./app/helpers/server_error'),
        slugify: require('./app/helpers/slugify')
    }

    req.config = {
        app: appConfig,
        session: sessionConfig,
        database: databaseConfig,
        pagination: paginationConfig,
        password: passwordConfig
    }

    // Locals
    res.locals.auth = {
        user: req.user
    }

    res.locals.helpers = {
        can: require('./app/helpers/can')(req),
        error_parser: require('./app/helpers/error_parser'),
        server_error: require('./app/helpers/server_error'),
        slugify: require('./app/helpers/slugify')
    }

    res.locals.config = {
        app: appConfig,
        session: sessionConfig,
        database: databaseConfig,
        pagination: paginationConfig,
        password: passwordConfig
    }

    res.locals.messages = {
        successes: req.flash('msg_successes'),
        errors: req.flash('msg_errors'),
        error: req.flash('error')
    }

    next()
})

// Routes - SITE
app.use('/', require('./routes/site/index'))
app.use('/postagens', require('./routes/site/posts'))
app.use('/categorias', require('./routes/site/categories'))

// Routes - PANEL
require('./app/middlewares/passport')()

app.use('/painel/login', require('./routes/panel/login'))

app.use(require('./app/middlewares/auth'))
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