const Role = require('../../app/models/Role')
const Permission = require('../../app/models/Permission')

Role.deleteMany()
.then(result => {
    Permission.find({}, {_id: true})
    .then(async permissions => {
        const role = new Role({
            name: 'Administrador',
            description: 'Administrador total do sistema',
            permissions: permissions
        })

        await role.save()

        await require('./create_users')
    })
    .catch(error => console.log(error))
})
.catch(error => console.log(error))