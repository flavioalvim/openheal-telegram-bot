const fs = require('fs')

const getDataBase = () => JSON.parse(fs.readFileSync ('../scales.json')) //Json
const db = getDataBase()
const getSpecialties = () => db.map(item => item.specialty) //Array of Objects

const getScaleEchoKeyboardObject = ()=>
[
    { 
        text : "Ver escala",
        action: "Ver escala ecocardiograma"
    },
    {
        text : "Voltar",
        action: "Voltar"
    }]

//const getScaleOrthopedicsKeyboardObject = () => [ "Mão", "Ombro e cotovelo", "Quadril", "Joelho", "Pé e tornozelo", "Coluna", "Politrauma e diáfises"]
const getScaleOrthopedicsKeyboardObject = () => {
    return [ "Mão", "Ombro e cotovelo", "Quadril", "Joelho", "Pé e tornozelo", "Coluna", "Politrauma e diáfises"]
}


module.exports = { 
    getDataBase,
    getSpecialties,
    getScaleEchoKeyboardObject,
    getScaleOrthopedicsKeyboardObject

}