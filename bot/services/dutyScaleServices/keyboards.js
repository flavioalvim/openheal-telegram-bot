const {KeyboardFromArray, Keyboard} = require ('../../components/keyboard')
const db = require('./database')
const getSubSpecialtiesArray = require ("./utils.js")

const getCorrectKeyboard = (option) =>{

    const getSpecialties = db().map(item => item.specialty) //Array of Objects
    const buttons = [...getSpecialties, "sair","texto"] // Array of Objects
    const regularKeyboard =  new KeyboardFromArray(buttons) //Keboard
    const returnKeyboard =  new KeyboardFromArray(["Voltar"])
    const scaleEchoKeyboard = new Keyboard(getEchoKeyboardObject(), 1)
    const scaleOrthopedicsKeyboard =  new KeyboardFromArray([...getSubSpecialtiesArray("Ortopedia"),"Voltar"], 1)
    const createScaleKeybord = (action, columns) => new Keyboard([{text: "Ver escala", action:action},{text: "Voltar", action: "Voltar"}], columns) 

    const keyboardOptions  = {
        "Ecocardiograma" : scaleEchoKeyboard,
        "Ortopedia" : scaleOrthopedicsKeyboard,
        "Urologia" : returnKeyboard,
        "regular" : regularKeyboard,
        "return" : returnKeyboard,
        "verEscalaMao" : createScaleKeybord("mão",1) 
    }

    function getEchoKeyboardObject () {
        return (
[
    { 
        text : "Ver escala",
        action: "Ver escala ecocardiograma"
    },
    {
        text : "Voltar",
        action: "Voltar"
    }])}


    return (keyboardOptions[option])
}


module.exports = getCorrectKeyboard