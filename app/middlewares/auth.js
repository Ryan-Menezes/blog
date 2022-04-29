module.exports = async (req, res, next) => {
    if(!req.isAuthenticated()){
        return req.helpers.server_error(404, res)
    }

    next()
}