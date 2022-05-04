module.exports = (code, res) => {
    return res.render('error', {
        layout: false,
        code
    })
}