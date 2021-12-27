const db = require ('./database')
const getCorrectKeyboard = require('./keyboards')
const {getSpecialtiesText,
    getMainScene} = require ('./callbackTexts')
const {getRegularObject,
    getExtraObject}= require('./object')



module.exports = {
    db, 
    getCorrectKeyboard,
    getSpecialtiesText,
    getRegularObject,
    getExtraObject,
    getMainScene
}