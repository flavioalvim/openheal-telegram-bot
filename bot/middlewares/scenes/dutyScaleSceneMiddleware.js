const Scene = require ('telegraf/scenes/base')
const Stage = require ('telegraf/stage')
const {enter, leave} = Stage
const {KeyboardFromArray, Keyboard} = require ('../../components/keyboard')
const fs = require('fs')
const {getDataBase, getSpecialties,getScaleEchoKeyboardObject, getScaleOrthopedicsKeyboardObject} = require ('../../services/dutyScaleService')


const dutyScaleScene = new Scene('dutyScaleScene') //Scene
const db = getDataBase()
const specialties = getSpecialties()
const buttons = [...specialties, "sair"] // Array of Objects

const regularKeyboard = new KeyboardFromArray(buttons) //Keboard
const returnKeyboard = new KeyboardFromArray(["Voltar"])
const scaleEchoKeyboard = new Keyboard(getScaleEchoKeyboardObject(), 1)
const scaleOrthopedicsKeyboard = new KeyboardFromArray(getScaleOrthopedicsKeyboardObject(), 1)


const keyboarOptions  = {
    "ecocardiograma" : scaleEchoKeyboard,
    "ortopedia" : scaleOrthopedicsKeyboard
}

const getCorrectKeyboard = (filter) => keyboarOptions[filter]?keyboarOptions[filter]:null
const getSpecialtiesScales = () => specialties.reduce((acc,item)=>(`${acc} \n /${item}`),"Essas são as escalas de sobreaviso:") //String
const getScaleText = (specialty) => db
    .filter(item => item.specialty == specialty)
    .map (item => item.scaleText).toString() // String de objetos filtrados

    
const regularCommandsAndActions = db.map(({specialty, professionals}) =>({
    command: specialty,
    action :specialty,
    callBack: (ctx)=>{
        const telephonesText = professionals.reduce((acc,{name, telephone}) => (`${acc}\n${name} - ${telephone}\n`), `Lista de telefones - ${specialty}\n`)
        ctx.reply(telephonesText, getCorrectKeyboard(specialty))}
})) //Array of Objects

const extraCommandsAndActions = [
    {
        command: "sair",
        action : "sair",
        callBack : leave()
    },
    {
        command: "Voltar",
        action : "Voltar",
        callBack: (ctx)=>ctx.reply("Voltar")
    },
    {
        command: "Ver escala ecocardiograma",
        action: "Ver escala ecocardiograma",
        callBack: (ctx)=>ctx.reply(getScaleText("ecocardiograma"),returnKeyboard)
    },
    {
        command: "Ver escala ortopedia",
        action: "Ver escala ecocardiograma",
        callBack: (ctx)=>ctx.reply(getScaleText("ortopedia"),returnKeyboard)
    },
    {
        command: "Mão",
        action: "Mão",
        callBack: (ctx)=>ctx.reply("Aqui vai a mao",returnKeyboard)
    }
] // Array of objects
    
    const commandsAndActions = [...regularCommandsAndActions, ...extraCommandsAndActions]


dutyScaleScene.enter(ctx=>ctx.reply(getSpecialtiesScales(), regularKeyboard))
dutyScaleScene.leave(ctx=>ctx.reply("Saindo do mudulo escala. Digite algo para novas opções"))

commandsAndActions.forEach(({command, callBack})=>{
    dutyScaleScene.command(command,callBack)
})
dutyScaleScene.on('message', ctx=>ctx.reply(getSpecialtiesScales(),regularKeyboard))

commandsAndActions.forEach(({action, callBack})=> {
    dutyScaleScene.action(action,callBack)
})


module.exports = {dutyScaleScene}