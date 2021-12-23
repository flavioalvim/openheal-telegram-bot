const db = require ('./database')
const getCorrectKeyboard = require('./keyboards')
const {getSpecialtiesText,
    getSubSpecialtyTelephonesText,
    getScaleText,getMainScene} = require ('./callbackTexts')
const {getRegularObject,
    getExtraObject}= require('./object')



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