const {KeyboardFromArray, Keyboard} = require ('../../components/keyboard')
const db = require('./database')

const getCorrectKeyboard = (option) =>{

    const getSpecialties = db().map(item => item.specialty) //Array of Objects
    const buttons = [...getSpecialties, "sair"] // Array of Objects
    const regularKeyboard =  new KeyboardFromArray(buttons) //Keboard
    const returnKeyboard =  new KeyboardFromArray(["Voltar"])
    const scaleEchoKeyboard = new Keyboard(getEchoKeyboardObject(), 1)
    const scaleOrthopedicsKeyboard =  new KeyboardFromArray(getSubSpecialtiesArray("Ortopedia"), 1)
    const createScaleKeybord = (action, columns) => new Keyboard([{text: "Ver escala", action:action},{text: "Voltar", action: "Voltar"}], columns) 

    const keyboardOptions  = {
        "Ecocardiograma" : scaleEchoKeyboard,
        "Ortopedia" : scaleOrthopedicsKeyboard,
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

    function getSubSpecialtiesArray (specialty) {

        try
        {
        const filter = db()
            .filter(item => item.specialty == specialty)
            .map(item => item.professionals)
            .reduce ((acc,item)=>[...acc, ...item],[])
            .map(item =>item.subSpecialty)
            .reduce((acc,item) => [...acc , ...item],[])
    
        return ([...new Set(filter),"Voltar"])
        
        }
        catch
        {
            console.log("Parece que essa especialidade nao tem subespecialidades")
        }}


    return (keyboardOptions[option])
}


module.exports = getCorrectKeyboard