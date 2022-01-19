const routines = require('./routines')
const phonesBySpecialty = require('./phonesBySpecialty')
const template = require('./template')

module.exports = {
    ...routines,
    ...phonesBySpecialty,
    template,
}
