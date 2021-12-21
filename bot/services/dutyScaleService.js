const fs = require('fs')
const Stage = require ('telegraf/stage')
const {leave} = Stage
const {KeyboardFromArray, Keyboard} = require ('../components/keyboard')

const getDb = () => JSON.parse(fs.readFileSync ('../scales.json')) //Json
const getSpecialties = () => getDb().map(item => item.specialty) //Array of Objects

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

const getSubSpecialtiesArray = (specialty) =>{

    try
    {
    const filter = getDb()
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


const buttons = [...getSpecialties(), "sair"] // Array of Objects
const regularKeyboard = new KeyboardFromArray(buttons) //Keboard
const returnKeyboard = new KeyboardFromArray(["Voltar"])
const scaleEchoKeyboard = new Keyboard(getScaleEchoKeyboardObject(), 1)
const scaleOrthopedicsKeyboard = new KeyboardFromArray(getSubSpecialtiesArray("ortopedia"), 1)

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
        command: "mão",
        action: "mão",
        callBack: (ctx)=>ctx.reply(getSubSpecialtyText("ortopedia", "mão"),getCorrectKeyboard("return"))
    }
] // Array of objects


const getMainScene = ctx => ctx.reply(getSpecialtiesScales(), getCorrectKeyboard("regular"))

const getScaleText = (specialty) => getDb()
    .filter(item => item.specialty == specialty)
    .map (item => item.scaleText).toString() // String de objetos filtrados

const getSubSpecialtyText = (specialty, subSpecialty) => {
    const filter = getDb()
        .filter(item => item.specialty == specialty)
        .map(item => item.professionals)
        .reduce ((acc,item)=>[...acc, ...item],[])
        .filter(item => item.subSpecialty.includes(subSpecialty))
        .reduce((acc, {name, telephone}) => `${acc}${name} - ${telephone}\n`,`${specialty} - ${subSpecialty}\n\n`)
        
        return filter
}





module.exports = { 
    getDb,
    getExtraCommandsAndActionsObject,
    getCorrectKeyboard,
    getMainScene,
}