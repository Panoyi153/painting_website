const expressjwt = require('express-jwt')
const key = 'art_panoyi_153'
const jwtauth = expressjwt({ secret: key, algorithms: ['HS256'] }).unless({ path: ['/users/login'] })

module.exports = jwtauth

