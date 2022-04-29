module.exports = (req) => {
    return (pname) => {
        if(req && req.user && req.user.role && req.user.role.permissions){
            return req.user.role.permissions.find(permission => {
                if(permission.name == pname){
                    return true
                }
            })
        }

        return false
    }
}