
const Stage = require ('telegraf/stage')
const {leave} = Stage
const {db,getCorrectKeyboard,getSpecialtiesText,getSubSpecialtyTelephonesText,getScaleText} = require('./index')

const getMainScene = ctx => ctx.reply(getSpecialtiesText(), getCorrectKeyboard("regular"))

const createScaleCommandsAndActionsObject =(item)=>({
    command : `Ver escala ${item}`,
    action : item,
    callBack : (ctx)=>ctx.reply(getScaleText(item))})

const getRegularCommandsAndActionsObject = () => {
    return (db().map(({specialty, professionals}) =>({
        command: specialty,
        action :specialty,
        callBack: (ctx)=>{
            const telephonesText = professionals.reduce((acc,{name, telephone}) => (`${acc}\n${name} - ${telephone}\n`), `Lista de telefones - ${specialty}\n`)
            ctx.reply(telephonesText, getCorrectKeyboard(specialty))}
    })))
}


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
            command: "mão",
            action: "mão",
            callBack: (ctx) => ctx.reply(getSubSpecialtyTelephonesText("Ortopedia", "mão"),getCorrectKeyboard("regular"))
        }
    ]// Array of objects



module.exports = { 
    db,
    getExtraCommandsAndActionsObject,
    getCorrectKeyboard,
    getMainScene,
    getScaleText,
    getSubSpecialtyTelephonesText,
    getScaleText,
    getRegularCommandsAndActionsObject
}