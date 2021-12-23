const getCorrectKeyboard = require( './keyboards')
const {getSpecialtiesText} = require('./callbackTexts')

const getMainScene = ctx => ctx.reply(getSpecialtiesText(), getCorrectKeyboard("regular"))

module.exports = getMainScene