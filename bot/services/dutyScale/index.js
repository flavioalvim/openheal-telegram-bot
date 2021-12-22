const db = require ('./database')
const getCorrectKeyboard = require('./keyboards')
const {getSpecialtiesText,
    getSubSpecialtyTelephonesText,
    getScaleText} = require ('./textsToReturn')


module.exports = {
    db, 
    getCorrectKeyboard,
    getSpecialtiesText,
    getSubSpecialtyTelephonesText,
    getScaleText}