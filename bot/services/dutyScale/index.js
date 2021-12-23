const db = require ('./database')
const getCorrectKeyboard = require('./keyboards')
const {getSpecialtiesText,
    getSubSpecialtyTelephonesText,
    getScaleText} = require ('./callbackTexts')
const {getRegularObject,
    getExtraObject}= require('./object')
const getMainScene = require('./services')


module.exports = {
    db, 
    getCorrectKeyboard,
    getSpecialtiesText,
    getSubSpecialtyTelephonesText,
    getScaleText,
    getRegularObject,
    getExtraObject,
    getMainScene
}