const {KeyboardFromArray, Keyboard} = require ('../../components/keyboard')
const db = require('./database')
const getSubSpecialtiesArray = require ("./utils.js/index.js")

const getCorrectKeyboard = (option, specialty = "") =>{

    const getSpecialties = db().map(item => item.specialty) //Array of Objects
    const buttons = [...getSpecialties, "sair","texto"] // Array of Objects
    const regularKeyboard =  new KeyboardFromArray(buttons) //Keboard
    const returnKeyboard =  new KeyboardFromArray(["Voltar"])
    const subSpecialtyKeyboard = new KeyboardFromArray([...getSubSpecialtiesArray(specialty),"Voltar"])
    const seeScaleKeyboard = new Keyboard([{text:"Ver escala" , action: "padrao"},{text:"Voltar" , action: "Voltar"}],1)

    const keyboardOptions  =  {
        "regular" : regularKeyboard,
        "subSpecialty": subSpecialtyKeyboard,
        "return" : returnKeyboard,
        "seeScale" : seeScaleKeyboard

    }

    return (keyboardOptions[option])
}


module.exports = getCorrectKeyboard