const User = require('../../app/models/User')
const Role = require('../../app/models/Role')

const bcrypt = require('bcryptjs')
const passwordConfig = require('../../config/password')

User.deleteMany()
.then(result => {
    Role.findOne({
        name: 'Administrador'
    })
    .then(role => {
        if(!role){
            return role
        }

        const user = new User({
            first_name: 'Ryan',
            last_name: 'Menezes',
            email: 'menezesryan1010@gmail.com',
            password: '12345678',
            role: role._id
        })

        bcrypt.genSalt(passwordConfig.salt, (error, salt) => {
            if(error){
                return console.log(error)
            }

            bcrypt.hash(user.password, salt, (error, hash) => {
                if(error){
                    return console.log(error)
                }

                user.password = hash

                user.save()
            })
        })
    })
    .catch(error => console.log(error))
})
.catch(error => console.log(error))