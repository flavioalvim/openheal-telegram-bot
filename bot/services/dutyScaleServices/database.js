const fs = require('fs')
const db = () => JSON.parse(fs.readFileSync ('../scales.json')) 

module.exports = db