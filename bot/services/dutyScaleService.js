const fs = require('fs')
const Stage = require ('telegraf/stage')
const {enter, leave} = Stage
const {KeyboardFromArray, Keyboard} = require ('../components/keyboard')

const getDataBase = () => JSON.parse(fs.readFileSync ('../scales.json')) //Json
const db = getDataBase()
const getSpecialties = () => db.map(item => item.specialty) //Array of Objects

const getSpecialtiesScales = () => getSpecialties().reduce((acc,item)=>(`${acc} \n /${item}`),"Essas são as escalas de sobreaviso:") //String

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

const getScaleOrthopedicsKeyboardObject = () => {
    return [ "Mão", "Ombro e cotovelo", "Quadril", "Joelho", "Pé e tornozelo", "Coluna", "Politrauma e diáfises"]
}



const buttons = [...getSpecialties(), "sair"] // Array of Objects
const regularKeyboard = new KeyboardFromArray(buttons) //Keboard
const returnKeyboard = new KeyboardFromArray(["Voltar"])
const scaleEchoKeyboard = new Keyboard(getScaleEchoKeyboardObject(), 1)
const scaleOrthopedicsKeyboard = new KeyboardFromArray(getScaleOrthopedicsKeyboardObject(), 1)

const keyboarOptions  = {
    "ecocardiograma" : scaleEchoKeyboard,
    "ortopedia" : scaleOrthopedicsKeyboard,
    "regular" : regularKeyboard,
    "return" : returnKeyboard
}

const getCorrectKeyboard = (filter) => keyboarOptions[filter]?keyboarOptions[filter]:null


const getExtraCommandsAndActionsObject = ()=>
[
    {
        command: "sair",
        action : "sair",
        callBack : leave()
    },
    {
        command: "Voltar",
        action : "Voltar",
        callBack: getMainScene
    },
    {
        command: "Ver escala ecocardiograma",
        action: "Ver escala ecocardiograma",
        callBack: (ctx)=>ctx.reply(getScaleText("ecocardiograma"),getCorrectKeyboard("return"))
    },
    {
        command: "Ver escala ortopedia",
        action: "Ver escala ecocardiograma",
        callBack: (ctx)=>ctx.reply(getScaleText("ortopedia"),getCorrectKeyboard("return"))
    },
    {
        command: "Mão",
        action: "Mão",
        callBack: (ctx)=>ctx.reply("Aqui vai a mao",returnKeyboard)
    }
] // Array of objects


const getMainScene = ctx => ctx.reply(getSpecialtiesScales(), getCorrectKeyboard("regular"))

const getScaleText = (specialty) => getDataBase()
    .filter(item => item.specialty == specialty)
    .map (item => item.scaleText).toString() // String de objetos filtrados




//const getScaleOrthopedicsKeyboardObject = () => [ "Mão", "Ombro e cotovelo", "Quadril", "Joelho", "Pé e tornozelo", "Coluna", "Politrauma e diáfises"]





module.exports = { 
    getDataBase,
    getExtraCommandsAndActionsObject,
    getCorrectKeyboard,
    getMainScene,
}