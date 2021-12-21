const Scene = require ('telegraf/scenes/base')
const Stage = require ('telegraf/stage')
const {enter, leave} = Stage
const {KeyboardFromArray, Keyboard} = require ('../components/keyboard')
const fs = require('fs')
const internal = require('stream')

const dutyScaleScene = new Scene('dutyScaleScene') //Scene
const db = JSON.parse(fs.readFileSync ('../scales.json')) //Json
const specialties = db.map(item => item.specialty) //Array of Objects
const buttons = [...specialties, "sair"] // Array of Objects


const k = new KeyboardFromArray(buttons) //Keboard
const returnKeyboard = new KeyboardFromArray(["Voltar"])
const scaleEchoKeyboard = new Keyboard([
    { 
        text : "Ver escala",
        action: "Ver escala ecocardiograma"
    },
    {
        text : "Voltar",
        action: "Voltar"
    }], 1)
const scaleOrthopedicsButtons = new KeyboardFromArray([ "Mão", "Ombro e cotovelo", "Quadril", "Joelho", "Pé e tornozelo", "Coluna", "Politrauma e diáfises"], 1)


const keyboarOptions  = {
    "ecocardiograma" : scaleEchoKeyboard,
    "ortopedia" : scaleOrthopedicsButtons
}

const getCorrectKeyboard = (specialty) => keyboarOptions[specialty]?keyboarOptions[specialty]:null
console.log ()
const getSpecialties = () => specialties.reduce((acc,item)=>(`${acc} \n /${item}`),"Essas são as escalas de sobreaviso:") //String
const getScaleText = (specialty) => db
    .filter(item => item.specialty == specialty)
    .map (item => item.scaleText).toString() // String de objetos filtrados



dutyScaleScene.enter(ctx=>ctx.reply(getSpecialties(), k))
dutyScaleScene.leave(ctx=>ctx.reply("Saindo do mudulo escala. Digite algo para novas opções"))

const regularCommands = db.map(({specialty, professionals}) =>({
    command: specialty,
    callBack: (ctx)=>{
        const telephonesText = professionals.reduce((acc,{name, telephone}) => (`${acc}\n${name} - ${telephone}\n`), `Lista de telefones - ${specialty}\n`)
        ctx.reply(telephonesText, getCorrectKeyboard(specialty))}
})) //Array of Objects

const extraCommands = [
    {
        command: "sair", 
        callBack : leave()
    },
    {
        command: "Voltar",
        callBack: (ctx)=>ctx.reply("Voltar")
    },
    {
        command: "Ver escala ecocardiograma",
        callBack: (ctx)=>ctx.reply(getScaleText("ecocardiograma"),returnKeyboard)
    },
    {
        command: "Ver escala ortopedia",
        callBack: (ctx)=>ctx.reply(getScaleText("ortopedia"),returnKeyboard)
    }
] // Array of objects

const commands = [...regularCommands, ...extraCommands]

commands.forEach(({command, callBack})=>{
    dutyScaleScene.command(command,callBack)
})
dutyScaleScene.on('message', ctx=>ctx.reply(getSpecialties(),k))


const regularActions = db.map(({specialty, professionals}) =>({
    action: specialty,
    callBack: (ctx)=>{
        const telephonesText = professionals.reduce((acc,item) => (`${acc}\n${item.name} - ${item.telephone}\n`), `Lista de telefones - ${specialty}\n`)
        ctx.reply(telephonesText,getCorrectKeyboard(specialty))}
})) //Array of Objects
//console.log(regularActions)

const ExtraActions =[
    {
        action: "sair",
        callBack: leave()
    },
    {
        action: "Voltar",
        callBack: (ctx)=>ctx.reply("Voltar")
    },
    {
        action: "Ver escala ecocardiograma",
        callBack: (ctx)=>ctx.reply(getScaleText("ecocardiograma"),returnKeyboard)
    },
    {
        action: "Mão",
        callBack: (ctx)=>ctx.reply("Aqui vai a mao",returnKeyboard)
    }

]

const actions = [...regularActions,...ExtraActions]
console.log (actions)

actions.forEach(({action, callBack})=> {
    dutyScaleScene.action(action,callBack)
})

module.exports = {dutyScaleScene}