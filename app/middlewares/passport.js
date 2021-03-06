const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

module.exports = async () => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        User.findOne({
            email
        })
        .then(user => {
            if(!user){
                return done(null, false, {
                    message: 'E-Mail ou senha inválidos!'
                })
            }

            bcrypt.compare(password, user.password, (error, result) => {
                if(!result){
                    return done(null, false, {
                        message: 'E-Mail ou senha inválidos!'
                    })
                }

                return done(null, user)
            })
        })
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id).populate('role')
        .then(user => {
            Role.findById(user.role._id).populate('permissions')
            .then(role => {
                user.role = role    
                done(null, user)
            })
            .catch(error => {
                done(error, null)
            })
        })
        .catch(error => {
            done(error, null)
        })
    })
}