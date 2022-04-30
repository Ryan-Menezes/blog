const path = 'site/'

module.exports = {
    index: async (req, res, next) => {
        res.render(`${path}index`, {
            layout: 'site'
        })
    }
}