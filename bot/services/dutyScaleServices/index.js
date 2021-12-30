const db = require ('./database')
const getCorrectKeyboard = require('./keyboards')
const {getSpecialtiesText,
    getMainScene} = require ('./callbackTexts')




module.exports = {
    db, 
    getCorrectKeyboard,
    getSpecialtiesText,
    getMainScene
}