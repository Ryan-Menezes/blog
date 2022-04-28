const Permission = require('../../app/models/Permission')

const actions = ['view', 'create', 'edit', 'delete']
const modules = ['users', 'posts', 'categories', 'roles', 'permissions']

Permission.deleteMany()
.then(async result => {
    await actions.forEach(action => {
        modules.forEach(module => {
            const permission = new Permission({
                name: `${action}.${module}`,
                description: `${action}.${module}`
            })

            permission.save()
        })
    })

    await require('./create_roles')
})
.catch(error => console.log(error))