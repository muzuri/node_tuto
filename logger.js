function log (req, res, next) {
    console.log(`Authentication ...`)
    next()
}
module.exports = log;