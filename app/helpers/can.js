module.exports = (req) => {
    return (pname) => {
        const res =  req.user.role.permissions.find(permission => {
            if(permission.name == pname){
                return true
            }
        })
        
        return res
    }
}