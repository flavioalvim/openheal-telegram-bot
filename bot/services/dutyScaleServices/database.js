const fs = require('fs')
const db = () => JSON.parse(fs.readFileSync(__dirname + '/scales.json')) 

module.exports = db